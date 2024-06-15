const {
  contactcenteraiplatform,
} = require("googleapis/build/src/apis/contactcenteraiplatform");
const model = require("../models/carmodels");

//Select Today's Cars
module.exports.selecttodaycars = (req, res, next) => {
  try {
    model.selecttodaycars((err, results) => {
      if (err) {
        console.error("Error selecting today's cars: ", err);
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error in getTodayCars controller: ", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.selectpastcars = (req, res, next) => {
  try {
    model.selectpastcars((err, results) => {
      if (err) {
        console.error(
          "Error selecting cars that do not belong to today: ",
          err
        );
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error in getNotTodayCars controller: ", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.selectallcars = (req, res, next) => {
  try {
    const callback = (error, results) => {
      if (error) {
        console.error("Error selecting cars: ", error);
        res.status(500).json(error);
      } else {
        console.log("Successfully Selected ALl Cars:", results);
        res.status(200).json(results);
      }
    };
    model.selectallcars(callback);
  } catch (error) {
    console.error("Error Selecting: ", error);
    res.status(500).json(error);
  }
};

module.exports.getcar = (req, res, next) => {
  try {
    const data = {
      carid: req.params.carId,
    };
    if (data.carid == undefined || data.carid == "") {
      res.status(400).json({ message: "CarId undefined or blank" });
      return;
    }
    const callback = (error, results) => {
      if (error) {
        console.error(`Error selecting car by id:${data.carid} `, error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({ message: "Car not found" });
          return;
        }
        console.log("Successfully Selected Car by ID:", results);
        res.status(200).json(results[0]);
      }
    };
    model.getcar(data, callback);
  } catch (error) {
    console.error("Error Selecting: ", error);
    res.status(500).json(error);
  }
};

module.exports.addcar = (req, res, next) => {
  try {
    const data = {
      cartype: req.body.cartype,
      carplate: req.body.carplate,
    };

    const available_cartypes = [
      "SaloonCar",
      "MPV_SUV_Minivan",
      "LargeVan",
      "Minibus",
      "Taxi_Saloon",
      "Taxi_SUV",
    ];

    if (!available_cartypes.includes(data.cartype)) {
      return res
        .status(400)
        .json({
          message: `Car type must be one of these types: ${available_cartypes.join(
            ", "
          )}`,
        });
    }
    const requiredFields = ["cartype", "carplate"];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === "") {
        res.status(400).json({ message: `${field} is undefined or empty` });
        return;
      }
    }

    const callback = (error, results) => {
      if (error) {
        console.error("Error adding car: ", error);
        res.status(500).json(error);
      } else {
        if (results.affectedRows == 0) {
          res.status(409).json({ message: "Car not Added. Please try again" });
        } else {
          res.status(201).json({
            message: "Car Added",
          });
        }
      }
    };
    model.addcar(data, callback);
  } catch (error) {
    console.error("Error adding car: ", error);
    res.status(500).json("Error adding car: ", error);
  }
};

//Wasing Status
module.exports.updatepaymentstatus = (req, res, next) => {
  try {
    const data = {
      carid: req.params.carId,
      totalpaid: req.body.totalpaid,
      tips: req.body.tips,
      tips_for: req.body.tips_for,
    };

    const callback = (error, results) => {
      if (error) {
        console.error("Error updating car washing status: ", error);
        return res.status(500).json({ error: error.message });
      } else {
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "No such car plate" });
        } else {
          console.log("Car wash status successfully updated:", results);
          res.status(200).json({ message: "Payment successfully updated" });
        }
      }
    };

    model.updatepaymentstatus(data, callback);
  } catch (error) {
    console.error("Error in updatepaymentstatus controller: ", error);
    res.status(500).json({ error: error.message });
  }
};
