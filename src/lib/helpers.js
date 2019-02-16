const bcrypt = require('bcryptjs');

const helpers = {};

// encriptar las contraseñas
helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

// comparar la contraseña encriptada
helpers.matchPassword = async (password, savedPassword) => { 
    /*
    const result = await bcrypt.compare(password, savedPassword);
    return result;
    */
    try {
        return await bcrypt.compare(password, savedPassword);
    }catch(e){
        console.log(e);
    }
};

module.exports = helpers;