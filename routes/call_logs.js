import express from 'express';
import cors from 'cors';
import { requireAuth } from '../lib/auth.js';
import { insertCallLog, getCallLogs, updateCallLog, deleteCallLog } from '../lib/database.js';

const router = express.Router();



// Create a call log
router.post('/call_logs', requireAuth, async (req, res) => {
  try {
    const insert = await insertCallLog(req.body);
    res.json({ insertedId: insert.insertedId });
  } catch (error) {
    console.error('Call log insert error:', error);
    res.status(500).json({ error: "Failed to create call log" });
  }
});

// Get call logs (filter by agent, queue, or all)
router.get('/call_logs', requireAuth, async (req, res) => {
  try {
    const logs = await getCallLogs(req.query);
    res.json(logs);
  } catch (error) {
    console.error('Call log fetch error:', error);
    res.status(500).json({ error: "Failed to get call logs" });
  }
});

// Update a call log
router.put('/call_logs/:id', requireAuth, async (req, res) => {
  try {
    const update = await updateCallLog(req.params.id, req.body);
    res.json(update);
  } catch (error) {
    console.error('Call log update error:', error);
    res.status(500).json({ error: "Failed to update call log" });
  }
});

// Delete a call log
router.delete('/call_logs/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await deleteCallLog(req.params.id);
    res.json(deleted);
  } catch (error) {
    console.error('Call log delete error:', error);
    res.status(500).json({ error: "Failed to delete call log" });
  }
});


export default router;