module.exports = function(app, swig) {

    app.get("/inversores", function(req, res) {

        var respuesta = swig.renderFile("views/form_inversores.html", {});
        res.send(respuesta);
    });

    app.get("/descripcion", function(req, res) {
        
        var respuesta = swig.renderFile("views/descripcion.html", {});
        res.send(respuesta);
    });

}