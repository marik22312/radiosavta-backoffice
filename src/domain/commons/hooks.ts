import { AxiosError } from "axios";

export interface DataHookBaseArgs<T> {
  onError?: (err: AxiosError) => void;
  onSuccess?: (res: T) => void;
}
