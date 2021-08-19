export const pipe = (...operations) => operations.reduce((
  res,
  operation,
) => operation(res));