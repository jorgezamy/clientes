export interface ILoginResponse {
  status: string;
  result: TResult;
}

export type TResult = {
  error: string;
  message: string;
  token: string;
};
