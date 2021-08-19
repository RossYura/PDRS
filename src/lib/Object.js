const ObjectBuilder = obj => ({
  deleteProperty: propKey => {
    const res = Object.keys(obj)
      .reduce(
        (res, key) => key === propKey
          ? res
          : {
            ...res,
            [key]: obj[key],
          },
        {},
      );

    return ObjectBuilder(res);
  },

  setProperty: (propKey, propValue) => {
    const res = {
      ...obj,
      [propKey]: propValue,
    };

    return ObjectBuilder(res);
  },

  setPropertyIf: (propKey, propValue, condition) => {
    const res = condition
      ? {
        ...obj,
        [propKey]: propValue,
      }
      : { ...obj };

    return ObjectBuilder(res);
  },

  get: () => obj,
});

export default ObjectBuilder;
