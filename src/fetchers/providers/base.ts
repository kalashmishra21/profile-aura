export interface DataProvider<T = any> {
  id: string;
  name: string;
  fetch: (username: string) => Promise<T | null>;
}
