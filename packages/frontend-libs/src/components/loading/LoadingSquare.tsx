import type { FC } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export interface ILoadingSquareProps {
  title: string;
}

const LoadingDiv = styled('div')({
  background: '#111827',
  display: 'flex',
  width: '100vw',
  height: '100vh',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0px',
  margin: '0px',
});

const SquareContainer = styled('div')({
  position: 'relative',
  width: '112px',
  height: '112px',
});

export const LoadingSquare: FC<ILoadingSquareProps> = ({ title }) => {
  return (
    <LoadingDiv>
      <SquareContainer>
        <Box
          sx={{
            '@keyframes anime1': {
              '0%': {
                width: '112px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '0px',
              },
              '12.5%': {
                width: '48px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '0px',
              },
              '25%': {
                width: '48px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '0px',
              },
              '37.5%': {
                width: '48px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '0px',
              },
              '50%': {
                width: '48px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '0px',
              },
              '62.5%': {
                width: '48px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '0px',
              },
              '75%': {
                width: '48px',
                height: '112px',
                marginTop: '0px',
                marginLeft: '0px',
              },
              '87.5%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '0px',
              },
              '100%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '0px',
              },
            },
            boxSizing: 'border-box',
            position: 'absolute',
            display: 'block',
            backgroundColor: '#92d050',
            border: '16px solid #92d050',
            width: '112px',
            height: '48px',
            marginTop: '64px',
            marginLeft: '0px',
            animation: 'anime1 4s 0s forwards ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            '@keyframes anime2': {
              '0%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '0px',
              },
              '12.5%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '0px',
              },
              '25%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '0px',
              },
              '37.5%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '0px',
              },
              '50%': {
                width: '112px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '0px',
              },
              '62.5%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '64px',
              },
              '75%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '64px',
              },
              '87.5%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '64px',
              },
              '100%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '64px',
              },
            },
            boxSizing: 'border-box',
            position: 'absolute',
            display: 'block',
            backgroundColor: '#bee396',
            border: '16px solid #bee396',
            width: '48px',
            height: '48px',
            marginTop: '0px',
            marginLeft: '0px',
            animation: 'anime2 4s 0s forwards ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            '@keyframes anime3': {
              '0%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '64px',
              },
              '12.5%': {
                width: '48px',
                height: '48px',
                marginTop: '0px',
                marginLeft: '64px',
              },
              '25%': {
                width: '48px',
                height: '112px',
                marginTop: '0px',
                marginLeft: '64px',
              },
              '37.5%': {
                width: '48px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '64px',
              },
              '50%': {
                width: '48px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '64px',
              },
              '62.5%': {
                width: '48px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '64px',
              },
              '75%': {
                width: '48px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '64px',
              },
              '87.5%': {
                width: '48px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '64px',
              },
              '100%': {
                width: '112px',
                height: '48px',
                marginTop: '64px',
                marginLeft: '0px',
              },
            },
            boxSizing: 'border-box',
            position: 'absolute',
            display: 'block',
            backgroundColor: '#a8d973',
            border: '16px solid #a8d973',
            width: '48px',
            height: '48px',
            marginTop: '0px',
            marginLeft: '64px',
            animation: 'anime3 4s 0s forwards ease-in-out infinite',
          }}
        />
      </SquareContainer>
      <h3
        style={{
          fontFamily: `"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"`,
          color: '#ffffff',
        }}
      >
        {title}
      </h3>
    </LoadingDiv>
  );
};
