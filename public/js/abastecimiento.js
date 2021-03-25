$("#addAbastecimiento").modal("attach events", "#addAbastecimientoBtn", "show");
var dT;
initDataTable();
var id_equipo = 0,
    id_abastecedor = 0,
    id_ubicacion = 0,
    id_responsable = 0;

function initDataTable() {
    if (dT) {
        dT.destroy();
    }
    dT = $("#basic-datatables").DataTable({
        ajax: {
            url: "/maquinarias/getAbastecimiento",
            dataSrc: "",
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() }
        },
        responsive: true,
        columns: [
            // {
            //     render: function(data, type, row, meta) {
            //         console.log();
            //         var html = "";
            //         html +=
            //             '<div class="logo">' +
            //             '<img src="https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=' +
            //             row["img"] +
            //             '&w=50&h=50">' +
            //             "</div>";
            //         return html;
            //     },
            // },
            {
                data: "descripcion"
            },
            {
                data: "codigo"
            },
            {
                data: "fecha_abastecimiento"
            },
            {
                data: "ubicacion"
            },
            {
                data: "abastecedor"
            },
            {
                data: "responsable"
            },
            {
                data: "turno"
            },
            {
                data: "galones"
            },
            // {
            //     render: function(data, type, row, meta) {
            //         console.log(data);
            //         var html = "";
            //         html +=
            //             '<div class="form-button-action">' +
            //             '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" onClick="editEmpresa(' +
            //             row["id"] +
            //             ')" data-toggle="modal" data-target="#modal-empresa" data-original-title="Edit Task">' +
            //             '<i class="fas fa-edit"></i>' +
            //             "</button>" +
            //             "</div>";
            //         return html;
            //     }
            // }
        ],
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Lo sentimos, el registro de abastecimiento que busca no se encuentra",
            info: "Página _PAGE_ de _PAGES_",
            infoEmpty: "No se han generado registros de abastecimiento",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar:",
            loadingRecords: "Cargando datos de abastecimiento",
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
                filename: "Abastecimiento_" + today,
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: "pdfHtml5",
                filename: "Abastecimiento_" + today,
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            }
        ],

        dom: "Bfrtip"
    });
}

$("#equipo-search")
    .children("input")
    .keyup(function() {
        if (this.value.length > 1) {
            var data = {
                query: this.value
            };
            ajax_all(
                "/maquinarias/buscarMaquinaria",
                data,
                "",
                buscarEquipo,
                "",
                ""
            );
        }
    });

function buscarEquipo(data) {
    var json = data["RES"];
    var n = json.length;
    var title = "",
        descripcion = "",
        image = "";
    if (n > 0) {
        content = [];
        if (json != false) {
            $(json).each(function(i, v) {

                if (v.nombre != null && v.placa != null) {
                    title = v.nombre;
                    descripcion = v.placa;
                    console.log('descripcion1', descripcion);
                } else if ((v.nombre == null && v.nombre == "null") || (v.placa != null && v.placa == "null")) {
                    title = v.codigo;
                    descripcion = v.placa;
                    console.log('descripcion2', descripcion);
                    console.log(v.nombre);
                    console.log(v.placa);
                } else if (v.nombre == null && v.placa == null) {
                    title = v.codigo;
                    descripcion = v.descripcion;
                    console.log('descripcion3', descripcion);
                }
                if (v.img == null || v.img == "" || v.img == "null") {
                    image = 'logo.png'
                } else {
                    image = v.img;
                }
                console.log(image);
                content.push({
                    title: title,
                    description: descripcion,
                    id: v.id,
                    horometro: v.horometro,
                    image: "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
                        image +
                        "&w=50&h=50"
                });
            });
        }
        console.log(content);

        $("#equipo-search").search({
            minCharacters: 3,
            searchFields: ["title", "description"],
            error: {
                noResults: "No se encontraron resultados."
            },
            source: content,
            onSelect: function(result, response) {
                $("#div-search").hide();
                var id = result.id;
                id_equipo = id;
            }
        });
    }
}

