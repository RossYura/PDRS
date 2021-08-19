const validate = (...rules) => {
  const match = [...rules]
    .find(rule => rule.condition);

  return match ? match.error : null;
};

export const rules = {
  email:
    email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(String(email)
        .toLowerCase()),
};

export default validate;

