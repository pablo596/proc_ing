$(".ui.dropdown").dropdown();
$(".close-modal").modal("hide");
$(".ui.accordion").accordion();

function mantenimientoMaquinaria(id, subtipo) {
    if (subtipo == 1) {
        $("#label-intervalo").html("H");
    } else {
        $("#label-intervalo").html("Km");
    }
    if (id == 0) {
        $("#form-new-mantenimiento").modal('setting', 'closable', false).modal("show");
    } else {
        ajax_all(
            "/parametros/getCicloMantenimiento", { tipo: subtipo },
            "",
            intervaloMantenimiento,
            "",
            ""
        );
        ajax_all(
            "/maquinarias/getmaquinariaId", { id: id },
            "",
            parsearMaquinariaId,
            "",
            ""
        );
    }
}

function parsearMaquinariaId(data) {
    console.log(data);
    console.log(data[0]["ubicacion"]);
    id_maquinaria = data[0]["id"];
    $(".equipo-search")
        .children("input")
        .val(data[0]["codigo"]);
    $("#ubicacion-maq-search")
        .children("input")
        .val(data[0]["ubicacion"]);
    $("#horo_pro_a").val(data[0]["horometro"]);
    $("#horo_rea_a").val(data[0]["horometro"]);
    $("#intervalo").dropdown(
        "set selected",
        data[0]["ubicacion_ciclo_mantenimiento_nom"]
    );
}

var now = new Date();

var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear() + "-" + month + "-" + day;

$("#fecha_ejecucion").val(today);
(h = now.getHours()), (m = now.getMinutes());
if (h < 10) h = "0" + h;
if (m < 10) m = "0" + m;
$("#hora_inicio").val(h + ":" + m);
var id_ejecutor = 0,
    id_jefe_taller = 0,
    id_equipo = 0,
    id_ubicacion = 0;
var aceites = [],
    filtros = [];
var dTMant;
initDataTable();

function initDataTable() {
    if (dTMant) {
        dTMant.destroy();
    }
    dTMant = $("#mantenimiento-datatables").DataTable({
        ajax: {
            url: "/maquinarias/getMantenimiento",
            dataSrc: "",
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() }
        },
        responsive: true,
        columns: [{
                data: "descripcion_equipo"
            },
            {
                data: "codigo_equipo"
            },
            {
                data: "marca"
            },
            {
                data: "modelo"
            },
            {
                data: "estado_nom"
            },
            {
                data: "horometro"
            },
            {
                data: "fecha_actual"
            },
            {
                data: "ciclo"
            },
            {
                data: "horometro_rea_fin"
            },
            {
                data: "fecha"
            },
            {
                data: "ciclo_nuevo"
            },
            {
                data: "horometro_programado"
            },
            {
                data: "horas_restantes"
            },
            {
                render: function(data, type, row, meta) {
                    var html = "";
                    html +=
                        '<div class="form-button-action">' +
                        '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" onClick="viewMantenimiento(' +
                        row["id"] +
                        ')" >' +
                        '<i class="fas fa-file"></i>' +
                        "</button>" +
                        "</div>";
                    return html;
                }
            }
        ],
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Lo sentimos, el mantenimiento que busca no se encuentra",
            info: "Página _PAGE_ de _PAGES_",
            infoEmpty: "No se han generado registros de mantenimiento",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar:",
            loadingRecords: "Cargando datos de mantenimiento",
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
                filename: "Mantenimientos_" + today,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6]
                }
            },
            {
                extend: "pdfHtml5",
                filename: "Mantenimientos_" + today,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6]
                },
                orientation: "landscape"
            }
        ],

        dom: "Bfrtip"
    });
}

ajax_all(
    "/parametros/getAlternativa", { codigo: "00000004" },
    "",
    filtrosDatos,
    "",
    ""
);

ajax_all(
    "/parametros/getAlternativa", { codigo: "00000005" },
    "",
    aceitesDatos,
    "",
    ""
);
var filtros_cambio = [],
    filtros_instruccion = [],
    filtros_referencia = [],
    filtros_counter = 0,
    aceites_cambio = [],
    aceites_instruccion = [],
    aceites_counter = 0;

