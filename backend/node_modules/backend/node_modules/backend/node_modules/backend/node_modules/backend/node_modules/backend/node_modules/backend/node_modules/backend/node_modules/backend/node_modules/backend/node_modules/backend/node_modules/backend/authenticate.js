const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user info from the token
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;


  try {
    mongoose.connect(process.env.MONGO_URI, connectionParams)
      .then(() => console.log("Connected to MongoDB successfully"))
      .catch((error) => console.log("Failed to connect to MongoDB:", error));
  } catch (error) {
    console.log("Error while connecting to MongoDB:", error);
  }
};