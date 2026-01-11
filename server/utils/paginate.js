// Paginate an array of items
const paginate = (array, page = 1, limit = 20) => {
  // Ensure valid page and limit
  page = Math.max(1, parseInt(page) || 1);
  limit = Math.max(1, Math.min(100, parseInt(limit) || 20));
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalPages = Math.ceil(array.length / limit);
  
  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages,
      totalRecords: array.length,
      hasNext: endIndex < array.length,
      hasPrev: page > 1,
      limit,
      startIndex,
      endIndex: Math.min(endIndex, array.length)
    }
  };
};

module.exports = { paginate };
