    const express = require('express');

    const router = express.Router();

const AnalyzerController = require('../Controllers/Analyzer');  

// Define routes for Analyzer
router.post('/analyze', AnalyzerController);
module.exports = router;