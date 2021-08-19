export const sortByDate = (keyExtractor = 'date', order = 'asc') => arr => arr
  .sort((a,b) => order === 'asc'
    ? new Date(a[keyExtractor]) - new Date(b[keyExtractor])
    : new Date(b[keyExtractor]) - new Date(a[keyExtractor])
  );

export function arrayContainsArrayPartial (superset, subset) {
  return subset.some(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}
