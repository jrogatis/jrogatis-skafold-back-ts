import { flatten, dedup } from "./index";

let routes: { route: string; method: string }[] = [];

const split = (thing) => {
  if (typeof thing === "string") {
    return thing.split("/");
  }
  if (thing.fast_slash) return "";
  const match = thing
    .toString()
    .replace("\\/?", "")
    .replace("(?=\\/|$)", "$")
    .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
  return match
    ? match[1].replace(/\\(.)/g, "$1").split("/")
    : `<complex:${thing.toString()}>`;
};

const extractRoute = (path, layer) => {
  if (layer.route) {
    layer.route.stack.forEach(
      extractRoute.bind(null, path.concat(split(layer.route.path)))
    );
  } else if (layer.name === "router" && layer.handle.stack) {
    layer.handle.stack.forEach(
      extractRoute.bind(null, path.concat(split(layer.regexp)))
    );
  } else if (layer.method) {
    routes.push({
      method: layer.method.toUpperCase(),
      route: path.concat(split(layer.regexp)).filter(Boolean).join("/"),
    });
  }
  return routes;
};

const print = (path, layer) => extractRoute(path, layer);

export default (app) => {
  if (process.env.NODE_ENV !== "test") {
    const routes = dedup(
      flatten(Array.from(app._router.stack.map(print.bind(null, [])))),
      "route"
    );
    console.log("");
    console.log("APP ROUTES");
    console.log("");
    routes.forEach((route) => console.log(route.method, route.route));
    console.log("");
  }
};
