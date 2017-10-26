module.exports = function(app, swig, gestorDBUsuarios) {

    app.get("/restaurante", function(req, res) {
        var respuesta = swig.renderFile('views/vista_restaurante.html', {});
        res.send(respuesta);
    });

    app.get("/p/crearrestaurante", function(req, res) {
        var respuesta = swig.renderFile('views/crear_restaurante.html', {});
        res.send(respuesta);
    });

}