export interface Response<T> {
    message?: string;
    data?: Partial<T>;
    metaData?: Partial<T>;
};