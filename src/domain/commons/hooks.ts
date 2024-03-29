export interface DataHookBaseArgs<T> {
  onError?: (err: any) => void;
  onSuccess?: (res: T) => void;
}
