// $("#estado")
//     .attr("disabled", true);
$("#modal-add-maquinaria").modal("attach events", "#addMaquinariaBtn", "show");
$("#addMaquinariaBtn").click(function() {
    $("#modal-add-maquinaria .header").html("Nueva Maquinaria");
    $(".btn-save").attr("id", "");
})


$(".ui.dropdown").dropdown();
var id_modelo = 0,
    id_empresa = 0,
    id_operador = 0,
    id_ubicacion = 0,
    id_ubicacion_secundaria = 0,
    id_maquinaria = 0,
    id_tipoMaquinaria = 0;
var dTMaq;
$("#mod-anio").yearpicker({
    // Start Year
    startYear: 1950,
    // End Year
    endYear: new Date().getFullYear()
});
initDataTableMaq();

function initDataTableMaq() {
    if (dTMaq) {
        dTMaq.destroy();
    }
    dTMaq = $("#maquinarias-datatables").DataTable({
        ajax: {
            url: "/maquinarias/getmaquinaria",
            dataSrc: "",
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() }
        },
        responsive: true,
        columns: [{
                data: "empresa"
            },
            {
                data: "operador_nom"
            },
            {
                render: function(data, type, row, meta) {
                    var html = "";
                    html +=
                        '<div class="logo">' +
                        '<img src="https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=' +
                        row["img"] +
                        '&w=50&h=50">' +
                        "</div>";
                    return html;
                }
            },
            {
                data: "tipo"
            },
            {
                data: "codigo"
            },
            {
                data: "marca"
            },
            {
                data: "modelo"
            },
            {
                data: "serie"
            },
            {
                data: "numero_motor"
            },
            {
                data: "placa"
            },
            {
                data: "anio"
            },
            {
                data: "estado_nom"
            },
            {
                render: function(data, type, row, meta) {
                    var html = "";
                    html +=
                        '<div class="form-button-action ui icon buttons">' +
                        '<button type="button" class="ui button" onClick="editMaquinaria(' +
                        row["id"] +
                        ')">' +
                        '<i class="icon edit"></i>' +
                        "</button>" +
                        '<button type="button" class="ui button" onClick="deleteMaquinaria(' +
                        row["id"] +
                        ')">' +
                        '<i class="icon trash"></i>' +
                        "</button>" +
                        '<button type="button" class="ui button" onClick="mantenimientoMaquinaria(' +
                        row["id"] +
                        "," +
                        row["subtipo"] +
                        ')">' +
                        '<i class="icon wrench"></i>' +
                        "</button>" +
                        "</div>";

                    return html;
                }
            }
        ],
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Lo sentimos, la factura que busca no se encuentra",
            info: "Página _PAGE_ de _PAGES_",
            infoEmpty: "No se han generado registros de maquinarias",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar:",
            loadingRecords: "Cargando registros de maquinarias",
            paginate: {
                first: "Primera",
                last: "Última",
                next: "Siguiente",
                previous: "Anterior"
            }
        },
        lengthChange: false,

        buttons: [{
                extend: "excelHtml5",
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6]
                }
            },
            {
                extend: "pdfHtml5",
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6]
                }
            }
        ],

        dom: "Bfrtip"
    });
}

function editMaquinaria(id) {
    console.log(id);
    ajax_all(
        "/maquinarias/getmaquinariaId", { id: id },
        "",
        parsearMaquinariaMaqId,
        "",
        ""
    );
}

function parsearMaquinariaMaqId(data) {
    console.log(data);
    $("#modal-add-maquinaria .header").html("Editar Maquinaria");
    console.log(data[0]["codigo"]);
    id_empresa = data[0]["id_empresa"];
    id_ubicacion = data[0]["id_ubicacion_principal"];
    id_ubicacion_secundaria = data[0]["id_ubicacion_secundaria"];
    id_tipoMaquinaria = data[0]["id_tipo"];
    id_modelo = data[0]["modelo_maq"];
    $(".btn-save").attr("id", data[0]["id"]);
    $("#mod-codigo").val(data[0]["codigo"]);
    $("#mod-descripcion").val(data[0]["descripcion"]);
    // $("#estado").val(data[0]["estado"]);
    $("#estado").dropdown("set selected", data[0]["estado"]);
    $("#empresa-search")
        .children("input")
        .val(data[0]["empresa"]);
    $("#ubicacion-maq-search")
        .children("input")
        .val(data[0]["ubicacion"]);
    $("#tipo-maquinaria-search")
        .children("input")
        .val(data[0]["tipo"]);
    $("#mod-anio").val(data[0]["anio"]);
    $("#mod-placa").val(data[0]["placa"]);
    $("#mod-color").val(data[0]["color"]);
    $("#modelo-search")
        .children("input")
        .val(data[0]["modelo"]);
    $("#mod-serie").val(data[0]["serie"]);
    $("#mod-motor").val(data[0]["motor"]);
    $("#mod-serie-motor").val(data[0]["serie_motor"]);
    $("#mod-potencia").val(data[0]["potencia"]);
    $("#mod-horometro").val(data[0]["horometro"]);
    $("#mod-fecha-compra").val(data[0]["fecha_compra"]);
    $("#mod-fecha-mantenimiento").val(data[0]["fecha_mantenimiento"]);
    // $("#mod-horometro").val(data[0]["horometro"]);
    // $("#mod-horometro").val(data[0]["horometro"]);
    // $("#mod-horometro").val(data[0]["horometro"]);
    // $("#mod-horometro").val(data[0]["horometro"]);
    $("#modal-add-maquinaria").modal("show");
}

