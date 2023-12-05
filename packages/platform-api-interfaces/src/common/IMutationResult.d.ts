export type IMutationResult<T = void> = {
  success: boolean;
  message?: string;
  data?: T | undefined;
};
