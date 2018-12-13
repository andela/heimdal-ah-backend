const checkIdentifier = paramsSlug => (
  Number.isInteger(parseInt(paramsSlug, 10))
    ? { id: paramsSlug }
    : { slug: paramsSlug }
);

export default checkIdentifier;
