export const addImageSuffix = (url: string | undefined, suffix = "2"): string | undefined => {
  if (!url) return url;

  const [path, query] = url.split("?");
  const dotIndex = path.lastIndexOf(".");
  if (dotIndex === -1) return url;

  const base = path.substring(0, dotIndex);
  const extension = path.substring(dotIndex);
  if (base.endsWith(suffix)) {
    return url;
  }

  const newPath = `${base}${suffix}${extension}`;

  console.log(newPath);
  return query ? `${newPath}?${query}` : newPath;
};
