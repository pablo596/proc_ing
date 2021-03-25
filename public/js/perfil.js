$("#cambiarContraModal").modal("attach events", "#btn-contra", "show");
$("#btn-save").click(function() {
    var data = {
        nombre: $("#nombre").val(),
        correo: $("#correo").val(),
        cedula: $("#cedula").val(),
        celular: $("#celular").val()
    };
    $.ajax({
        url: "/usuarios/actualizarPerfil",
        method: "POST",
        data: data,
        headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
        success: function(res) {
            if (res["RES"] != false) {
                Swal.fire(
                    "Éxito!",
                    "Información de usuario actualizada correctamente",
                    "success"
                );
                initDataTableMaq();
            } else {
                Swal.fire(
                    "Alerta",
                    "Ocurrió un error al actualizar su perfil, inténtelo nuevamente",
                    "warning"
                );
            }
            console.log(res);
            // $("#marca-txt").val(res[0]["marca"]);
            // $(".btn-save-marca").attr("id", res[0]["id"]);
            // // initDTMarca();
            // $("#modal-marca").modal("show");
        }
    });
});
$("#emailHelp").hide();
$("#contra-new")
    .children("input")
    .keyup(function() {
        var new_two = $(this)
            .children("input")
            .val();
        var new_contra = $("#contra-new")
            .children("input")
            .val();
        var contra_ant = $("#contra-ant")
            .children("input")
            .val();
        if (new_contra == new_two) {
            $("#contra-new-two")
                .parent()
                .removeClass("has-error");
            $("#contra-new-two")
                .parent()
                .removeClass("has-feedback");
            $("#emailHelp").hide();
        } else {
            $("#contra-new-two")
                .parent()
                .addClass("has-error");
            $("#contra-new-two")
                .parent()
                .addClass("has-feedback");
            $("#emailHelp").show();
        }
    });
var new_two, new_contra, contra_ant;
$("#contra-new-two")
    .children("input")
    .keyup(function() {
        new_two = $("#contra-new-two")
            .children("input")
            .val();
        new_contra = $("#contra-new")
            .children("input")
            .val();
        contra_ant = $("#contra-ant")
            .children("input")
            .val();
        if (new_contra == new_two) {
            console.log(new_contra);
            console.log(new_two);
            $("#contra-new-two")
                .parent()
                .removeClass("has-error");
            $("#contra-new-two")
                .parent()
                .removeClass("has-feedback");
            $("#emailHelp").hide();
        } else {
            $("#contra-new-two")
                .parent()
                .addClass("has-error");
            $("#contra-new-two")
                .parent()
                .addClass("has-feedback");
            $("#emailHelp").show();
        }
    });

$("#btn-change-pass").click(function() {
    var data = {
        contra_ant: contra_ant,
        contra_new: new_contra,
        contra_new_two: new_two
    };
    if (new_contra == new_two) {
        $.ajax({
            url: "/usuarios/actualizarContra",
            method: "POST",
            data: data,
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
            success: function(res) {
                if (res["RES"] != false) {
                    Swal.fire("Éxito!", "Contraseña correctamente", "success");
                    initDataTableMaq();
                } else {
                    Swal.fire(
                        "Alerta",
                        "Ocurrió un error al actualizar su contraseña, inténtelo nuevamente",
                        "warning"
                    );
                }
                console.log(res);
                // $("#marca-txt").val(res[0]["marca"]);
                // $(".btn-save-marca").attr("id", res[0]["id"]);
                // // initDTMarca();
                // $("#modal-marca").modal("show");
            }
        });
    }
});
