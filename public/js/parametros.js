var id_marca = 0;
$("#modal-marca").modal("attach events", "#addMarcas", "show");
$("#modal-modelo").modal("attach events", "#addModelos", "show");
$("#modal-tipo").modal("attach events", "#addTipos", "show");
$(".ui.dropdown").dropdown();
$("#addModelos").click(function() {
    $("#marca-search").children("input").val("");
    $("#marca-search").removeClass("disabled")
    $("#modelo-txt").val("");
    $(".btn-save-modelo").attr("id", "");
    id_marca = 0;
})



$("#marca-search")
    .children("input")
    .keyup(function() {
        if (this.value.length > 1) {
            var data = {
                query: this.value
            };
            ajax_all(
                "/parametros/buscarMarca",
                data,
                "",
                buscarMarca,
                "",
                ""
            );
        }
    });

function buscarMarca(data) {
    var json = data["RES"];
    var n = json.length;
    if (n > 0) {
        content = [];
        if (json != false) {
            $(json).each(function(i, v) {
                content.push({
                    title: v.marca,
                    id: v.id
                });
            });
        }

        $("#marca-search").search({
            minCharacters: 3,
            searchFields: ["title", "description"],
            error: {
                noResults: "No se encontraron resultados."
            },
            source: content,
            onSelect: function(result, response) {
                $("#div-search").hide();
                var id = result.id;
                id_marca = id;
            }
        });
    }
}

var dTMarca, dTModelo, dTTipo;
initDTMarca();
initDTModelo();
initDTTipo();

function initDTMarca() {
    if (dTMarca) {
        dTMarca.destroy();
    }
    dTMarca = $("#marcas-datatables").DataTable({
        ajax: {
            url: "/parametros/getMarca",
            dataSrc: "",
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() }
        },
        destroy: true,
        responsive: true,
        columns: [{
            data: "marca"
        }, {
            render: function(data, type, row, meta) {
                var html = "";
                html +=
                    '<div class="form-button-action">' +
                    '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" onClick="editMarca(' +
                    row["id"] +
                    ')">' +
                    '<i class="fas fa-edit"></i>' +
                    "</button>" +
                    '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-danger btn-lg" onClick="deleteMarca(' +
                    row["id"] +
                    ')">' +
                    '<i class="fas fa-trash"></i>' +
                    "</button>" +
                    "</div>";

                return html;
            }
        }],
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Lo sentimos, la marca que busca no se encuentra",
            info: "Página _PAGE_ de _PAGES_",
            infoEmpty: "No se han generado marcas",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar:",
            loadingRecords: "Cargando marcas",
            paginate: {
                first: "Primera",
                last: "Última",
                next: "Siguiente",
                previous: "Anterior"
            }
        },
        lengthChange: false,
    });
}

function initDTModelo() {
    if (dTModelo) {
        dTModelo.destroy();
    }
    dTModelo = $("#modelos-datatables").DataTable({
        ajax: {
            url: "/parametros/getModelos",
            dataSrc: "",
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() }
        },
        responsive: true,
        columns: [{
            data: "marca"
        }, {
            data: "modelo"
        }, {
            render: function(data, type, row, meta) {
                var html = "";
                html +=
                    '<div class="form-button-action">' +
                    '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" onClick="editModelo(' +
                    row["id_modelo"] +
                    ')">' +
                    '<i class="fas fa-edit"></i>' +
                    "</button>" +
                    '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-danger btn-lg" onClick="deleteModelo(' +
                    row["id_modelo"] +
                    ')">' +
                    '<i class="fas fa-trash"></i>' +
                    "</button>" +
                    "</div>";

                return html;
            }
        }],
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Lo sentimos, el modelo que busca no se encuentra",
            info: "Página _PAGE_ de _PAGES_",
            infoEmpty: "No se han generado modelos",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar:",
            loadingRecords: "Cargando modelos",
            paginate: {
                first: "Primera",
                last: "Última",
                next: "Siguiente",
                previous: "Anterior"
            }
        },
        lengthChange: false,
    })
}

function initDTTipo() {
    if (dTTipo) {
        dTTipo.destroy();
    }
    dTTipo = $("#tipos-datatables").DataTable({
        ajax: {
            url: "/parametros/getTipoMaquinarias",
            dataSrc: "",
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() }
        },
        destroy: true,
        responsive: true,
        columns: [{
            data: "tipo"
        }, {
            render: function(data, type, row, meta) {
                var html = "";
                html +=
                    '<div class="form-button-action">' +
                    '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" onClick="editTipo(' +
                    row["id"] +
                    ')">' +
                    '<i class="fas fa-edit"></i>' +
                    "</button>" +
                    '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-danger btn-lg" onClick="deleteTipo(' +
                    row["id"] +
                    ')">' +
                    '<i class="fas fa-trash"></i>' +
                    "</button>" +
                    "</div>";

                return html;
            }
        }],
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Lo sentimos, el tipo que busca no se encuentra",
            info: "Página _PAGE_ de _PAGES_",
            infoEmpty: "No se han generado tipos de maquinarias",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar:",
            loadingRecords: "Cargando tipos de maquinarias",
            paginate: {
                first: "Primera",
                last: "Última",
                next: "Siguiente",
                previous: "Anterior"
            }
        },
        lengthChange: false,
    });
}

