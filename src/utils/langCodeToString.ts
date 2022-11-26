import { languages } from "../data/lang";

export const langCodeToString = (langCode: string): string => {
  if (langCode in languages) {
    return languages[langCode as keyof typeof languages];
  } else {
    return langCode;
  }
};
