const pagination = (page, size) => {
  const currentPage = Math.abs(Number(page)) || 1;
  let offset = 0;
  let limit = 10;
  const sizeNo = Number(size);
  if (!Number.isNaN(sizeNo) && sizeNo > 0) limit = size;
  offset = (currentPage - 1) * limit;
  if (Number.isNaN(offset)) offset = 10;
  return { limit, offset };
};

export default pagination;
