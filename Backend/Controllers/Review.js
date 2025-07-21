const express = require('express');
const mongomodel = require('../models/Review');

const Storereview = async (req, res) => {
  try {
    const review = req.body;
    const savedReview = await mongomodel.create(review);
    res.status(201).json({ message: "Review saved successfully", data: savedReview });
  } catch (error) {
    res.status(500).json({ message: "Failed to save review", error: error.message });
  }
};

module.exports = Storereview;
