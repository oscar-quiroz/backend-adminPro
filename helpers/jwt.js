const jwt = require("jsonwebtoken");


const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        };
        //crear el token
        jwt.sign(
            payload,
            process.env.JWT_SECRET, { expiresIn: "12h" },
            (err, token) => {
                if (err) {
                    console.error(err);
                    reject("No se pudo generar el jsonweb token");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generarJWT,
};