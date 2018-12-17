const pagination = (page, size, count) => {
  let currentPage = Math.abs(Number(page)) || 1;
  let offset = 0;
  let limit = 20;
  const sizeNo = Number(size);
  if (!Number.isNaN(sizeNo) && sizeNo > 0) limit = size;
  const totalPages = Math.ceil(count / limit);
  if (currentPage > totalPages) currentPage = 1;
  offset = (currentPage - 1) * limit;
  if (Number.isNaN(offset)) offset = 10;
  return {
    limit, offset, currentPage, totalPages
  };
};

export default pagination;
