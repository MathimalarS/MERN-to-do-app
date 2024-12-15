const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    // Verify the token using JWT_SECRET from environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If token verification fails, return 403 Forbidden
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
