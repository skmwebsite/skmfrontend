export const formatEnvUrl = (url?: string): string => {
  if (!url) {
    return "/";
  }

  let formatted = url.trim();

  if (formatted.endsWith("/")) {
    formatted = formatted.slice(0, -1);
  }

  return formatted;
};
