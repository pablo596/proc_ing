$(".has-error").hide();
$("#btn-login").click(function(e) {
    e.preventDefault();
    // var us = $('#username').parent().parent().children()[0].children;
    if ($("#username").val() != "") {
        $('label[for="username"]').removeClass("error");
        $('input[name="username"]').removeClass("error");
        $('small[name="username"]').hide();
        if ($("#password").val() != "") {
            $('label[for="password"]').removeClass("error");
            $('input[name="password"]').removeClass("error");
            $('small[name="password"]').hide();
            var data = {
                name: $("#username").val(),
                pass: $("#password").val(),
            };
            console.log(data);
            $.ajax({
                url: "/login",
                type: "POST",
                dataType: "json",

                headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
                data: data,
                beforeSend: function() {
                    $("#btn-login").html("Cargando...");
                },
                success: function(res) {
                    console.log(res);

                    if (res.RES == 1) {
                        window.location.reload();
                    } else if (res.RES == 2) {
                        Swal.fire(
                            "Lo sentimos.",
                            "El usuario o contraseña no coinciden.",
                            "warning"
                        );
                        $("#btn-login").attr("disableb", false);
                    } else if (res.RES == 3) {
                        Swal.fire({
                            title: "Lo sentimos",
                            type: "warning",
                            html: "Usted no se encuentra registrado en el sistema de administración de canchas, si desea registrarse haga click " +
                                '<a href="/register">aquí</a>.',
                            showCloseButton: true,
                            showCancelButton: true,
                            showConfirmButton: false,
                            focusConfirm: false,
                            cancelButtonText: "Cancelar",
                        });
                    }
                    $("#btn-login").html("Iniciar Sesión");
                    console.log('a');
                    console.log(res);
                },
                fail: function() {
                    $("#btn-login").html("Iniciar Sesión");
                    $("#btn-login").attr("disableb", false);
                },
            });
        } else {
            $('label[for="password"]').addClass("error");
            $('input[name="password"]').addClass("error");
            $('small[name="username"]').show();
        }
    } else {
        $('label[for="username"]').addClass("error");
        $('input[name="username"]').addClass("error");
        $('small[name="username"]').show();
        if ($("#password").val() == "") {
            $('label[for="password"]').addClass("error");
            $('input[name="password"]').addClass("error");
            $('small[name="password"]').show();
        }
    }
});