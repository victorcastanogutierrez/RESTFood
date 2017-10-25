module.exports = function(app, swig, gestorDBUsuarios) {

    app.get("/registro", function(req, res) {
		var respuesta = swig.renderFile('views/public/registro.html', {});
		res.send(respuesta);
    });
    
    app.post("/usuario", function(req, res) {

        const pw1 = req.body.password;
        const pw2 = req.body.password2;

        if (pw1 === pw2) {
            const seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
                .update(pw1).digest('hex');

            var usuario = {
                name : req.body.nombre,
                email : req.body.email,
                password : seguro
            }

            existeUsuario(gestorDBUsuarios, usuario.email, 
            
                () => gestorDBUsuarios.insertarUsuario(usuario, function(id) {
                    if (id == null){
                        //TODO: error
                    } else {
                        //TODO: iniciar en sesion
                    }
                }), 
                () => {

                }
            )
            
        }
    });
}

function existeUsuario(gestorDBUsuarios, email, existe, noExiste) {
    var criterio = {
        email : email
    }

    gestorDBUsuarios.obtenerUsuarios(criterio, function(usuarios) {
        if (usuarios == null || usuarios.length == 0) {
            noExiste();
        } else {
            existe(usuarios[0]);
        }

    });
}