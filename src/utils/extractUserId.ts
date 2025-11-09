export const extractUserId = (url: string | undefined): string | null => {
  if (!url) return null;
  const segments = url.split("/").filter(Boolean);
  if (segments.length !== 3 || segments[0] !== "api" || segments[1] !== "users")
    return null;
  return segments[2] ?? null;
};
