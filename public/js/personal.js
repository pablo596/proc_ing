var content = [];
var id_empresa = 0,
    id_trabajador = 0,
    id_cargo = 0;
var dT;
$(".ui.search").search({
    source: content
});
iniDataTable();

$('#addTrabajador').modal('attach events', '#addTrabajadorBtn', 'show');

function iniDataTable() {
    console.log(dT);
    if (dT) {
        dT.destroy();
        // dT = null;
    } else {}
    dT = $("#personal-datatables").DataTable({
        ajax: {
            url: "/personal/getTrabajador",
            dataSrc: "",
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() }
        },
        responsive: true,
        columns: [{
                render: function(data, type, row, meta) {
                    console.log();
                    var html = "";
                    html +=
                        '<div class="logo">' +
                        '<img src="https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=' +
                        row["foto"] +
                        '&w=50&h=50">' +
                        "</div>";
                    return html;
                }
            },
            {
                data: "full_name"
            },
            {
                data: "cargo"
            },
            {
                data: "empresa"
            },
            {
                render: function(data, type, row, meta) {
                    var html = "";
                    html +=
                        '<div class="form-button-action ui buttons">' +
                        '<button type="button" class="ui button blue" onClick="editPersonal(' +
                        row["id"] +
                        ')">Editar' +
                        // '<i class="icon edit"></i>' +

                        "</button>" +
                        '<button type="button" class="ui button red" onClick="removePersonal(' +
                        row["id"] +
                        ')">Eliminar' +
                        // '<i class="icon trash"></i>' +
                        "</button>" +
                        "</div>";

                    return html;
                    // var html = "";
                    // html +=
                    //     '<div class="form-button-action">' +
                    //     '<button type="button" data-toggle="tooltip" title="" class="ui button circular icon" onClick="removePersonal(' +
                    //     row["id"] +
                    //     ')" >' +
                    //     '<i class="icon remove red"></i>' +
                    //     "</button>" +
                    //     "</div>";
                    // return html;
                }
            }
        ],
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Lo sentimos, el personal que busca no se encuentra",
            info: "Página _PAGE_ de _PAGES_",
            infoEmpty: "No se han generado registros de personal",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar:",
            loadingRecords: "Cargando registros de personal",
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
                filename: "Personal_" + today,
                exportOptions: {
                    columns: [1, 2, 3]
                }
            },
            {
                extend: "pdfHtml5",
                filename: "Personal_" + today,
                exportOptions: {
                    columns: [1, 2, 3]
                }
            }
        ],

        dom: "Bfrtip"
    });
}

