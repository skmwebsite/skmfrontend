import { formatEnvUrl } from "./FormatUrl";
import { cleanUrl } from "./UrlHelper";

export const BaseUrl = cleanUrl(process.env.NEXT_PUBLIC_BASE_URL);
export const StorageUrl = formatEnvUrl(process.env.NEXT_PUBLIC_STORAGE_URL);
export const absoluteBaseUrl = cleanUrl(
  process.env.NEXT_PUBLIC_ABSOLUTE_BASE_URL
);
