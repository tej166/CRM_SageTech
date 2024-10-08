const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

  console.log('MongoDB Connection String:', process.env.MONGO_CONN);
