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

export const formatLocalDateTime = (d: string) => {
  if (d == '') d = new Date().toISOString();
  const dateTime = new Date(d);

  const text = dateTime.getHours() >= 12 ? '오후' : '오전';
  const hour = (
    '0' +
    (dateTime.getHours() > 12
      ? dateTime.getHours() - 12
      : dateTime.getHours()
    ).toString()
  ).slice(-2);
  const minute = ('0' + dateTime.getMinutes()).slice(-2);

  return text + ' ' + hour + ' : ' + minute;
};
