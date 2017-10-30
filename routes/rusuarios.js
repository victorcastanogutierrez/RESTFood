module.exports = function(app, swig, gestorDBUsuarios) {

    app.get("/logout", function(req, res) {
        req.session.usuario = null;
        res.redirect("/acceso?login=1");
    });

    app.get("/acceso", function(req, res) {
        if (req.session.usuario != null) {
            res.redirect("/restaurante");
        } else {
            let respuesta = swig.renderFile("views/acceso.html", {});
            res.send(respuesta);
        }
    });

    app.get("/p/miperfil", function(req, res) {
        let criterio = {
            email: req.session.usuario
        }
        gestorDBUsuarios.obtenerUsuarios(criterio, (usuario) => {
            usuario[0].password = null;

            let respuesta = swig.renderFile("views/mi_perfil.html", { user: usuario[0] });
            res.send(respuesta);
        })


    });


    app.post("/login", function(req, res) {

        const email = req.body.email;
        const seguro = app
            .get("crypto")
            .createHmac("sha256", app.get("clave"))
            .update(req.body.password)
            .digest("hex");

        existeUsuario(gestorDBUsuarios, email, (user) => {
            if (user.password === seguro) {
                req.session.usuario = user.email;
                res.redirect("/home");
            } else {
                loginError(res, req);
            }
        }, () => {
            loginError(res, req);
        });
    });

    app.post("/usuario", function(req, res) {
        const pw1 = req.body.password;
        const pw2 = req.body.password2;

        if (pw1 === pw2) {
            const seguro = app
                .get("crypto")
                .createHmac("sha256", app.get("clave"))
                .update(pw1)
                .digest("hex");

            let usuario = {
                name: req.body.nombre,
                email: req.body.email,
                password: seguro
            };

            existeUsuario(
                gestorDBUsuarios,
                usuario.email,
                () => {
                    res.redirect("/acceso" +
                        "?mensaje=Correo electrónico en uso" +
                        "&tipoMensaje=alert-danger");
                },
                () => gestorDBUsuarios.insertarUsuario(usuario, (id) => {
                    if (id == null) {
                        res.redirect("/acceso" +
                            "?mensaje=Correo electrónico en uso" +
                            "&tipoMensaje=alert-danger");
                    } else {
                        req.session.usuario = usuario.email;
                        res.redirect("/home");
                    }
                })
            );
        }
    });
};

function existeUsuario(gestorDBUsuarios, email, existe, noExiste) {
    let criterio = {
        email: email
    };

    gestorDBUsuarios.obtenerUsuarios(criterio, usuarios => {
        if (usuarios == null || usuarios.length == 0) {
            noExiste();
        } else {
            existe(usuarios[0]);
        }
    });
}

function loginError(res, req) {
    req.session.usuario = null;
    res.redirect("/acceso" +
        "?mensaje=Credenciales inválidas" +
        "&tipoMensaje=alert-danger&login=1");
}