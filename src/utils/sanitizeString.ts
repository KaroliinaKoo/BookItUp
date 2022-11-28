export const sanitizeString = (str: string, removeSpecial: boolean = false) => {
  str = str.toString();

  // Remove tags
  str = str.replace(/<[^>]*>/g, "");

  // Replace all spaces with a single space
  str = str.replace(/\s+/g, " ");

  // Trim leading and trailing spaces
  str = str.trim();

  if (removeSpecial) {
    // Remove all non-alphanumeric characters <- also removes accented characters, non-latin characters, etc. :(
    str = str.replace(/[^a-zA-Z0-9 ]/g, "");
  }

  return str;
};
