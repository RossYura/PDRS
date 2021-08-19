import countriesOrigin from './countries';

const COMMON_NATIONALITIES = [
  'Belgium',
  'France',
  'Germany',
  'Netherlands',
  'Luxembourg',
  'Switzerland',
  'United Kingdom',
  'United States',
];

const expandedCommonCountries = COMMON_NATIONALITIES
  .map(countryName => countriesOrigin.find(
    countryInfo => countryName === countryInfo.country,
  ))
  .concat(
    countriesOrigin.filter(
      countryInfo => !COMMON_NATIONALITIES.includes(countryInfo.country)),
  );

export const countries = expandedCommonCountries.map(({ country, 'alpha-2': alpha2Code }) => ({
  value: alpha2Code,
  label: country,
}));

export const nationalities = expandedCommonCountries.map(({ adj, 'alpha-2': alpha2Code }) => ({
  value: alpha2Code,
  label: adj,
}));