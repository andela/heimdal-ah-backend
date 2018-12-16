const checkIdentifier = identifier => (
  Number.isInteger(parseInt(identifier, 10))
    ? { id: identifier }
    : { slug: identifier }
);

export default checkIdentifier;