function filtrosDatos(data) {
    var da = data["RES"];
    filtros = [];
    filtros_cambio = [];
    filtros_instruccion = [];
    filtros_referencia = [];
    // filtros = da;
    for (let i = 0; i < da.length; i++) {
        // ht += "<tr>";
        if (da[i]["alt_peso"] == "1") {
            filtros_cambio.push({ value: da[i]["alt_orden"], alternativa: da[i]["alt_alternativa"] })

        }
        if (da[i]["alt_peso"] == "2") {
            filtros_instruccion.push({ value: da[i]["alt_orden"], alternativa: da[i]["alt_alternativa"] })

        }
        if (da[i]["alt_peso"] == "3") {
            filtros_referencia.push({ value: da[i]["alt_orden"], alternativa: da[i]["alt_alternativa"] })

        }

    }
    htmfc = '<select class="ui dropdown fluid filtro-cambio"><option value="">Seleccione el cambio</option>'
    filtros_cambio.forEach(e => {
        htmfc += '<option value="' + e.value + '">' + e.alternativa + '</option>'
    });
    htmfc += '</select>';

    htmfi = '<select class="ui dropdown fluid filtro-instruccion"><option value="">Seleccione el cambio</option>'
    filtros_instruccion.forEach(e => {
        htmfi += '<option value="' + e.value + '">' + e.alternativa + '</option>'
    });
    htmfi += '</select>';

    htmfr = '<select class="ui dropdown fluid filtro-referencia"><option value="">Seleccione el cambio</option>'
    filtros_referencia.forEach(e => {
        htmfr += '<option value="' + e.value + '">' + e.alternativa + '</option>'
    });
    htmfr += '</select>';
    $(".ui.dropdown").dropdown();
    t.row.add([
        htmfc,
        htmfi,
        htmfr,
        '<div class="ui checkbox filtro-cambio-chk"><input type="checkbox" /><label></label></div>',
        '<div class="ui checkbox filtro-limpieza-chk"><input type="checkbox" /><label></label></div>',
        '<textarea class="form-control filtro-comentario"></textarea>',
        ''
    ]).draw(false);
    $(".ui.checkbox").checkbox();
    $(".ui.dropdown").dropdown();
    // $(".ui.checkbox").checkbox();
}

function aceitesDatos(data) {
    var da = data["RES"];
    aceites = [];
    aceites_cambio = [];
    aceites_instruccion = [];
    aceites_referencia = [];
    // aceites = da;
    for (let i = 0; i < da.length; i++) {
        // ht += "<tr>";
        if (da[i]["alt_peso"] == "1") {
            aceites_cambio.push({ value: da[i]["alt_orden"], alternativa: da[i]["alt_alternativa"] })

        }
        if (da[i]["alt_peso"] == "2") {
            aceites_instruccion.push({ value: da[i]["alt_orden"], alternativa: da[i]["alt_alternativa"] })

        }
    }
    htmac = '<select class="ui dropdown fluid aceite-cambio"><option value="">Seleccione el cambio</option>'
    aceites_cambio.forEach(e => {
        htmac += '<option value="' + e.value + '">' + e.alternativa + '</option>'
    });
    htmac += '</select>';

    htmai = '<select class="ui dropdown fluid aceite-instruccion"><option value="">Seleccione el cambio</option>'
    aceites_instruccion.forEach(e => {
        htmai += '<option value="' + e.value + '">' + e.alternativa + '</option>'
    });
    htmai += '</select>';

    $(".ui.dropdown").dropdown();
    t1.row.add([
        htmac,
        htmai,
        '<div class="ui checkbox aceite-cambio-chk"><input type="checkbox" /><label></label></div>',
        '<div class="ui checkbox aceite-limpieza-chk"><input type="checkbox" /><label></label></div>',
        '<textarea class="form-control aceite-comentario"></textarea>',
        ''
    ]).draw(false);
    $(".ui.checkbox").checkbox();
    $(".ui.dropdown").dropdown();
    // $(".ui.checkbox").checkbox();
}

