class GestorMail {
    constructor(transporter) {
        this.transporter = transporter;
    }

    sendMail(toEmail, cabecera, contenido) {
        var mailOptions = {
            from: toEmail,
            to: toEmail,
            subject: cabecera,
            text: contenido
        };

        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

exports.GestorMail = GestorMail;