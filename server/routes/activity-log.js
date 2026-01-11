const express = require('express');
const router = express.Router();
const { readJSONFile } = require('../utils/fileOperations');
const { authenticateToken } = require('../middleware/auth');
const { paginate } = require('../utils/paginate');

// GET activity logs (protected, paginated)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const logs = await readJSONFile('activity-log.json');
    
    // Sort by timestamp descending (newest first)
    const sortedLogs = logs.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    
    const result = paginate(sortedLogs, page, limit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity logs' });
  }
});

module.exports = router;
