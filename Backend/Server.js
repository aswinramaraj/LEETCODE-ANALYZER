const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const AnalyzerRoutes = require('./Routes/Analyzer');
const cors = require('cors');
const mongodb = require('./Config/Mongodb')
const reviewstore = require('./Routes/Reviewroute')

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use(express.json());

// Mongodb connection

mongodb()

// Use Analyzer routes
app.use('/api', AnalyzerRoutes);    
app.use('/api',reviewstore);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});