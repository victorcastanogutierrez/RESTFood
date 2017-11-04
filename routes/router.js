module.exports = function(app, express, swig) {

    var routerUsuarioSession = express.Router();
    routerUsuarioSession.use(function(req, res, next) {
        if (req.baseUrl && req.baseUrl.startsWith("/p/") && !req.session.usuario) {
            res.redirect("/acceso?login=1");
        } else {
            next();
        }
    });

    //Aplicar routerUsuarioSession
    app.use("*", routerUsuarioSession);
}