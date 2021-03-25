var data = {
    tipo: "",
    razon_socila: "",
    ruc: "",
    direccion: ""
};
var id_empresa = 0;
var dT;
initDataTable();

function initDataTable() {
    if (dT) {
        dT.destroy();
    }
    dT = $("#basic-datatables").DataTable({
        ajax: {
            url: "/empresas/getempresas",
            dataSrc: "",
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() }
        },
        responsive: true,
        columns: [{
                render: function(data, type, row, meta) {
                    var html = "";
                    html +=
                        '<div class="logo">' +
                        '<img src="https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=' +
                        row["avatar"] +
                        '&w=50&h=50">' +
                        "</div>";
                    return html;
                }
            },
            {
                data: "razon_social"
            },
            {
                data: "ruc"
            },
            {
                data: "tipo_nom"
            },
            {
                data: "direccion"
            },
            {
                render: function(data, type, row, meta) {
                    var html = "";
                    html +=
                        '<div class="form-button-action ui buttons">' +
                        '<button type="button" class="ui button blue" onClick="editEmpresa(' +
                        row["id"] +
                        ')">Editar' +
                        // '<i class="icon edit"></i>' +

                        "</button>" +
                        '<button type="button" class="ui button red" onClick="removeEmpresa(' +
                        row["id"] +
                        ')">Eliminar' +
                        // '<i class="icon trash"></i>' +
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
            infoEmpty: "No se han generado registros de empresas",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar:",
            loadingRecords: "Cargando registros de empresas",
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
                filename: "Empresas_" + today,
                exportOptions: {
                    columns: [1, 2, 3, 4]
                }
            },
            {
                extend: "pdfHtml5",
                filename: "Empresas_" + today,
                exportOptions: {
                    columns: [1, 2, 3, 4]
                }
            }
        ],

        dom: "Bfrtip"
            // buttons: [
            //     'copy', 'excel', 'pdf'
            // ]
    });
}

var carImgs = 0;

$(".btn-save").click(function() {
    var data = {};
    var tipos = $(".selectgroup").children('.selectgroup-item').children('input');
    var tipo = 0;
    for (let i = 0; i < tipos.length; i++) {
        if (tipos[i].hasAttribute('checked')) {
            console.log(tipos[i].value);
            tipo = tipos[i].value;
            console.log('este es');
        } else {
            console.log(tipos[i].value);
            console.log('este no es');
        }
    }
    // console.log(.val());
    // console.log();
    if (this.id == "") {
        data = {
            razon_social: $("#mod-razon-social").val(),
            ruc: $("#mod-ruc").val(),
            tipo: $("#mod-sele-tipo").val(),
            direccion: $("#mod-direccion").val()
        };
    } else {
        data = {
            razon_social: $("#razon_social").val(),
            ruc: $("#ruc").val(),
            tipo: tipo,
            direccion: $("#direccion").val(),
            id: this.id
        };
    }

    console.log(data);
    ajax_all("/empresas/regEmpresa", data, "", verificarRegistro, "", "");
});

function verificarRegistro(data) {
    var d1, d2, da, db;
    if (data["RES"][0]["proc_reg_empresa"]) {
        var d1 = data["RES"][0]["proc_reg_empresa"];
        var da = d1.split("****");
    } else if (data["RES"][0]["proc_update_empresa"]) {
        var d2 = data["RES"][0]["proc_update_empresa"];
        var db = d2.split("****");
    }


    console.log(db);
    if (da) {
        if (da[0] == da[1]) {
            id_empresa = da[0];
            $("#file-es").fileinput("upload");
            Swal.fire("Exito", "Empresa registrada correctamente", "success");
            initDataTable();
            $("#add-empresa").modal("hide");
            carImgs = 0;
            $("#mod-razon-social").val("");
            $("#mod-ruc").val("");
            $("#mod-direccion").val("");
            $("#mod-sele-tipo").val("");
            id_empresa = 0;
        }
    }
    if (db) {
        if (db[0] == db[1]) {
            id_empresa = db[0];
            $("#file-es").fileinput("upload");
            Swal.fire("Exito", "Empresa modificada correctamente", "success");
            initDataTable();
            $("#editar-empresa").modal("hide");
            carImgs = 0;
            $("#razon_social").val("");
            $("#ruc").val("");
            $(".selectgroup").children('.selectgroup-item').children('input').attr("checked", false);
            $(".selectgroup").children('.selectgroup-item').children('input').removeClass("checked");
            $("#direccion").val("");
            $(".btn-save").attr('id', "");
            id_empresa = 0;
        }
    }

}

