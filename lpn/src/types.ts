export type Route = {
  path: string;
  title: string;
  children?: Route[];
  description?: string;
};