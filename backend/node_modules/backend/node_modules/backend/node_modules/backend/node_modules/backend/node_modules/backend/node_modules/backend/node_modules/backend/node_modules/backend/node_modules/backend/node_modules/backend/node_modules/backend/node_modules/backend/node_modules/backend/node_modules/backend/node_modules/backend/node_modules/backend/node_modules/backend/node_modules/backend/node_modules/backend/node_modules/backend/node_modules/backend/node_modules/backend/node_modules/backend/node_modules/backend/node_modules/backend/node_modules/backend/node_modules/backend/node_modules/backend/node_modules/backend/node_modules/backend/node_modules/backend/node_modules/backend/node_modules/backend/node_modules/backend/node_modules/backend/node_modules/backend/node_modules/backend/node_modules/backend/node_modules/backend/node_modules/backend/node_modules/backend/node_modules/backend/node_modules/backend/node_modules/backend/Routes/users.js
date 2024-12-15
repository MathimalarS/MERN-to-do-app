const router = require("express").Router();
const { User, validate } = require("../Model/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    console.log("Request received with data:", req.body); // Log incoming data for debugging

    const { error } = validate(req.body);
    if (error) {
      console.log("Validation failed:", error.details[0].message); // Log validation error
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: "User with given email already exists!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error occurred:", error);  // Enhanced logging
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
