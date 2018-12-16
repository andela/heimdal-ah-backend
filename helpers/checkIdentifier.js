const checkIdentifier = whereClause => (
  Number.isInteger(parseInt(whereClause, 10))
    ? { id: whereClause }
    : { slug: whereClause }
);

export default checkIdentifier;
