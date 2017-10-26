module.exports = function(app, swig, gestorDBUsuarios) {

    app.get("/p/restaurante", function(req, res) {
        var respuesta = swig.renderFile('views/private/vista_restaurante.html', {});
        res.send(respuesta);
    });

}