var id_accidente = 0;
var imagenes = [];
$("#mod-sele-tipo").dropdown();
var dT;
initDataTable();

function initDataTable() {
  if (dT) {
    dT.destroy();
  }
  dT = $("#basic-datatables").DataTable({
    ajax: {
      url: "/maquinarias/getAccidentes",
      dataSrc: "",
      headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
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
        data: "descripcion_equipo",
      },
      {
        data: "codigo",
      },
      {
        data: "fecha_accidente",
      },
      {
        data: "descripcion",
      },
      {
        render: function (data, type, row, meta) {
          console.log(data);
          var html = "";
          html +=
            '<div class="form-button-action">' +
            '<button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" onClick="dataAccidente(' +
            row["id"] +
            ')" data-toggle="modal" data-target="#modal-empresa" data-original-title="Edit Task">' +
            '<i class="far fa-file-image"></i>' +
            "</button>" +
            "</div>";
          return html;
        },
      },
    ],
    language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "Lo sentimos, el accidente que busca no se encuentra",
      info: "Página _PAGE_ de _PAGES_",
      infoEmpty: "No se han generado registros de accidentes",
      infoFiltered: "(filtered from _MAX_ total records)",
      search: "Buscar:",
      loadingRecords: "Cargando datos de accidentes",
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
        filename: "Accidentes_" + today,
        exportOptions: {
          columns: [0, 1, 2, 3],
        },
      },
      {
        extend: "pdfHtml5",
        filename: "Accidentes_" + today,
        exportOptions: {
          columns: [0, 1, 2, 3],
        },
        orientation: "landscape",
      },
    ],

    dom: "Bfrtip",
  });
}

$("#equipo-search")
  .children("input")
  .keyup(function () {
    if (this.value.length > 1) {
      var data = {
        query: this.value,
      };
      ajax_all("/maquinarias/buscarMaquinaria", data, "", buscarEquipo, "", "");
    }
  });

function buscarEquipo(data) {
  var json = data["RES"];
  var n = json.length;
  if (n > 0) {
    content = [];
    if (json != false) {
      $(json).each(function (i, v) {
        content.push({
          title: v.descripcion,
          description: v.codigo,
          id: v.id,
          horometro: v.horometro,
          image:
            "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
            v.img +
            "&w=50&h=50",
        });
      });
    }
    console.log(content);
    $("#equipo-search").search({
      minCharacters: 3,
      searchFields: ["title", "description"],
      error: {
        noResults: "No se encontraron resultados.",
      },
      source: content,
      onSelect: function (result, response) {
        $("#div-search").hide();
        var id = result.id;
        id_equipo = id;
      },
    });
  }
}

function dataAccidente(id) {
  console.log(id);
  $.ajax({
    url: "/maquinarias/getAccidenteImage",
    headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
    type: "POST",
    dataType: "json",
    data: {
      id: id,
    },
    success: function (res) {
      console.log(res);
      if (res["RES"]) {
        var data = res["RES"];
        var html = "";
        $("#vista-imagen-principal").attr(
          "src",
          "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
            data[0]["imagen"] +
            "&w=100&h=100"
        );
        imagenes = [];
        for (let i = 0; i < data.length; i++) {
          imagenes.push(data[i]["imagen"]);
          html =
            html +
            '<img class="ver-imagen" id="' +
            data[i]["imagen"] +
            '" src="https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=' +
            data[i]["imagen"] +
            '&w=100&h=100" alt="" />';
        }
        $("#div-imagenes").html(html);
        $(".ver-imagen").click(function () {
          console.log(this);
          $(".vista-imagen-principal").attr(
            "src",
            "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" +
              this.id
          );

          $(".vista-imagen-principal").attr("width", "42.5%");
          $("#verImagen").modal("show");
        });
      }
    },
  });
  $("#modal-accidente").modal("show");
}

$("#addAccidente").modal("attach events", "#addAccidenteBtn", "show");

var carImgs = 0;
$("#file-es").fileinput({
  theme: "fa",
  uploadUrl: "https://api-mantenimiento.paedpaal.com/api/guardarImgAccidente",
  uploadExtraData: function () {
    return {
      _token: $("#csrf-token").val(),
      _id: id_accidente,
    };
  },
  allowedFileExtensions: ["jpg", "png", "gif", "jpeg"],
  overwriteInitial: false,
  maxFileSize: 2000,
  maxFilesNum: 4,
  slugCallback: function (filename) {
    return filename.replace("(", "_").replace("]", "_");
  },
});

$("#file-es").on("fileloaded", function (
  event,
  file,
  previewId,
  index,
  reader
) {
  carImgs = 1;
});
$("#file-es").on("filecleared", function (event) {
  carImgs = 0;
});

$("#file-es").on("fileunlock", function (event, filestack, extraData) {
  //forminscripcion()

  $("#codigoPre").val("");
  carImgs = 0;
  // setTimeout(window.location.reload(),1000);
});
$("#btn-save").click(function () {
  var data = {
    id_equipo: id_equipo,
    descripcion: $("#new-descripcion").val(),
  };
  ajax_all("/maquinarias/setAccidente", data, "", verificarRegistro, "", "");
});

function verificarRegistro(data) {
  console.log(data);
  var d = data["RES"][0]["proc_reg_accidente"];
  var da = d.split("****");
  if (da[0] == da[1]) {
    id_accidente = da[0];
    $("#file-es").fileinput("upload");
    Swal.fire("Exito", "Accidente registrado correctamente", "success");
    initDataTable();
    $("#addAccidente").modal("hide");
    limpiar;
  } else {
  }
}

function limpiar() {
  carImgs = 0;
  id_equipo = null;
  $("#new-descripcion").val("");
}
