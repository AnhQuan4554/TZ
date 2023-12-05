/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useEffect, useReducer, useContext, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import {
  OAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import axios from 'axios';
import { getProfile } from '../api/auth';
import { ACCESS_TOKEN_KEY } from '../constants';
import { useFirebase } from '../hooks/use-firebase';

interface IFirebaseAuthenticatedUser {
  displayName: string;
  uid: string;
  photoURL: string;
  email: string;
  provider: string;
  [x: string]: any;
}
export interface User {
  id: string;
  avatar?: string;
  email?: string;
  name?: string;
  roles?: string[];
  emailVerified?: boolean;
  [key: string]: any;
}

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;

  user: User | null;
}

interface AuthContextValue extends State {
  platform: 'Firebase';
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithMicrosoft: () => Promise<any>;
  logout: (redirectUrl?: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthStateChangedAction = {
  type: 'AUTH_STATE_CHANGED';
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type Action = AuthStateChangedAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: State, action: Action): State => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'Firebase',
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithMicrosoft: () => Promise.resolve(),
  logout: (_redirectUrl?: string) => Promise.resolve(),
});

const SESSION_INTERVAL_CHECK = 60000;
const RENEW_TOKEN_WHEN_LESS_THAN_SECONDS = 5 * 60; // 5 minutes

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { auth } = useFirebase();

  useEffect(() => {
    const renewTokenCheck = async () => {
      if (auth && auth.currentUser) {
        // get new token and validate the session, force user signed out if necessary
        const currentUserIdToken = await auth.currentUser.getIdTokenResult();

        const timeRemainingOfCurrentToken = Math.ceil(
          (new Date(currentUserIdToken.expirationTime).getTime() - new Date().getTime()) / 1000
        );

        if (timeRemainingOfCurrentToken < RENEW_TOKEN_WHEN_LESS_THAN_SECONDS) {
          console.log('Token renewing ....');
          const newIdTOken = await auth.currentUser.getIdToken(true);
          localStorage.setItem(ACCESS_TOKEN_KEY, newIdTOken);
        }
        const { sessionTimeout = 3600, auth_time: authenticatedTime } = currentUserIdToken.claims;
        const timeDiffFromAuthenticated =
          Math.ceil(new Date().getTime() / 1000) - authenticatedTime;
        if (timeDiffFromAuthenticated > sessionTimeout * 60) {
          await auth.signOut();
          unsetAuthenticatedState();
          document.location.href = '/authentication/login';
          return true;
        }
      }
      return false;
    };

    const sessionCheckIntervalId = setInterval(renewTokenCheck, SESSION_INTERVAL_CHECK);

    const unsetAuthenticatedState = () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    };

    if (auth) {
      auth.onAuthStateChanged(async (user: IFirebaseAuthenticatedUser) => {
        if (user && auth.currentUser) {
          const isSignedOut = await renewTokenCheck();
          if (isSignedOut) {
            return;
          }
          // const idToken = await auth.currentUser.getIdTokenResult();
          const idToken = await auth.currentUser.getIdToken(true);
          localStorage.setItem(ACCESS_TOKEN_KEY, idToken);
          // call profile to refresh roles & permissions
          const currentUserProfile = await getProfile();
          if (!currentUserProfile) {
            unsetAuthenticatedState();
          } else {
            dispatch({
              type: 'AUTH_STATE_CHANGED',
              payload: {
                isAuthenticated: true,
                user: {
                  id: user.uid,
                  avatar: user.photoURL || '',
                  email: user.email || '',
                  name: user.email || '',
                  roles: currentUserProfile.roles || [],
                  permissions: currentUserProfile.permissions || [],
                  emailVerified: user.emailVerified,
                  provider: user.providerData[0].providerId,
                },
              },
            });
          }
        } else {
          unsetAuthenticatedState();
        }
      });
    }
    return () => clearInterval(sessionCheckIntervalId);
  }, [dispatch, auth]);

  const signInWithEmailAndPasswordWrap = useCallback(
    async (email: string, password: string) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        const token = await auth.currentUser?.getIdTokenResult();
        return token;
      } catch (error) {
        console.error(error);
        throw new Error('Unable to login with provided username/password.');
      }
    },
    [auth]
  );

  const signInWithMicrosoft = async (): Promise<any> => {
    const provider = new OAuthProvider('microsoft.com');
    provider.setCustomParameters({
      tenant: 'tymlez.com',
    });
    try {
      await signOut(auth);
      const microsoftSigninResult = await signInWithPopup(auth, provider);
      const credential = OAuthProvider.credentialFromResult(microsoftSigninResult);
      if (credential) {
        const { data: authoriseResult } = await axios.post(
          `${process.env.NEXT_PUBLIC_PLATFORM_API_URL}/auth/authenticate`,
          credential
        );

        return authoriseResult;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Unable to login with Microsoft.');
    }
    return undefined;
  };

  const createUserWithEmailAndPasswordWrap = async (
    email: string,
    password: string
  ): Promise<any> => createUserWithEmailAndPassword(auth, email, password);

  const logout = async (redirectUrl?: string): Promise<void> => {
    await signOut(auth);
    if (redirectUrl) {
      document.location.href = redirectUrl;
    } else {
      if (window.location.pathname.includes('403') || window.location.pathname.includes('401')) {
        document.location.href = '/authentication/login';
      }

      const newPathToRedict = window.location.pathname
        .replace('/admin', '')
        .replace('/trustchain', '')
        .replace('/report', '');

      document.location.href = `/authentication/login?returnUrl=${newPathToRedict}`;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Firebase',
        createUserWithEmailAndPassword: createUserWithEmailAndPasswordWrap,
        signInWithEmailAndPassword: signInWithEmailAndPasswordWrap as any,
        signInWithMicrosoft,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => useContext(AuthContext);
