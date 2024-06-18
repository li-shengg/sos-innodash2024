// controller.js
const model = require("../models/usermodels");

module.exports.login = (req, res, next) => {
  try {
    const requiredFields = ["username", "password"];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === "") {
        res.status(400).json({ message: `${field} is undefined or empty` });
        return;
      }
    }

    const data = {
      username: req.body.username,
      password: res.locals.hash,
    };

    const callback = (error, results) => {
      if (error) {
        console.error("Error login callback: ", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({ message: "User not found" });
        } else {
          console.log("Results:", results);
          res.locals.userId = results[0].userid;
          res.locals.hash = results[0].password;
          console.log(res.locals.hash);
          next();
        }
      }
    };

    model.login(data, callback);
  } catch (error) {
    console.error("Error login: ", error);
    res.status(500).json(error);
  }
};

module.exports.getusername = (req, res, next) => {
  try {
    const data = {
      userid: req.params.userId,
    };

    const callback = (error, results) => {
      if (error) {
        console.error("Error getting username callback: ", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({ message: "User not found" });
        } else {
          console.log("Results:", results);
          res.status(200).json(results[0].name);
        }
      }
    };

    model.getusername(data, callback);
  } catch (error) {
    console.error("Error getting username: ", error);
    res.status(500).json(error);
  }
};

module.exports.getall = (req, res, next) => {
  try {
    const callback = (error, results) => {
      if (error) {
        console.error("Error getting all user id and name callback: ", error);
        res.status(500).json(error);
      } else {
        console.log("Results:", results);
        res.status(200).json(results);
      }
    };
    model.getall(callback);
  } catch (error) {
    console.error("Error getting all user id and name: ", error);
    res.status(500).json(error);
  }
};

module.exports.checkUsernameExist = (req, res, next) => {
  try {
    const requiredFields = ["name", "password"];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === "") {
        res.status(400).json({ message: `${field} is undefined or empty` });
        return;
      }
    }

    const data = {
      name: req.body.name,
    };

    const callback = (error, results) => {
      if (error) {
        console.error("Error readUserByUsername callback: ", error);
        res.status(500).json(error);
      } else {
        if (results.length != 0) {
          res.status(409).json({ message: "Username already exists" });
        } else {
          next();
        }
      }
    };
    model.readUserByUsername(data, callback);
  } catch (error) {
    console.error("Error readUserByUsername: ", error);
    res.status(500).json(error);
  }
};

module.exports.register = (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      password: res.locals.hash,
    };

    const callback = (error, results) => {
      if (error) {
        console.error("Error register callback: ", error);
        res.status(500).json(error);
      } else {
        res.locals.userId = results.insertId;
        next()
      }
    };

    model.register(data, callback);
  } catch (error) {
    console.error("Error register: ", error);
    res.status(500).json(error);
  }
};
