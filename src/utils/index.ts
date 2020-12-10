import { Router } from "express";
import { TRouter, Wrapper } from "./models";

export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  router: Router
) => middlewareWrappers.forEach(wrapper => wrapper(router));

export const applyRoutes = (rootRouter: TRouter[], app: Router) => {
  const formatPath = (path = "") =>
    (path.startsWith("/") ? path.slice(1) : path).trim();
  return rootRouter.forEach(router => {
    const expressRouter = Router();
    router.routes.forEach(route => {
      const { method, path, handler, middlewares = [] } = route;
      (expressRouter as any)[method].apply(expressRouter, [
        `/${formatPath(path)}`,
        ...[[...middlewares], handler]
      ]);
    });
    return app.use(`/${formatPath(router.resource)}`, expressRouter);
  });
};

export const milliToSec = (milli: number) => milli / 1000;

export const flatten = (xs: any) =>
  Array.isArray(xs) ? [].concat(...xs.map(flatten)) : xs;

export const dedup = (arr, comp: string) =>
  arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);