$("#ejecutado-search")
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
                buscarEjecutor,
                "",
                ""
            );
        }
    });

function buscarEjecutor(data) {
    var json = data["RES"];
    var n = json.length;

    content = [];
    if (json != false) {
        $(json).each(function(i, v) {
            content.push({
                title: v.nombre + " " + v.apellido,
                description: v.cedula,
                id: v.id,
                image: "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
                    v.foto +
                    "&w=50&h=50"
            });
        });
    }

    $("#ejecutado-search").search({
        minCharacters: 3,
        searchFields: ["title", "description"],
        error: {
            noResults: "No se encontraron resultados."
        },
        source: content,
        onSelect: function(result, response) {
            $("#div-search").hide();
            var id = result.id;
            id_ejecutor = id;
            databus = {
                bus: id
            };
        }
    });
}

$("#jefe_taller-search")
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
                buscarJefeTaller,
                "",
                ""
            );
        }
    });

function buscarJefeTaller(data) {
    var json = data["RES"];
    var n = json.length;

    content = [];
    if (json != false) {
        $(json).each(function(i, v) {
            content.push({
                title: v.nombre + " " + v.apellido,
                description: v.cedula,
                id: v.id,
                image: "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
                    v.foto +
                    "&w=50&h=50"
            });
        });
    }

    $("#jefe_taller-search").search({
        minCharacters: 3,
        searchFields: ["title", "description"],
        error: {
            noResults: "No se encontraron resultados."
        },
        source: content,
        onSelect: function(result, response) {
            $("#div-search").hide();
            var id = result.id;
            id_jefe_taller = id;
            databus = {
                bus: id
            };
        }
    });
}

$(".equipo-search")
    .children("input")
    .keyup(function() {
        console.log('a');
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
    console.log(data);
    content = [];
    if (json != false) {
        $(json).each(function(i, v) {
            content.push({
                title: v.codigo,
                description: v.descripcion,
                id: v.id,
                horometro: v.horometro,
                subtipo: v.subtipo,
                image: "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
                    v.img +
                    "&w=50&h=50"
            });
        });
    }
    console.log(content);
    $(".equipo-search").search({
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
            $("#horo_pro_a").val(result.horometro);
            $("#horo_rea_a").val(result.horometro);
            ajax_all(
                "/parametros/getCicloMantenimiento", { tipo: result.subtipo },
                "",
                intervaloMantenimiento,
                "",
                ""
            );
            databus = {
                bus: id
            };
        }
    });
}

$(".ubicacion-maq-search")
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

    $(".ubicacion-maq-search").search({
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
            databus = {
                bus: id
            };
        }
    });
}

function intervaloMantenimiento(data) {
    var html = "";
    var da = data["RES"];
    for (let i = 0; i < da.length; i++) {
        html =
            html +
            '<div class="item" data-value="' +
            da[i]["id"] +
            '">' +
            da[i]["ciclo"] +
            "</div>";
    }
    html =
        html +
        '<div class="divider"></div><div class="item" data-value="0">Otro</div>';
    $("#intervalo")
        .children(".menu")
        .html(html);
    $("#form-new-mantenimiento").modal("show");
}



var posicion_intervalo, posicion_intervalo_nom;
$("#intervalo-otro").hide();
$("#label-intervalo").hide();
$("#intervalo").dropdown({
    // action: "hide",
    onChange: function(value, text, $selectedItem) {
        console.log('a');
        var t = text.split(" ");
        $("#horo_pro_b").val(t[0]);
        $("#horo_pro_c").val(
            parseFloat($("#horo_pro_a").val()) + parseFloat(t[0])
        );
        posicion_intervalo = value;
        posicion_intervalo_nom = text;
        if (value == 0) {
            $("#intervalo-otro").show();
            $("#label-intervalo").show();
        } else {
            $("#intervalo-otro").hide();
            $("#label-intervalo").hide();
        }
    }
});

