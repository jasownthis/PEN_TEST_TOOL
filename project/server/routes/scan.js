import express from 'express';
import { auth } from '../middleware/auth.js';
import Scan from '../models/Scan.js';
import Vulnerability from '../models/Vulnerability.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/analyze', auth, async (req, res) => {
  try {
    const { target } = req.body;
    
    // Create new scan
    const scan = new Scan({
      user: req.userId,
      target,
      status: 'scanning'
    });

    // Simulate vulnerability detection
    const vulnerabilities = await Vulnerability.find({});
    const detectedVulnerabilities = vulnerabilities
      .filter(() => Math.random() > 0.7) // Randomly detect vulnerabilities
      .map(vuln => ({
        vulnerability: vuln._id,
        detectedAt: new Date(),
        details: `Detected in ${target}`
      }));

    scan.vulnerabilities = detectedVulnerabilities;
    scan.status = 'completed';
    await scan.save();

    // Update user's scans
    await User.findByIdAndUpdate(req.userId, {
      $push: { scans: scan._id }
    });

    // Populate vulnerability details
    const populatedScan = await scan.populate('vulnerabilities.vulnerability');
    
    res.json(populatedScan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.userId })
      .populate('vulnerabilities.vulnerability')
      .sort({ createdAt: -1 });
    res.json(scans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;