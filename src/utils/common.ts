import { AxiosResponse } from 'axios';

export const convertSnakeCaseToCamelCase = (str: string): string => {
  const words = str.split('_');
  const camelCaseWord = words
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      const firstLetterCap = word.charAt(0).toUpperCase();
      const remainingLetters = word.slice(1);
      return firstLetterCap + remainingLetters;
    })
    .join('');

  return camelCaseWord;
};

export const convertObjectPropertiesSnakeCaseToCamelCase = (
  //   obj: Record<string, unknown>,
  obj: AxiosResponse<string, unknown>,
): Record<string, unknown> => {
  const convertedObject: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelCaseKey = convertSnakeCaseToCamelCase(key);
    convertedObject[camelCaseKey] = value;
  }

  return convertedObject;
};