$("#horo_pro_a").keyup(function() {
    $("#horo_pro_c").val(
        parseFloat($("#horo_pro_a").val()) + parseFloat($("#horo_pro_b").val())
    );
});
$("#horo_pro_b").keyup(function() {
    $("#horo_pro_c").val(
        parseFloat($("#horo_pro_a").val()) + parseFloat($("#horo_pro_b").val())
    );
});
$("#horo_rea_a").keyup(function() {
    $("#horo_rea_c").val(
        parseFloat($("#horo_rea_a").val()) + parseFloat($("#horo_rea_b").val())
    );
});
$("#horo_rea_b").keyup(function() {
    $("#horo_rea_c").val(
        parseFloat($("#horo_rea_a").val()) + parseFloat($("#horo_rea_b").val())
    );
});

// Add Row
$('#add-row').DataTable({
    "pageLength": 5,
});

var action = '<td>' +
    '<div class="form-button-action"> ' +
    '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task"> <i class="fa fa-edit"></i> </button> ' +
    '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-danger" data-original-title="Remove"> <i class="fa fa-times"></i> </button> ' +
    '</div> ' +
    '</td>';
var t = $('#table-filtros').DataTable(),
    t1 = $('#table-aceites').DataTable();

var counter = 1;
console.log('nueva fila');
var htmfc = '',
    htmfi = "",
    htmfr = "",
    htmac = "",
    htmai = "";

$('#addRowFiltro').click(function() {
    htmfc = '<select class="ui dropdown fluid filtro-cambio"><option value="">Seleccione el cambio</option>'
    filtros_cambio.forEach(e => {
        htmfc += '<option value="' + e.value + '">' + e.alternativa + '</option>'
    });
    htmfc += '</select>';

    htmfi = '<select class="ui dropdown fluid filtro-instruccion"><option value="">Seleccione el cambio</option>'
    filtros_instruccion.forEach(e => {
        htmfi += '<option value="' + e.value + '">' + e.alternativa + '</option>'
    });
    htmfi += '</select>';

    htmfr = '<select class="ui dropdown fluid filtro-referencia"><option value="">Seleccione el cambio</option>'
    filtros_referencia.forEach(e => {
        htmfr += '<option value="' + e.value + '">' + e.alternativa + '</option>'
    });
    htmfr += '</select>';
    $(".ui.dropdown").dropdown();
    t.row.add([
        htmfc,
        htmfi,
        htmfr,
        '<div class="ui checkbox filtro-cambio-chk"><input type="checkbox" /><label></label></div>',
        '<div class="ui checkbox filtro-limpieza-chk"><input type="checkbox" /><label></label></div>',
        '<textarea class="form-control filtro-comentario"></textarea>',
        '<button class="circular ui icon button btn-remove-filtro" ><i class="icon red close"></i></button>'
    ]).draw(false);

    counter++;
    $('.ui.dropdown').dropdown();
});

$('#table-filtros tbody').on('click', '.btn-remove-filtro', function() {
    t
        .row($(this).parents('tr'))
        .remove()
        .draw();
});

$('#addRowAceites').click(function() {
    htmac = '<select class="ui dropdown fluid aceite-cambio"><option value="">Seleccione el cambio</option>'
    aceites_cambio.forEach(e => {
        htmac += '<option value="' + e.value + '">' + e.alternativa + '</option>'
    });
    htmac += '</select>';

    htmai = '<select class="ui dropdown fluid aceite-instruccion"><option value="">Seleccione el cambio</option>'
    aceites_instruccion.forEach(e => {
        htmai += '<option value="' + e.value + '">' + e.alternativa + '</option>'
    });
    htmai += '</select>';

    $(".ui.dropdown").dropdown();
    t1.row.add([
        htmac,
        htmai,
        '<div class="ui checkbox aceite-cambio-chk"><input type="checkbox" /><label></label></div>',
        '<div class="ui checkbox aceite-limpieza-chk"><input type="checkbox" /><label></label></div>',
        '<textarea class="form-control aceite-comentario"></textarea>',
        '<button class="circular ui icon button btn-remove-aceite" ><i class="icon red close"></i></button>'
    ]).draw(false);

    counter++;
    $('.ui.dropdown').dropdown();
});

