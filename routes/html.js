const router = require('express').Router();
const path = require('path');

router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.get('/stats', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/stats.html'));
});

router.get('/exercise', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/exercise.html'));
});

module.exports = router;
