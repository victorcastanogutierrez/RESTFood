module.exports = function(app, express, swig) {

    var routerUsuarioSession = express.Router(); 
    routerUsuarioSession.use(function(req, res, next) {
        console.log("Va a ");
        if (req.baseURL && req.baseURL.startsWith("/p/")) {
            if (!req.session.usuario) {
                res.redirect("/acceso");
            }
        } else {
            next();
        }
    });
    
    //Aplicar routerUsuarioSession
    app.use("*",routerUsuarioSession);
}