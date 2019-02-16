// saber si el usuario está loggeado o no
module.exports = {
    
    isLoggedIn(req, res, next){
        // true, si el usuario esta loggeado
        if (req.isAuthenticated()){
            return next();
        }
        return res.redirect('/signin');
    },

    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        // si ya está autenticado debería retornar a la vista de usuario
        return res.redirect('/profile');
    }
};