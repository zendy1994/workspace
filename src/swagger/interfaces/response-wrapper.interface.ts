export interface IResponseWrapper<T> {
  status: string;
  statusCode: number;
  data: T;
}
