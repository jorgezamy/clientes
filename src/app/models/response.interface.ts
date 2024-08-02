export interface IResponse {
  status: string;
  result: TResult;
}

export type TResult = {
  error: string;
  message: string;
  token: string;
};
