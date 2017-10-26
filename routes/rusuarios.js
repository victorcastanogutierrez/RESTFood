module.exports = function(app, swig, gestorDBUsuarios) {
    app.get("/registro", function(req, res) {
        let respuesta = swig.renderFile("views/public/registro.html", {});
        res.send(respuesta);
    });

    app.get("/login", function(req, res) {
        let respuesta = swig.renderFile("views/public/login.html", {});
        res.send(respuesta);
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
                res.redirect("/restaurante");
            } else {
                //TODO contraseña incorrecta;
            }

        }, () => {
            console.log("no existe")
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
                    res.send("el usuario ya existe");
                },

                () =>
                gestorDBUsuarios.insertarUsuario(usuario, (id) => {
                    if (id == null) {
                        res.send("error");
                    } else {
                        res.send(id)
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