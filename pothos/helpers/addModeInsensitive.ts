export function addModeInsensitive(filter: any) {
  const keys = Object.keys(filter);
  keys.forEach((key) => {
    if (typeof filter[key] === "object") {
      if (filter[key].contains) {
        filter[key].mode = "insensitive";
      } else {
        addModeInsensitive(filter[key]);
      }
    }
  });
  return filter;
}
