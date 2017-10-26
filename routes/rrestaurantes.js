module.exports = function(app, swig, gestorDBUsuarios) {

    app.get("/restaurante", function(req, res) {
        var respuesta = swig.renderFile('views/public/vista_restaurante.html', {});
        res.send(respuesta);
    });

}