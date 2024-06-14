const { contactcenteraiplatform } = require("googleapis/build/src/apis/contactcenteraiplatform");
const model=require("../models/carmodels")

module.exports.selectallcars = (req, res, next) => {
    try { 
        const callback = (error, results) => {
            if(error){
                console.error("Error selecting cars: ", error);
                res.status(500).json(error);
            } else {
                    console.log("Successfully Selected ALl Cars:",results)
                    res.status(200).json(results)
            }
        };
        model.selectallcars(callback);

    } catch (error) {
        console.error("Error Selecting: ", error);
        res.status(500).json(error);
    }
};


module.exports.addcar = (req, res, next) => {
    try { 
        const data = {
           cartype:req.body.cartype,
           carplate:req.body.carplate
        };
        const requiredFields = ['cartype','carplate'];

         for (const field of requiredFields) {
        if (req.body[field] === undefined || req.body[field] === "") {
            res.status(400).json({ message: `${field} is undefined or empty` });
            return;
        }
    };

        const callback = (error, results) => {
            if(error){
                console.error("Error adding car: ", error);
                res.status(500).json(error);
            } else {
                if(results.affectedRows == 0){
                    res.status(409).json({message: "Car not Added. Please try again"}); 
                } else {
                    console.log("New Car Added:",results)
                    next();
                }
            }
        };
        model.addcar(data, callback);

    } catch (error) {
        console.error("Error adding car: ", error);
        res.status(500).json(error);
    }
};

//Wasing Status
module.exports.updatewashingstatus = (req, res, next) => {
    try { 
        const data={
            carplate:req.body.carplate
        }
        if(data.carplate==undefined||data.carplate==""){
            res.status(400).json("Car Plate Undefined or empty")
            return;
        }
        const callback = (error, results) => {
            if(error){
                console.error("Error updating car washing status: ", error);
                res.status(500).json(error);
            } else {
                    if(results.affectedRows==0){
                        res.status(404).json("No Such CarPlate")
                    }else{
                    console.log("Car Wash Status Successfully Updated:",results)
                    res.status(200).json({"Message":"Car Wash Status Successfully Updated"})
                    }
            }
        };
        model.updatewashingstatus(data,callback);

    } catch (error) {
        console.error("Error Selecting: ", error);
        res.status(500).json(error);
    }
};