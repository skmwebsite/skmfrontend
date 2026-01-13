// Helper function to clean URLSearchParams
type CleanURLSearchParams = (
  params: Record<string, string | number | boolean | null | undefined>
) => URLSearchParams;

export const cleanURLSearchParams: CleanURLSearchParams = (params) => {
  // Ensure the input is an object
  if (typeof params !== "object" || params === null) {
    throw new Error("Input must be a non-null object");
  }

  // Create a URLSearchParams instance from the object
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "undefined" && value !== null) {
      searchParams.append(key, String(value));
    }
  }

  return searchParams; // Return the cleaned URLSearchParams object
};

// Function to generate and clean search params
export const generatingSearchParam = (
  param: Record<string, string | number | boolean | null | undefined>
): URLSearchParams => {
  return cleanURLSearchParams(param); // Reuse the cleanURLSearchParams helper
};

export const cleanUrl = (url = ""): string => {
  if (url && !url.endsWith("/")) {
    return `${url}/`;
  }
  return url;
};