$("#abastecedor-search")
    .children("input")
    .keyup(function() {
        if (this.value.length > 1) {
            var data = {
                query: this.value
            };
            ajax_all(
                "/maquinarias/buscarMaquinaria",
                data,
                "",
                buscarAbastecedor,
                "",
                ""
            );
        }
    });

function buscarAbastecedor(data) {
    var json = data["RES"];
    var n = json.length;
    var title = "",
        descripcion = "",
        image = "";
    if (n > 0) {
        content = [];
        if (json != false) {
            $(json).each(function(i, v) {

                if (v.nombre != null && v.placa != null) {
                    title = v.nombre;
                    descripcion = v.placa;
                    console.log('descripcion1', descripcion);
                } else if ((v.nombre == null && v.nombre == "null") || (v.placa != null && v.placa == "null")) {
                    title = v.codigo;
                    descripcion = v.placa;
                    console.log('descripcion2', descripcion);
                    console.log(v.nombre);
                    console.log(v.placa);
                } else if (v.nombre == null && v.placa == null) {
                    title = v.codigo;
                    descripcion = v.descripcion;
                    console.log('descripcion3', descripcion);
                }
                if (v.img == null || v.img == "" || v.img == "null") {
                    image = 'logo.png'
                } else {
                    image = v.img;
                }
                console.log(image);
                content.push({
                    title: title,
                    description: descripcion,
                    id: v.id,
                    horometro: v.horometro,
                    image: "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
                        image +
                        "&w=50&h=50"
                });
            });
        }
        console.log(content);

        $("#abastecedor-search").search({
            minCharacters: 3,
            searchFields: ["title", "description"],
            error: {
                noResults: "No se encontraron resultados."
            },
            source: content,
            onSelect: function(result, response) {
                $("#div-search").hide();
                var id = result.id;
                id_abastecedor = id;
            }
        });
    }
}

$("#responsable-search")
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
                buscarresponsable,
                "",
                ""
            );
        }
    });

function buscarresponsable(data) {
    var json = data["RES"];
    var n = json.length;
    var title = "",
        descripcion = "",
        image = "";
    if (n > 0) {
        content = [];
        if (json != false) {
            $(json).each(function(i, v) {
                content.push({
                    title: v.nombre + " " + v.apellido,
                    description: v.cargo,
                    id: v.id,
                    image: "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
                        v.foto +
                        "&w=50&h=50"
                });
            });
        }
        console.log(content);

        $("#responsable-search").search({
            minCharacters: 3,
            searchFields: ["title", "description"],
            error: {
                noResults: "No se encontraron resultados."
            },
            source: content,
            onSelect: function(result, response) {
                $("#div-search").hide();
                var id = result.id;
                id_responsable = id;
            }
        });
    }
}

$("#ubicacion-search")
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

        $("#ubicacion-search").search({
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
            }
        });
    }
}

$("#turno").dropdown();

$("#btn-save").click(function() {
    var data = {
        id_equipo: id_equipo,
        id_abastecedor: id_abastecedor,
        id_responsable: id_responsable,
        id_ubicacion: id_ubicacion,
        galones: $("#galones")
            .children("input")
            .val(),
        turno: $("#turno").dropdown('get text')
    };
    console.log(data);
    ajax_all(
        "/maquinarias/setAbastecimiento",
        data,
        "",
        verificarRegistro,
        "",
        ""
    );
});

function verificarRegistro(data) {
    console.log(data);
    var d = data["RES"][0]["proc_reg_abastecimiento"];
    var da = d.split("****");
    if (da[0] == da[1]) {
        Swal.fire(
            "Exito",
            "Abastecimiento de combustible registrado correctamente",
            "success"
        );
        initDataTable();
        $(".ui.modal").modal("hide");
        limpiar();
    } else {}
}

function limpiar() {
    id_equipo = null;
    id_abastecedor = null;
    id_ubicacion = null;
    $("#galones")
        .children("input")
        .val("");
}
