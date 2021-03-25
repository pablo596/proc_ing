var data = {
    codigo: "",
    descripcion: "",
    stock: "",
    costo: "",
    precio: "",
};
var id_producto = 0;
var dT;
initDataTable();

function initDataTable() {
    if (dT) {
        dT.destroy();
    }
    dT = $("#basic-datatables").DataTable({
        ajax: {
            url: "/productos/getproductos",
            dataSrc: "",
            headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
        },
        responsive: true,
        columns: [
            {
                data: "codigo",
            },
            {
                data: "descripcion",
            },
            {
                data: "stock",
            },
            {
                data: "costo",
            },
            {
                data: "precio",
            },
            {
                render: function (data, type, row, meta) {
                    var html = "";
                    html +=
                        '<div class="form-button-action ui buttons">' +
                        '<button type="button" class="ui button blue" onClick="editProducto(' +
                        row["id"] +
                        ')">Editar' +
                        // '<i class="icon edit"></i>' +

                        "</button>" +
                        '<button type="button" class="ui button red" onClick="removeProducto(' +
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
            zeroRecords: "Lo sentimos, el producto que busca no se encuentra",
            info: "Página _PAGE_ de _PAGES_",
            infoEmpty: "No se han generado registros de productos",
            infoFiltered: "(filtered from _MAX_ total records)",
            search: "Buscar:",
            loadingRecords: "Cargando registros de productos",
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
                filename: "Reporte de productos " + today,
                exportOptions: {
                    columns: [0, 1, 2, 3, 4],
                },
            },
            {
                extend: "pdfHtml5",
                filename: "Reporte de productos " + today,
                exportOptions: {
                    columns: [0, 1, 2, 3, 4],
                },
            },
        ],

        dom: "Bfrtip",
        // buttons: [
        //     'copy', 'excel', 'pdf'
        // ]
    });
}
$("#add-producto-btn").click(function () {
    $("#add-producto").modal("show");
    $(".btn-save").attr("id", "");
    $("#add-producto .header").html("Añadir Producto");
});

$(".btn-save").click(function () {
    var data = {};
    // console.log(.val());
    // console.log();
    if (this.id == "") {
        data = {
            codigo: $("#mod-codigo").val(),
            descripcion: $("#mod-descripcion").val(),
            stock: $("#mod-stock").val(),
            costo: $("#mod-costo").val(),
            precio: $("#mod-precio").val(),
        };
    } else {
        data = {
            codigo: $("#mod-codigo").val(),
            descripcion: $("#mod-descripcion").val(),
            stock: $("#mod-stock").val(),
            costo: $("#mod-costo").val(),
            precio: $("#mod-precio").val(),
            id: this.id,
        };
    }

    console.log(data);
    ajax_all("/productos/regProducto", data, "", verificarRegistro, "", "");
});

function verificarRegistro(data) {
    console.log(data);
    if (data["RES"] != false) {
        swal.fire("Producto guardado exitosamente", "", "success");
        id_producto = 0;
        $("#add-producto").modal("hide");
        $("#mod-codigo").val("");
        $("#mod-descripcion").val("");
        $("#mod-stock").val("");
        $("#mod-costo").val("");
        $("#mod-precio").val("");
        initDataTable();
    } else {
        swal.fire("Ocurrió un error al guardar al producto", "", "warning");
    }
}

function removeProducto(id) {
    Swal.fire({
        title: "¿Quiere elminiar el producto?",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Si`,
        // denyButtonText: `No`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            ajax_all(
                "/productos/removeProducto",
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
        Swal.fire("Éxito!", "Producto eliminado correctamente", "success");
        initDataTable();
    }
}

function editProducto(id) {
    ajax_all(
        "/productos/getproductoId",
        { id: id },
        "",
        parsearProducto,
        "",
        ""
    );
}

function parsearProducto(data) {
    $(".btn-save").attr("id", data[0]["id"]);
    $("#add-producto .header").html("Editar Producto");

    $("#mod-codigo").val(data[0]["codigo"]);
    $("#mod-descripcion").val(data[0]["descripcion"]);
    $("#mod-stock").val(data[0]["stock"]);
    $("#mod-costo").val(data[0]["costo"]);
    $("#mod-precio").val(data[0]["precio"]);

    $("#add-producto").modal("show");
}
