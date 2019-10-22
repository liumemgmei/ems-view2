declare module "nuomi" {
  export const Nuomi;
  export const Router;
  export const Route;
  export const Redirect;
  export const NuomiRoute;
  export const connect;
  export const router;
  export const Link;
  export const withNuomi;
}

interface DispatchParams {
  type: string;
  payload?: any;
}

interface Dispatch {
  dispatch: (params: DispatchParams) => any;
}