function editMarca(id) {
    var data = {
        id: id
    }
    $.ajax({
        url: "/parametros/getMarcaId",
        method: "POST",
        data: data,
        headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
        success: function(res) {
            console.log(res);
            $("#marca-txt").val(res[0]["marca"])
            $(".btn-save-marca").attr("id", res[0]["id"]);
            // initDTMarca();
            $("#modal-marca").modal("show");
        }
    })
}

function editModelo(id) {
    $("#marca-search").addClass("disabled");
    var data = {
        id: id
    }
    $.ajax({
        url: "/parametros/getModeloId",
        method: "POST",
        data: data,
        headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
        success: function(res) {
            console.log(res);
            $("#modelo-txt").val(res[0]["modelo"])
            $(".btn-save-modelo").attr("id", res[0]["id_modelo"]);
            $("#marca-search").children("input").val(res[0]["marca"]);
            initDTModelo();
            $("#modal-modelo").modal("show");
        }
    })
}

function deleteMarca(id) {
    $.ajax({
        url: "/parametros/removeMarca",
        method: "POST",
        data: { id: id },
        headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
        success: function(res) {
            console.log(res);

            if (res["tipo"] == 1 && res["RES"] == false) {
                Swal.fire("Alerta", "No es posible eliminar la marca ya que existen modelos que pertenecen a la marca que intenta eliminar", 'warning');
            } else if (res["RES"] == 1) {
                Swal.fire("Alerta", "Marca eliminada correctamente", 'success');
                initDTMarca();
            } else {
                Swal.fire("Alerta", "No es posible eliminar la marca, inténtelo nuevamente", 'warning');

            }

        }
    })
}

function deleteModelo(id) {
    $.ajax({
        url: "/parametros/removeModelo",
        method: "POST",
        data: { id: id },
        headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
        success: function(res) {
            console.log(res);

            if (res["RES"] == 1) {
                Swal.fire("Alerta", "Modelo eliminado correctamente", 'success');
                initDTModelo();
            } else {
                Swal.fire("Alerta", "No es posible eliminar el modelo, inténtelo nuevamente", 'warning');
            }

            // if (res["tipo"] == 1) {
            //     Swal.fire("Alerta", "No es posible eliminar la marca ya que existen modelos que pertenecen a la marca que intenta eliminar", 'warning');
            // } else {
            //     Swal.fire("Alerta", "No es posible eliminar la marca, inténtelo nuevamente", 'warning');
            // }


        }
    })
}

$(".btn-save-marca").click(function() {
    var data = {
        marca: $("#marca-txt").val(),
        id: this.id
    };
    if ($("#marca-txt").val() != '') {
        ajax_all(
            "/parametros/addMarca", data,
            "",
            parsearAddMarca,
            "",
            ""
        );
    } else {
        Swal.fire("Alerta", "El campo de marca esta vacío", 'warning');
    }

})

function parsearAddMarca(data) {
    console.log(data);
    if (data["RES"]) {
        $("#modal-marca").modal("hide");
        initDTMarca();
        Swal.fire("Alerta", "La marca fue registrada exitosamente", 'success');
    } else {
        Swal.fire("Alerta", "Lo sentimos, ocurrió un error al agregar la marca, intentelo nuevamente", 'error');
    }
}

$(".btn-save-modelo").click(function() {
    var data = {
        modelo: $("#modelo-txt").val(),
        id: this.id,
        id_marca: id_marca
    };
    if ($("#modelo-txt").val() != '') {
        ajax_all(
            "/parametros/addModelo", data,
            "",
            parsearAddModelo,
            "",
            ""
        );
    } else {
        Swal.fire("Alerta", "El campo de modelo esta vacío", 'warning');
    }

})

function parsearAddModelo(data) {
    console.log(data);
    if (data["RES"]) {
        $("#modal-modelo").modal("hide");
        id_marca = 0;
        initDTModelo();
        Swal.fire("Alerta", "El modelo fue registrada exitosamente", 'success');
    } else {
        Swal.fire("Alerta", "Lo sentimos, ocurrió un error al agregar el modelo, intentelo nuevamente", 'error');
    }
}

$(".btn-save-tipo").click(function() {
    var data = {
        tipo: $("#tipo-txt").val(),
        id: this.id
    };
    if ($("#tipo-txt").val() != '') {
        ajax_all(
            "/parametros/addTipo", data,
            "",
            parsearAddTipo,
            "",
            ""
        );
    } else {
        Swal.fire("Alerta", "El campo de tipo esta vacío", 'warning');
    }

})

function parsearAddTipo(data) {
    console.log(data);
    if (data["RES"]) {
        $("#modal-tipo").modal("hide");
        initDTTipo();
        $("#tipo-txt").val("");
        Swal.fire("Alerta", "El tipo de maquinaria fue registrada exitosamente", 'success');
    } else {
        Swal.fire("Alerta", "Lo sentimos, ocurrió un error al agregar el tipo, intentelo nuevamente", 'error');
    }
}
