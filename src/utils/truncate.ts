export const truncate = (str: string, num: number) => {
  str = str.toString();

  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};
