export function getPaginationParams(query) {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '10', 10)));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

export function applyBasicFilters(whereClauses, binds, filters) {
  if (filters.search) {
    whereClauses.push('(LOWER(BRAND) LIKE :search OR LOWER(MODEL) LIKE :search)');
    binds.search = `%${String(filters.search).toLowerCase()}%`;
  }
  if (filters.status) {
    whereClauses.push('STATUS = :status');
    binds.status = filters.status;
  }
}