$("#file-es").fileinput({
    theme: "fa",
    uploadUrl: "https://api-mantenimiento.paedpaal.com/api/guardarImg",
    uploadExtraData: function() {
        return {
            _token: $("#csrf-token").val(),
            _id: id_empresa
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

function removeEmpresa(id) {
    Swal.fire({
        title: '¿Quiere elminiar la empresa?',
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Si`,
        // denyButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            ajax_all("/empresas/removeEmpresa", { id: id }, "", verificarRemove, "", "");
        }
    })

}

function verificarRemove(data) {
    if (data["RES"]) {
        Swal.fire('Éxito!', 'Empresa eliminada correctamente', 'success');
        initDataTable();
    }
}

function editEmpresa(id) {
    ajax_all("/empresas/getempresaId", { id: id }, "", parsearEmpresa, "", "");
}
$(".selectgroup").children('.selectgroup-item').children('input').attr("checked", false);
$(".selectgroup").children('.selectgroup-item').children('input').removeClass("checked");


function parsearEmpresa(data) {
    $(".selectgroup").children('.selectgroup-item').children('input').attr("checked", false);
    $(".selectgroup").children('.selectgroup-item').children('input').removeClass("checked");
    $('#razon_social').val(data[0]["razon_social"]);
    $('#ruc').val(data[0]["ruc"]);
    $('#direccion').val(data[0]["direccion"]);
    $(".selectgroup").children('.selectgroup-item').children('input[value="' + data[0]["tipo"] + '"]').attr("checked", true).addClass("checked");
    $(".btn-save").attr('id', data[0]["id"]);
    var url = '../buscarImg?file3=' + data[0]["avatar"];
    // var url1 = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/631px-FullMoon2010.jpg',
    //     url2 = 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Earth_Eastern_Hemisphere.jpg/600px-Earth_Eastern_Hemisphere.jpg';
    var html = "";
    html = '<input id="file-es" type="file" name="file" multiple class="file" data-overwrite-initial="true"data-min-file-count="1" accept=".jpg,.png,.jpeg">';
    $("#logo-empresa").html(html);
    console.log(data);
    if (data[0]["avatar"]) {
        $("#file-es").fileinput({
            enableResumableUpload: true,
            initialPreviewAsData: true,
            initialPreview: [
                // TEXT DATA
                '../buscarImg?file3=' + data[0]["avatar"]
            ],
            initialPreviewAsData: true, // defaults markup
            initialPreviewConfig: [
                { caption: data[0]["razon_social"] + ".png", filename: data[0]["razon_social"] + ".png", downloadUrl: url, size: 930321, width: "120px", key: 1 }
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
            uploadUrl: "https://api-mantenimiento.paedpaal.com/api/guardarImg",
            uploadExtraData: function() {
                return {
                    _token: $("#csrf-token").val(),
                    _id: $(".btn-save").attr("id")
                };
            },
            browseLabel: "Buscar logo",
            msgPlaceholder: "Seleccionar el logotipo de la empresa",
            removeLabel: "Quitar imagen"
        });
    } else {
        $("#file-es").fileinput({
            enableResumableUpload: true,
            initialPreviewAsData: true,
            // initialPreview: [
            //     // TEXT DATA
            //     'https://uruzcaapp.paedpaal.com/buscarImg?file3=' + data[0]["avatar"]
            // ],
            initialPreviewAsData: true,
            uploadUrl: "https://api-mantenimiento.paedpaal.com/api/guardarImg",
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
            browseLabel: "Buscar logo",
            msgPlaceholder: "Seleccionar el logotipo de la empresa",
            removeLabel: "Quitar imagen"
        });
    }
    $("#editar-empresa").modal("show");
}

$(".btn-change-img").click(function() {
    console.log(this.id);
})

$("#add-empresa-btn").click(function() {
    $('#add-empresa').modal('show');
    $(".btn-save").attr('id', "");
});
// $('#add-empresa')
//     .modal('attach events', '#add-empresa-btn', 'show');