$('#table-aceites tbody').on('click', '.btn-remove-aceite', function() {
    t1
        .row($(this).parents('tr'))
        .remove()
        .draw();
});

$("#btn-save").click(function() {
    console.log("click");
    var cambioFiltros = [],
        limpiezaFiltros = [],
        comentarioFiltros = [],
        cambioAceites = [],
        limpiezaAceites = [],
        comentarioAceites = [],
        ordenFiltro = [],
        ordenAceite = [];
    $(".filtro-comentario").each(function() {
        comentarioFiltros.push($(this).val());
    });
    $(".aceite-comentario").each(function() {
        comentarioAceites.push($(this).val());
    });
    var data = {
        id_ejecutor: id_ejecutor,
        id_jefe_taller: id_jefe_taller,
        id_equipo: id_equipo,
        tipo: $("#tipo-mantenimiento").val(),
        intervalo: posicion_intervalo,
        intervalo_nom: posicion_intervalo_nom,
        id_ubicacion: id_ubicacion,
        horo_pro_a: $("#horo_pro_a").val(),
        horo_pro_b: $("#horo_pro_b").val(),
        horo_pro_c: $("#horo_pro_c").val(),
        horo_rea_a: $("#horo_rea_a").val(),
        horo_rea_b: $("#horo_rea_b").val(),
        horo_rea_c: $("#horo_rea_c").val(),
        varios: $("#varios").val(),
        observaciones: $("#observacion").val(),
        fecha_ejecucion: $("#fecha_ejecucion").val(),
        hora_inicio: $("#hora_inicio").val(),
        hora_fin: $("#hora_fin").val(),
        // filtros: $(".filtro-cambio").dropdown('get text'),
        // filtros_instruccion: $(".filtro-instruccion").dropdown('get text'),
        // filtros_referencia: $(".filtro-referencia").dropdown('get text'),
        // cambio_filtros: $(".filtro-cambio-chk").checkbox('is checked'),
        // limpieza_filtros: $(".filtro-limpieza-chk").checkbox('is checked'),
        // comentario_filtros: comentarioFiltros,
        // aceites: $(".aceite-cambio").dropdown('get text'),
        // aceites_instruccion: $(".aceite-instruccion").dropdown('get text'),
        // cambio_aceites: $(".aceite-cambio-chk").checkbox('is checked'),
        // limpieza_aceites: $(".aceite-limpieza-chk").checkbox('is checked'),
        // comentario_aceites: comentarioAceites

        filtros: [],
        filtros_instruccion: [],
        filtros_referencia: [],
        cambio_filtros: [],
        limpieza_filtros: [],
        comentario_filtros: comentarioFiltros,
        aceites: [],
        aceites_instruccion: [],
        cambio_aceites: [],
        limpieza_aceites: [],
        comentario_aceites: comentarioAceites
    };
    ajax_all(
        "/maquinarias/regMantenimiento",
        data,
        "",
        verificarRegistroMantenimiento,
        "",
        ""
    );
    // if (id_ejecutor != 0) {
    //     if (id_jefe_taller != 0) {
    //         if (id_equipo != 0) {
    //             if ($("#tipo-mantenimiento").val() != "") {
    //                 if (id_ubicacion != 0) {
    //                     if ($(".filtro-cambio").dropdown('get text').length > 0) {
    //                         if ($(".aceite-cambio").dropdown('get text').length > 0) {
    //                             ajax_all(
    //                                 "/maquinarias/regMantenimiento",
    //                                 data,
    //                                 "",
    //                                 verificarRegistroMantenimiento,
    //                                 "",
    //                                 ""
    //                             );
    //                         } else {
    //                             Swal.fire('Alerta!', 'Debe escoger al menos un ítem de la sección aceites para el mantenimiento', 'warning');
    //                         }
    //                     } else {
    //                         Swal.fire('Alerta!', 'Debe escoger al menos un ítem de la sección filtros para el mantenimiento', 'warning');
    //                     }
    //                 } else {
    //                     Swal.fire('Alerta!', 'Debe escoger la ubicación del mantenimiento', 'warning');
    //                     $("#ubicacion-search").children("input").focus();
    //                 }
    //             } else {
    //                 Swal.fire('Alerta!', 'Debe escoger el tipo de mantenimiento', 'warning');
    //                 $("#equipo-search").children("input").focus();
    //             }
    //         } else {
    //             Swal.fire('Alerta!', 'Debe escoger el equipo para  el mantenimiento', 'warning');
    //             $("#equipo-search").children("input").focus();
    //         }
    //     } else {
    //         Swal.fire('Alerta!', 'Debe escoger al jefe de taller', 'warning');
    //         $("#jefe_taller-search").children("input").focus();
    //     }
    // } else {
    //     Swal.fire('Alerta!', 'Debe escoger la persona que ejecutó el mantenimiento', 'warning');
    //     $("#ejecutado-search").children("input").focus();
    // }

    console.log(data);
});