function deleteMaquinaria(id) {
    Swal.fire({
        title: "¿Quiere eliminar este registro de maquinaria?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Sí`,
        denyButtonText: `No`,
        cancelButtonText: "No"
    }).then(result => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            // Swal.fire("Saved!", "", "success");
            $.ajax({
                url: "/maquinarias/deleteMaquinaria",
                method: "POST",
                data: { id: id },
                headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
                success: function(res) {
                    if (res["RES"] != false) {
                        Swal.fire(
                            "Éxito!",
                            "Maquinaria eliminada correctamente",
                            "success"
                        );
                        initDataTableMaq();
                    } else {
                        Swal.fire(
                            "Alerta",
                            "Ocurrió un error al eliminar la maquinaria, inténtelo nuevamente",
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
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
}

function mantenimientoMaquinaria(id) {}

var carImgs = 0;
$("#file-es").fileinput({
    theme: "fa",
    uploadUrl: "https://api-mantenimiento.paedpaal.com/api/guardarImgEquipo",
    uploadExtraData: function() {
        return {
            _token: $("#csrf-token").val(),
            _id: id_maquinaria
        };
    },
    allowedFileExtensions: ["jpg", "png", "gif", "jpeg"],
    overwriteInitial: false,
    maxFileSize: 2000,
    maxFilesNum: 10,
    slugCallback: function(filename) {
        return filename.replace("(", "_").replace("]", "_");
    }
});

$("#file-es").on("fileloaded", function(event, file, previewId, index, reader) {
    carImgs = 1;
});
$("#file-es").on("filecleared", function(event) {
    carImgs = 0;
});

$("#file-es").on("fileunlock", function(event, filestack, extraData) {
    //forminscripcion()

    $("#codigoPre").val("");
    carImgs = 0;
    // setTimeout(window.location.reload(),1000);
});

$("#empresa-search")
    .children("input")
    .keyup(function() {
        if (this.value.length > 1) {
            var data = {
                query: this.value
            };
            ajax_all(
                "/empresas/buscarEmpresa",
                data,
                "",
                buscarEmpresa,
                "",
                ""
            );
        }
    });

function buscarEmpresa(data) {
    var json = data["RES"];
    var n = json.length;
    if (n > 0) {
        content = [];
        if (json != false) {
            $(json).each(function(i, v) {
                content.push({
                    title: v.razon_social,
                    description: v.ruc,
                    id: v.id,
                    image: "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
                        v.avatar +
                        "&w=50&h=50"
                });
            });
        }

        $("#empresa-search").search({
            minCharacters: 3,
            searchFields: ["title", "description"],
            error: {
                noResults: "No se encontraron resultados."
            },
            source: content,
            onSelect: function(result, response) {
                $("#div-search").hide();
                var id = result.id;
                id_empresa = id;
                databus = {
                    bus: id
                };
            }
        });
    }
}

$("#operador-search")
    .children("input")
    .keyup(function() {
        if (this.value.length > 1) {
            var data = {
                query: this.value
            };
            ajax_all(
                "/personal/buscarTrabajador",
                data,
                "",
                buscarOperador,
                "",
                ""
            );
        }
    });

function buscarOperador(data) {
    var json = data["RES"];
    var n = json.length;
    if (n > 0) {
        content = [];
        if (json != false) {
            $(json).each(function(i, v) {
                content.push({
                    title: v.full_name,
                    nombre: v.nombre,
                    apellido: v.apellido,
                    description: v.cargo,
                    id: v.id,
                    image: "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
                        v.foto +
                        "&w=50&h=50"
                });
            });
        }
        console.log(content);
        $("#operador-search").search({
            minCharacters: 2,
            searchFields: ["title", "description"],
            error: {
                noResults: "No se encontraron resultados."
            },
            source: content,
            onSelect: function(result, response) {
                $("#div-search").hide();
                var id = result.id;
                id_operador = id;
                databus = {
                    bus: id
                };
            }
        });
    }
}

$("#ubicacion-maq-search")
    .children("input")
    .keyup(function() {
        if (this.value.length > 1) {
            var data = {
                query: this.value
            };
            ajax_all(
                "/maquinarias/buscarUbicacion",
                data,
                "",
                buscarUbicacion,
                "",
                ""
            );
        }
    });

function buscarUbicacion(data) {
    var json = data["RES"];
    var n = json.length;
    if (n > 0) {
        content = [];
        if (json != false) {
            $(json).each(function(i, v) {
                content.push({
                    title: v.title,
                    id: v.id_ubicacion,
                    id_s: v.id_ubicacion_secundaria
                });
            });
        }

        $("#ubicacion-maq-search").search({
            minCharacters: 3,
            searchFields: ["title"],
            error: {
                noResults: "No se encontraron resultados."
            },
            source: content,
            onSelect: function(result, response) {
                $("#div-search").hide();
                var id = result.id;
                id_ubicacion = id;
                id_ubicacion_secundaria = result.id_s;
                databus = {
                    bus: id
                };
            }
        });
    }
}

$("#modelo-search")
    .children("input")
    .keyup(function() {
        if (this.value.length > 1) {
            var data = {
                query: this.value
            };
            ajax_all(
                "/maquinarias/buscarModelo",
                data,
                "",
                buscarModelo,
                "",
                ""
            );
        }
    });

function buscarModelo(data) {
    var json = data["RES"];
    var n = json.length;
    if (n > 0) {
        content = [];
        if (json != false) {
            $(json).each(function(i, v) {
                content.push({
                    title: v.modelo,
                    description: v.marca,
                    id: v.id_modelo
                });
            });
        }

        $("#modelo-search").search({
            minCharacters: 3,
            searchFields: ["title", "description"],
            error: {
                noResults: "No se encontraron resultados."
            },
            source: content,
            onSelect: function(result, response) {
                $("#div-search").hide();
                var id = result.id;
                id_modelo = id;
                databus = {
                    bus: id
                };
            }
        });
    }
}

ajax_all(
    "/parametros/getAlternativa", { codigo: "00000002" },
    "",
    unidadesPotencia,
    "",
    ""
);

function unidadesPotencia(data) {
    var html = "";
    var da = data["RES"];
    for (let i = 0; i < da.length; i++) {
        html =
            html +
            '<option value="' +
            da[i]["alt_orden"] +
            '">' +
            da[i]["alt_alternativa"] +
            "</option>";
    }
    $("#unidad-potencia").html(html);
}

$(".btn-save").click(function() {
    var data = {
        nombre: $("#mod-nombre").val(),
        placa: $("#mod-placa").val(),
        color: $("#mod-color").val(),
        anio: $("#mod-anio").val(),
        descripcion: $("#tipo-maquinaria-search").children("input").val(),
        tipo: id_tipoMaquinaria,
        modelo: id_modelo,
        serie: $("#mod-serie").val(),
        motor: $("#mod-motor").val(),
        serie_motor: $("#mod-serie-motor").val(),
        codigo: $("#mod-codigo").val(),
        potencia: $("#mod-potencia").val(),
        unidad_potencia: $("#unidad-potencia").val(),
        horometro: $("#mod-horometro").val(),
        fecha_compra: $("#mod-fecha-compra").val(),
        fecha_mantenimiento: $("#mod-fecha-mantenimiento").val(),
        periodo_mantenimiento: $("#mod-periodo-mantenimiento").val(),
        empresa: id_empresa,
        ubicacion: id_ubicacion,
        ubicacion_secundaria: id_ubicacion_secundaria,
        operador: id_operador,
        estado: $("#estado").val(),
        id: this.id
    };
    ajax_all("/maquinarias/regMaquinaria", data, "", verificarRegistro, "", "");
    console.log(data);
});

function verificarRegistro(data) {
    console.log(data);

    if (data["RES"][0]["proc_reg_equipo"]) {
        var d = data["RES"][0]["proc_reg_equipo"];
        var da = d.split("****");
        if (da[0] == da[1]) {
            id_maquinaria = da[0];
            if (carImgs != 0) {
                $("#file-es").fileinput("upload");
            }

            Swal.fire(
                "Exito",
                "Maquinaria registrada correctamente",
                "success"
            );
            initDataTableMaq();
            $(".btn-save").attr("id", "");
            $("#addMaquinaria").modal("hide");
            $(".ui.modal").modal("hide");
            carImgs = 0;
            // $("#mod-nombre").val(""),
            //     $("#mod-placa").val(""),
            //     $("#mod-color").val(""),
            //     $("#mod-anio").val(""),
            //     $("#mod-descripcion").val(""),
            //     (id_modelo = 0),
            //     $("#mod-serie").val(""),
            //     $("#mod-motor").val(""),
            //     $("#mod-serie-motor").val(""),
            //     $("#mod-codigo").val(""),
            //     $("#mod-potencia").val(""),
            //     $("#unidad-potencia").val(""),
            //     $("#mod-horometro").val(""),
            //     $("#mod-fecha-compra").val(""),
            //     $("#mod-fecha-mantenimiento").val(""),
            //     $("#mod-periodo-mantenimiento").val(""),
            //     (id_empresa = 0),
            //     (id_ubicacion = 0),
            //     (id_maquinaria = 0);
        } else {}
    } else if (data["RES"][0]["proc_update_equipo"]) {
        var d = data["RES"][0]["proc_update_equipo"];
        var da = d.split("****");
        if (da[0] == da[1]) {
            id_maquinaria = da[0];
            if (carImgs != 0) {
                $("#file-es").fileinput("upload");
            }
            Swal.fire(
                "Exito",
                "Maquinaria actualizada correctamente",
                "success"
            );
            initDataTableMaq();
            $(".btn-save").attr("id", "");
            $("#addMaquinaria").modal("hide");
            $(".ui.modal").modal("hide");
            carImgs = 0;
            // $("#mod-nombre").val(""),
            //     $("#mod-placa").val(""),
            //     $("#mod-color").val(""),
            //     $("#mod-anio").val(""),
            //     $("#mod-descripcion").val(""),
            //     (id_modelo = 0),
            //     $("#mod-serie").val(""),
            //     $("#mod-motor").val(""),
            //     $("#mod-serie-motor").val(""),
            //     $("#mod-codigo").val(""),
            //     $("#mod-potencia").val(""),
            //     $("#unidad-potencia").val(""),
            //     $("#mod-horometro").val(""),
            //     $("#mod-fecha-compra").val(""),
            //     $("#mod-fecha-mantenimiento").val(""),
            //     $("#mod-periodo-mantenimiento").val(""),
            //     (id_empresa = 0),
            //     (id_ubicacion = 0),
            //     (id_maquinaria = 0);
        }
    }

    $("#mod-nombre").val("");
    $("#mod-placa").val("");
    $("#mod-color").val("");
    $("#mod-anio").val("");
    $("#tipo-maquinaria-search").children("input").val("");
    id_tipoMaquinaria = 0;
    id_modelo = 0;
    $("#modelo-search").children('input').val("")
    $("#mod-serie").val("");
    $("#mod-motor").val("");
    $("#mod-serie-motor").val("");
    $("#mod-codigo").val("");
    $("#mod-potencia").val("");
    $("#unidad-potencia").val("");
    $("#mod-horometro").val("");
    $("#mod-fecha-compra").val("");
    $("#mod-fecha-mantenimiento").val("");
    $("#mod-periodo-mantenimiento").val("");
    id_empresa = 0;
    $("#empresa-search").children('input').val("")
    id_ubicacion = 0;
    $("#ubicacion-maq-search").children('input').val("")
    id_ubicacion_secundaria = 0;
    id_operador = 0;
    $("#operador-search").children('input').val("")
    $("#estado").val("");
    $(".btn-save").attr('id', "");
}

$("#tipo-maquinaria-search")
    .children("input")
    .keyup(function() {
        if (this.value.length > 1) {
            var data = {
                query: this.value
            };
            ajax_all(
                "/parametros/buscarTipoMaquinaria",
                data,
                "",
                buscarTipoMaquinaria,
                "",
                ""
            );
        }
    });

function buscarTipoMaquinaria(data) {
    var json = data["RES"];
    var n = json.length;
    if (n > 0) {
        content = [];
        if (json != false) {
            $(json).each(function(i, v) {
                content.push({
                    title: v.tipo,
                    id: v.id
                });
            });
        }

        $("#tipo-maquinaria-search").search({
            minCharacters: 3,
            searchFields: ["title"],
            error: {
                noResults: "No se encontraron resultados."
            },
            source: content,
            onSelect: function(result, response) {
                $("#div-search").hide();
                var id = result.id;
                id_tipoMaquinaria = id;
                databus = {
                    bus: id
                };
            }
        });
    }
}
