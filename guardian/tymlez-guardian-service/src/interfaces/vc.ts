export type ICredentialSubject<T> = {
  policyId: string;
} & T;

export interface IVCRecord<T> {
  id: string;
  document: {
    credentialSubject: ICredentialSubject<T>[];
  };
  __sourceTag__?: string;
}