function verificarRegistroMantenimiento(data) {
    console.log(data);
    var d = data["RES"][0]["proc_reg_mantenimiento2"];
    var da = d.split("****");
    if (da[0] == da[1]) {
        Swal.fire("Exito", "Mantenimiento registrado correctamente", "success");
        initDataTable();
        $(".ui.modal").modal("hide");
        limpiar();
    } else {}
}

function limpiar() {
    id_ejecutor = 0;
    id_jefe_taller = 0;
    id_equipo = 0;
    $("#tipo-mantenimiento").val("");
    $("#intervalo").val("");
    id_ubicacion = 0;
    $("#horo_pro_a").val("");
    $("#horo_pro_b").val("");
    $("#horo_pro_c").val("");
    $("#horo_rea_a").val("");
    $("#horo_rea_b").val("");
    $("#horo_rea_c").val("");
    $("#varios").val("");
    $("#observacion").val("");
    $("#fecha_ejecucion").val("");
    $("#hora_inicio").val("");
    $("#hora_fin").val("");
    cambioAceites = [];
    limpiezaAceites = [];
    comentarioAceites = [];
    cambioFiltros = [];
    limpiezaFiltros = [];
    comentarioFiltros = [];
}

function viewMantenimiento(id) {
    console.log(id);
    $("#download_pdf_mantenimiento").attr(
        "href",
        "/pdf/download/mantenimiento/" + id
    );
    ajax_all(
        "/maquinarias/getMantenimientoId", { id: id },
        "",
        parsearMantenimientoDetalle,
        "",
        ""
    );

    $("#viewMantenimiento").modal("show");
}

