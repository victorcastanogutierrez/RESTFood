module.exports = function(app, swig, gestorDBUsuarios) {

    app.get("/restaurante", function(req, res) {
        var respuesta = swig.renderFile('views/vista_restaurante.html', {});
        res.send(respuesta);
    });


    app.post("/restaurante", function(req, res) {
        let restaurante = JSON.parse(req.body);
        console.log(restaurante);
        res.send("ok");
    });

    app.get("/crearrestaurante", function(req, res) {
        var respuesta = swig.renderFile('views/crear_restaurante.html', {});
        res.send(respuesta);
    });

    app.get("/home", function(req, res) {
        let restaurantes = [];
        for (let i = 0; i < 10; i++) {
            restaurantes.push({
                nombre: 'Prueba nombre ' + i,
                direccion: 'Prueba dirección' + i
            });
        }
        var respuesta = swig.renderFile('views/vista_home.html', { restaurantes: restaurantes });
        res.send(respuesta);
    });

}