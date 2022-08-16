const parseError = (response) => {
  const error = new TypeError(Array.isArray(response) ? response.message[0] : response.message);

  return error;
};

export default parseError;