function parsearMantenimientoDetalle(data) {
    console.log(data);
    var dM1 = data["RES1"];
    var dM2 = data["RES2"];
    console.log(dM1[0]["intervalo"]);
    $("#codigo_equipo_view").html(dM1[0]["codigo_equipo"]);
    $("#descripcion_view").html(dM1[0]["descripcion_equipo"]);
    $("#intervalo_view").html(dM1[0]["intervalo"]);
    $("#marca_view").html(dM1[0]["marca"]);
    $("#modelo_view").html(dM1[0]["modelo"]);
    $("#ubicacion_view").html(dM1[0]["ubicacion"]);
    console.log(dM1[0]["horometro_pro_ini"]);
    console.log(dM1[0]["horometro_pro_med"]);
    console.log(dM1[0]["horometro_pro_fin"]);
    console.log($("#horo_pro_a"));
    console.log($("#horo_pro_b"));
    console.log($("#horo_pro_c"));
    $("#horometro_pro_ini").html(dM1[0]["horometro_pro_ini"]);
    $("#horometro_pro_med").html(dM1[0]["horometro_pro_med"]);
    $("#horometro_pro_fin").html(dM1[0]["horometro_pro_fin"]);

    $("#horo_pro_a").val(dM1[0]["horometro_pro_ini"]);
    $("#horo_pro_b").val(dM1[0]["horometro_pro_med"]);
    $("#horo_pro_c").val(dM1[0]["horometro_pro_fin"]);

    $("#horometro_rea_ini").html(dM1[0]["horometro_rea_ini"]);
    $("#horometro_rea_med").html(dM1[0]["horometro_rea_med"]);
    $("#horometro_rea_fin").html(dM1[0]["horometro_rea_fin"]);
    var htF = "",
        htA = "";
    var instruccion = "",
        referencia = "",
        comentarios = "";
    console.log('dM2:', dM2);
    for (let i = 0; i < dM2.length; i++) {
        console.log('dM2:', dM2);
        if (dM2[i]["tipo"] == 'FIL') {
            htF += '<tr>' +
                '<td>' + dM2[i]["filtro_aceites"] + '</td>' +
                '<td>' + dM2[i]["filtros_instruccion"] + '</td>' +
                '<td>' + dM2[i]["filtros_referencia"] + '</td>'
            if (dM2[i]["cambio"]) {
                htF +=
                    '<td class="center aligned">' +
                    '<i class="large green checkmark icon"></i>' +
                    "</td>";
            } else {
                htF += "<td></td>";
            }
            if (dM2[i]["limpieza_muestra"]) {
                htF +=
                    '<td class="center aligned">' +
                    '<i class="large green checkmark icon"></i>' +
                    "</td>";
            } else {
                htF += "<td></td>";
            }
            htF += '<td>' + dM2[i]["comentarios"] + '</td>' +
                '</tr>'
        }
        if (dM2[i]["tipo"] == 'ACE') {
            htA += '<tr>' +
                '<td>' + dM2[i]["filtro_aceites"] + '</td>' +
                '<td>' + dM2[i]["filtros_instruccion"] + '</td>'
            if (dM2[i]["cambio"]) {
                htA +=
                    '<td class="center aligned">' +
                    '<i class="large green checkmark icon"></i>' +
                    "</td>";
            } else {
                htA += "<td></td>";
            }
            if (dM2[i]["limpieza_muestra"]) {
                htA +=
                    '<td class="center aligned">' +
                    '<i class="large green checkmark icon"></i>' +
                    "</td>";
            } else {
                htA += "<td></td>";
            }
            htA += '<td>' + dM2[i]["comentarios"] + '</td>' +
                '</tr>'
        }
    }
    $("#filtros").html(htF);
    $("#aceites").html(htA);
    $("#varios_view").html(dM1[0]["varios"]);
    $("#observaciones_view").html(dM1[0]["observaciones"]);
    $("#fecha_ejecucion_view").html(dM1[0]["fecha"]);
    $("#ejecutor_view").html(dM1[0]["ejecutor"]);
    $("#jefe_taller_view").html(dM1[0]["jefe_taller"]);
    $("#hora_ini_view").html(dM1[0]["hora_ini"]);
    $("#hora_fin_view").html(dM1[0]["hora_fin"]);
    $(".print-mant").attr('id', dM1[0]["id"]);
    $(".print-mant").attr('href', '/maquinarias/imprimirMantenimiento/' + dM1[0]["id"]);
}

$("#download_pdf_mantenimiento").click(function() {
    // ajax_all("/maquinarias/getMantenimientoId", { id: id }, "", parsearMantenimientoDetalle, "", "");
    ajax_all("/pdf/download/mantenimiento", null, "", prueba, "", "");
});

function prueba(data) {
    console.log(data);
}

$(".print-mant").click(function() {

    // html2canvas(document.getElementById("mydiv_screenshot")).then(function(canvas) {
    //     var ajax = new XMLHttpRequest();
    //     var image_data = canvas.toDataURL("image/jpeg", 0.9);
    //     $.ajax({
    //         url: '/maquinarias/imprimirMantenimiento',
    //         type: 'GET',
    //         data: { "image_for_save": image_data },
    //         success: function(response) {
    //             if (response != 0) {
    //                 //console.log(response);
    //             } else {
    //                 //console.log(response);
    //             }
    //         },
    //         async: true
    //     });
    // });
});
