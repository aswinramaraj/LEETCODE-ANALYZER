const mongoose = require('mongoose');

async function connectDB() {
  try {
    const res = await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
    return res;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // exit the app on DB failure
  }
}

module.exports = connectDB;
