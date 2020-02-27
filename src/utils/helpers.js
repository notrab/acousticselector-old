// @flow

export const toSentence = (arr: string[]) => {
  return arr.length > 1
    ? arr.slice(0, -1).join(', ') + ' & ' + arr[arr.length - 1]
    : arr[0];
};
