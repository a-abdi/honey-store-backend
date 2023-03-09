export interface Response<T> {
    statusCode: number;
    message: string;
    data: {
      result: Partial<T>,
      meta: Partial<T>
    };
}