export const getResourcesDirectory = (): string => {
  if (process?.env?.NODE_ENV !== 'development' && process.resourcesPath) return process.resourcesPath;
  else return __dirname;
};
