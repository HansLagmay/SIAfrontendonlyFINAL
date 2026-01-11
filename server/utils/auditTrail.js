// Record a change to an entity for audit trail
const recordChange = (entity, field, oldValue, newValue, changedBy, changedByName, reason = null) => {
  // Initialize changeHistory array if it doesn't exist
  if (!entity.changeHistory) {
    entity.changeHistory = [];
  }
  
  // Create change record
  const changeRecord = {
    field,
    oldValue,
    newValue,
    changedBy,
    changedByName,
    changedAt: new Date().toISOString(),
    reason
  };
  
  // Add to history
  entity.changeHistory.push(changeRecord);
  
  // Keep only last 50 changes to prevent unlimited growth
  if (entity.changeHistory.length > 50) {
    entity.changeHistory = entity.changeHistory.slice(-50);
  }
  
  return entity;
};

// Get change history for display
const getChangeHistory = (entity) => {
  return entity.changeHistory || [];
};

// Get recent changes (last N changes)
const getRecentChanges = (entity, count = 10) => {
  const history = entity.changeHistory || [];
  return history.slice(-count);
};

module.exports = {
  recordChange,
  getChangeHistory,
  getRecentChanges
};
