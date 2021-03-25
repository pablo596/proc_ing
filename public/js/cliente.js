var data = {
    tipoDoc: "",
    doc: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    correo: "",
};
var id_cliente = 0;
var dT;
initDataTable();

function initDataTable() {
    if (dT) {
        dT.destroy();
    }
    dT = $("#basic-datatables").DataTable({
        ajax: {
            url: "/clientes/getclientes",
            dataSrc: "",
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
        },
        responsive: true,
        columns: [
            {
                data: "tipo_doc",
            },
            {
                data: "documento",
            },
            {
                data: "nombre",
            },
            {
                data: "apellido",
            },
            {
                data: "direccion",
            },
            {
                data: "telefono",
            },
            {
                data: "correo",
            },
            {
                render: function (data, type, row, meta) {
                    var html = "";
                    html +=
                        '<div class="form-button-action ui buttons">' +
                        '<button type="button" class="ui button blue" onClick="editCliente(' +
                        row["id"] +
                        ')">Editar' +
                        // '<i class="icon edit"></i>' +

                        "</button>" +
                        '<button type="button" class="ui button red" onClick="removeCliente(' +
                        row["id"] +
                        ')">Eliminar' +
                        // '<i class="icon trash"></i>' +
                        "</button>" +
                        "</div>";
                    return html;
                },
            },
        ],
        language: {
            lengthMenu: "Mostrar _MENU_ registros por página",
            zeroRecords: "Lo sentimos, el cliente que busca no se encuentra",
            info: "Página _PAGE_ de _PAGES_",
            infoEmpty: "No se han generado registros de clientes",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar:",
            loadingRecords: "Cargando registros de clientes",
            paginate: {
                first: "Primera",
                last: "Última",
                next: "Siguiente",
                previous: "Anterior",
            },
        },
        lengthChange: false,

        buttons: [
            {
                extend: "excelHtml5",
                filename: "Reporte de clientes_" + today,
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6],
                },
            },
            {
                extend: "pdfHtml5",
                filename: "Reporte de clientes_" + today,
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6],
                },
            },
        ],

        dom: "Bfrtip",
        // buttons: [
        //     'copy', 'excel', 'pdf'
        // ]
    });
}
$("#add-cliente-btn").click(function () {
    $("#add-cliente").modal("show");
    $(".btn-save").attr("id", "");
    $("#add-cliente .header").html("Añadir Cliente");
});

$(".btn-save").click(function () {
    var data = {};
    // console.log(.val());
    // console.log();
    if (this.id == "") {
        data = {
            tipoDoc: $("#mod-tipo-doc").val(),
            documento: $("#mod-documento").val(),
            nombre: $("#mod-nombre").val(),
            apellido: $("#mod-apellido").val(),
            telefono: $("#mod-telefono").val(),
            direccion: $("#mod-direccion").val(),
            correo: $("#mod-correo").val(),
        };
    } else {
        data = {
            tipoDoc: $("#mod-tipo-doc").val(),
            documento: $("#mod-documento").val(),
            nombre: $("#mod-nombre").val(),
            apellido: $("#mod-apellido").val(),
            telefono: $("#mod-telefono").val(),
            direccion: $("#mod-direccion").val(),
            correo: $("#mod-correo").val(),
            id: this.id,
        };
    }

    console.log(data);
    ajax_all("/clientes/regCliente", data, "", verificarRegistro, "", "");
});

function verificarRegistro(data) {
    console.log(data);
    if (data["RES"] != false) {
        swal.fire("Cliente guardado exitosamente", "", "success");
        id_cliente = 0;
        $("#add-cliente").modal("hide");
        $("#mod-tipo-doc").val("");
        $("#mod-documento").val("");
        $("#mod-nombre").val("");
        $("#mod-apellido").val("");
        $("#mod-telefono").val("");
        $("#mod-direccion").val("");
        $("#mod-correo").val("");
        initDataTable();
    } else {
        swal.fire("Ocurrió un error al guardar al cliente", "", "warning");
    }
}

function removeCliente(id) {
    Swal.fire({
        title: "¿Quiere elminiar al cliente?",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Si`,
        // denyButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            ajax_all(
                "/clientes/removeCliente",
                { id: id },
                "",
                verificarRemove,
                "",
                ""
            );
        }
    });
}

function verificarRemove(data) {
    if (data["RES"]) {
        Swal.fire("Éxito!", "Cliente eliminado correctamente", "success");
        initDataTable();
    }
}

function editCliente(id) {
    ajax_all("/clientes/getclienteId", { id: id }, "", parsearCliente, "", "");
}

function parsearCliente(data) {
    $(".btn-save").attr("id", data[0]["id"]);
    $("#add-cliente .header").html("Editar Cliente");
    $("#mod-tipo-doc").val(data[0]["tipo_doc"]);
    $("#mod-tipo-doc").dropdown("set value", data[0]["tipo_doc"]);
    $("#mod-documento").val(data[0]["documento"]);
    $("#mod-nombre").val(data[0]["nombre"]);
    $("#mod-apellido").val(data[0]["apellido"]);
    $("#mod-telefono").val(data[0]["telefono"]);
    $("#mod-direccion").val(data[0]["direccion"]);
    $("#mod-correo").val(data[0]["correo"]);
    $("#add-cliente").modal("show");
}
