const mongoose = require('mongoose');

const dbConection = async() => {


    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('conexion Online');

    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de conectarse a la base de datos');
    }

}


module.exports = {
    dbConection
}