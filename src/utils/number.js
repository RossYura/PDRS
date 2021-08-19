export const isEven = number => number % 2 === 0;

export const formatWithNumericalAbbreviation = (
  abbreviationValue,
  abbreviationString,
  digitsAfterDot,
) => value => digitsAfterDot
  ? (value / abbreviationValue)
    .toFixed(digitsAfterDot)
    .replace(new RegExp(`[.,]${Array.from(new Array(digitsAfterDot))
      .map(() => '0')
      .join('')}$`), '') + abbreviationString
  : value / abbreviationValue + abbreviationString;

export const formatWithNumericalAbbreviationThousands = formatWithNumericalAbbreviation(
  1000,
  'k',
);

export const formatWithNumericalAbbreviationMillions = formatWithNumericalAbbreviation(
  1000000,
  'm',
);

export const formatWithNumericalAbbreviationMillionsCeil2digits = formatWithNumericalAbbreviation(
  1000000,
  'm',
  2,
);

export const autoFormatCeil2Digits = value => value > 1000000
  ? formatWithNumericalAbbreviationMillionsCeil2digits(value)
  : formatWithNumericalAbbreviationThousands(value);

export const arraySum = arr => arr.reduce((res, val) => val + res, 0);

export const formatWithSeparators = (separator, roundTo = 2) => x => {
  const parts = x.toString()
    .split('.');

  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

export const formatWithDotSeparators = formatWithSeparators('.');
export const formatWithCommaSeparators = formatWithSeparators(',');