$(".empresa-search")
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
        console.log(content);

        $(".empresa-search").search({
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

    console.log(content);
}

$(".cargo-search")
    .children("input")
    .keyup(function() {
        if (this.value.length > 1) {
            var data = {
                query: this.value
            };
            ajax_all(
                "/parametros/buscarCargo",
                data,
                "",
                buscarCargo,
                "",
                ""
            );
        }
    });

function buscarCargo(data) {
    var json = data["RES"];
    var n = json.length;
    if (n > 0) {
        content = [];
        if (json != false) {
            $(json).each(function(i, v) {
                content.push({
                    title: v.cargo,
                    id: v.id
                });
            });
        }
        console.log(content);

        $(".cargo-search").search({
            minCharacters: 3,
            searchFields: ["title"],
            error: {
                noResults: "No se encontraron resultados."
            },
            source: content,
            onSelect: function(result, response) {
                $("#div-search").hide();
                var id = result.id;
                id_cargo = id;
                databus = {
                    bus: id
                };
            }
        });
    }

    console.log(content);
}



$(".btn-save").click(function() {
    var data = {};
    if (this.id == "") {
        data = {
            nombre: $("#mod-nombre").val(),
            apellido: $("#mod-apellido").val(),
            id_empresa: id_empresa,
            id_cargo: id_cargo
        };
    } else {
        data = {
            nombre: $("#mod-edit-nombre").val(),
            apellido: $("#mod-edit-apellido").val(),
            id_empresa: id_empresa,
            id_cargo: id_cargo,
            id: this.id
        };
    }

    ajax_all("/personal/regTrabajador", data, "", verificarRegistro, "", "");
    console.log(data);
});

function verificarRegistro(data) {
    // console.log(data);
    // var d = data["RES"][0]["proc_reg_trabajadores"];
    // var da = d.split("****");
    // if (da[0] == da[1]) {
    //     id_trabajador = da[0];
    //     $("#file-personal").fileinput("upload");
    //     Swal.fire("Exito", "Personal registrado correctamente", "success");
    //     iniDataTable();
    //     $("#addTrabajador").modal("hide");
    //     carImgs = 0;
    //     $("#mod-nombre").val("");
    //     $("#mod-apellido").val("");
    //     $("#mod-cedula").val("");
    //     $("#mod-fecha-nac").val("");
    //     id_empresa = 0;
    // } else {}

    var d1, d2, da, db;
    if (data["RES"][0]["proc_reg_trabajadores"]) {
        var d1 = data["RES"][0]["proc_reg_trabajadores"];
        var da = d1.split("****");
    } else if (data["RES"][0]["proc_update_trabajadores"]) {
        var d2 = data["RES"][0]["proc_update_trabajadores"];
        var db = d2.split("****");
    }


    console.log(db);
    if (da) {
        if (da[0] == da[1]) {
            id_trabajador = da[0];
            $("#file-es").fileinput("upload");
            Swal.fire("Exito", "Trabajador registrado correctamente", "success");
            iniDataTable();
            $("#addTrabajador").modal("hide");
            carImgs = 0;
            $("#mod-nombre").val("");
            $("#mod-apellido").val("");
            $(".empresa-search").children('input').val('');
            id_empresa = 0;
            $(".cargo-search").children('input').val('');
            id_cargo = 0;
        }
    }
    if (db) {
        if (db[0] == db[1]) {
            id_empresa = db[0];
            $("#file-es").fileinput("upload");
            Swal.fire("Exito", "Trabajador modificado correctamente", "success");
            iniDataTable();
            $("#editatTrabajador").modal("hide");
            carImgs = 0;
            $("#mod-edit-nombre").val("");
            $("#mod-edit-apellido").val("");
            $(".empresa-search").children('input').val('');
            id_empresa = 0;
            $(".cargo-search").children('input').val('');
            id_cargo = 0;
            $(".btn-save").attr('id', "");
            id_empresa = 0;
        }
    }
}
var carImgs = 0;
$("#file-personal").fileinput({
    theme: "fa",
    uploadUrl: "/personal/imagenPersonal",
    uploadExtraData: function() {
        return {
            _token: $("#csrf-token").val(),
            _id: id_trabajador
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

$("#file-personal").on("fileloaded", function(event, file, previewId, index, reader) {
    carImgs = 1;
});
$("#file-personal").on("filecleared", function(event) {
    carImgs = 0;
});

$("#file-personal").on("fileunlock", function(event, filestack, extraData) {
    //forminscripcion()

    $("#codigoPre").val("");
    carImgs = 0;
    // setTimeout(window.location.reload(),1000);
});

function editPersonal(id) {
    ajax_all("/personal/getTrabajadorId", { id: id }, "", parsearDataTrabajador, "", "");
}

function parsearDataTrabajador(data) {
    $("#mod-edit-nombre").val(data[0]["nombre"]);
    $("#mod-edit-apellido").val(data[0]["apellido"]);
    id_empresa = data[0]["id_empresa"];
    console.log($("#empresa-edit-search").children('input'));
    console.log(data[0]["empresa"]);
    console.log($("#empresa-edit-search").children('input').val());
    $("#empresa-edit-search").children('input').val(data[0]["empresa"]);
    id_cargo = data[0]["id_cargo"];
    $("#cargo-edit-search").children('input').val(data[0]["cargo"]);
    $(".btn-save").attr('id', data[0]["id"]);
    var url = '../buscarImg?file3=' + data[0]["foto"];
    var html = "";
    html = '<input id="file-es" type="file" name="file" multiple class="file" data-overwrite-initial="true"data-min-file-count="1" accept=".jpg,.png,.jpeg">';
    $("#logo-empresa").html(html);
    console.log(data);
    if (data[0]["foto"]) {
        $("#file-es").fileinput({
            enableResumableUpload: true,
            initialPreviewAsData: true,
            initialPreview: [
                // TEXT DATA
                '../buscarImg?file3=' + data[0]["foto"]
            ],
            initialPreviewAsData: true, // defaults markup
            initialPreviewConfig: [
                { caption: data[0]["full_name"] + ".png", filename: data[0]["full_name"] + ".png", downloadUrl: url, size: 930321, width: "120px", key: 1 }
            ],
            // preferIconicPreview: true,
            showUpload: false,
            theme: 'fas',
            fileActionSettings: {
                showZoom: false,
                showRemove: false,
                showDownload: false,
                showPreview: false
            },
            uploadUrl: "/personal/imagenPersonal",
            uploadExtraData: function() {
                return {
                    _token: $("#csrf-token").val(),
                    _id: $(".btn-save").attr("id")
                };
            },
            browseLabel: "Buscar",
            msgPlaceholder: "Seleccionar la foto del trabajador",
            removeLabel: "Quitar imagen"
        });
    } else {
        $("#file-es").fileinput({
            enableResumableUpload: true,
            initialPreviewAsData: true,
            // initialPreview: [
            //     // TEXT DATA
            //     'https://uruzcaapp.paedpaal.com/buscarImg?file3=' + data[0]["foto"]
            // ],
            initialPreviewAsData: true,
            uploadUrl: "/personal/imagenPersonal",
            uploadExtraData: function() {
                return {
                    _token: $("#csrf-token").val(),
                    _id: $(".btn-save").attr("id")
                };
            },
            showUpload: false,
            theme: 'fas',
            fileActionSettings: {
                showZoom: false,
                showRemove: false,
                showDownload: false,
                showPreview: false
            },
            browseLabel: "Buscar",
            msgPlaceholder: "Seleccionar la foto del trabajador",
            removeLabel: "Quitar imagen"
        });
    }
    $("#editatTrabajador").modal("show");

}

function removePersonal(id) {
    $.ajax({
        method: "post",
        url: '/personal/eliminarTrabajador',
        data: { id: id },
        headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
        success: function(res) {
            if (res["RES"] == 1) {
                Swal.fire('Éxito', 'Personal eliminado correctamente', 'success');
                iniDataTable();
            }
        }
    })
}
