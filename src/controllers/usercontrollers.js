// controller.js
const model=require("../models/usermodels")

module.exports.login = (req, res, next) => {
    try { 
        const requiredFields = ['username', 'password'];
    

        for (const field of requiredFields) {
            if (req.body[field] === undefined || req.body[field] === "") {
                res.status(400).json({ message: `${field} is undefined or empty` });
                return;
            }
        };

        const data = {
            username: req.body.username,
            password: res.locals.hash
        };

        const callback = (error, results) => {
            if(error){
                console.error("Error login callback: ", error);
                res.status(500).json(error);
            } else {
               
                if(results.length == 0){
                    res.status(404).json({message: "User not found"}); 
                } else {
                    console.log("Results:",results)
                    res.locals.userId = results[0].userid
                    res.locals.hash = results[0].password
                    console.log(res.locals.hash)
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

// //Login
// async function handleLogin(req, res, next) {
//     try {
//         const requiredFields = ['username', 'password'];
        
//         for (const field of requiredFields) {
//             if (!req.body[field]) {
//                 res.status(400).json({ message: `${field} is undefined or empty` });
//                 return;
//             }
//         }

//         const { username, password } = req.body;

//         const user = await login(username);

//         if (!user) {
//             res.status(404).json({ message: "User not found" });
//             return;
//         }

//         // Compare the hashed password
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             res.status(401).json({ message: "Invalid password" });
//             return;
//         }

//         res.locals.userId = user.userid;
//         res.locals.hash = user.password;
//         next();
//     } catch (error) {
//         console.error("Error login: ", error);
//         res.status(500).json(error);
//     }
// }

// //Add user
// async function Adduser(req, res) {
//     try {
//         const cars = await adduser();
//         res.status(200).json(cars);
//     } catch (e) {
//         res.status(400).json({ error: e.message });
//     }
// }

// module.exports = {
//     Adduser,
//     handleLogin
// };
