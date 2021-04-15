// Based on the ExtractRouteParams type from the blog article
// https://effectivetypescript.com/2020/11/05/template-literal-types/ (bearbeitet)
// by Dan Vanderkam (https://danvk.org/)

type ExtractRouteParams<T extends string> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? Param | ExtractRouteParams<Rest>
  : T extends `${infer _Start}:${infer Param}`
  ? Param
  : never;


// This function needs to be thoroughly tested of course, because of the cast.
function replaceRouteParams<T extends string>(
  route: T,
  params: Record<ExtractRouteParams<T>, string | number>
): string {
  const paramsAsString = params as Record<string, string>;
  return route.replace(/:(.*?)(\/|$)/, (_, paramName) => paramsAsString[paramName]);
}

replaceRouteParams("/goto/:city/:street/:housenumber", {
  city: "Darmstadt",
  housenumber: 9,
  street: "Mina-Rees-Straße",
});

export {};
