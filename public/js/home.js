// ajax_all("/personal/regTrabajador", data, "", verificarRegistro, "", "");
ajax_all("/datosEstadistica", "", "", datosEstadistica, "", "");

function datosEstadistica(data) {

    var datos = data;
    var accAnio = 0,
        sinAcc = 0;
    if (datos["num_accidentes_anio"][0]["numero_accidentes"] != "null" && datos["num_accidentes_anio"][0]["numero_accidentes"] != null) {
        accAnio = datos["num_accidentes_anio"][0]["numero_accidentes"]
    } else {
        accAnio = 0;
    }
    console.log(datos["num_dias_sin_accidentes"]);
    if (datos["num_dias_sin_accidentes"] != [] && datos["num_dias_sin_accidentes"].length > 0) {
        if (datos["num_dias_sin_accidentes"][0]["numero_dias_sin_accidente"] != "null" && datos["num_dias_sin_accidentes"][0]["numero_dias_sin_accidente"] != null) {
            sinAcc = datos["num_dias_sin_accidentes"][0]["numero_dias_sin_accidente"]
        } else {
            sinAcc = 0;
        }
    } else {
        sinAcc = 0;
    }

    Circles.create({
        id: "circles-1",
        radius: 45,
        value: accAnio * 100 / 365,
        maxValue: 365,
        width: 7,
        text: accAnio,
        colors: ["#f1f1f1", "#1269db"],
        duration: 400,
        wrpClass: "circles-wrp",
        textClass: "circles-text",
        styleWrapper: true,
        styleText: true,
    });

    Circles.create({
        id: "circles-2",
        radius: 45,
        value: sinAcc * 100 / 365,
        maxValue: 365,
        width: 7,
        text: sinAcc,
        colors: ["#f1f1f1", "#2BB930"],
        duration: 400,
        wrpClass: "circles-wrp",
        textClass: "circles-text",
        styleWrapper: true,
        styleText: true,
    });
    var galones_mes = 0,
        galones_dia = 0;
    if (datos["galones_mes"][0]["galones"]) {
        galones_mes = datos["galones_mes"][0]["galones"];
    } else {
        galones_mes = 0;
    }
    if (datos["galones_dia"][0]["galones"]) {
        galones_dia = datos["galones_dia"][0]["galones"];
    } else {
        galones_dia = 0;
    }
    $("#total-abast-mes").html(galones_mes + " Gl");
    $("#total-abast-dia").html(galones_dia + " Gl");

    var totalIncomeChart = document
        .getElementById("totalIncomeChart")
        .getContext("2d");
    var data = [],
        data_label = [],
        galones_semana = datos["galones_semana"];
    for (let i = 0; i < galones_semana.length; i++) {
        data_label.push(galones_semana[i]["dia"]);
        data.push(galones_semana[i]["galones"]);
    }
    var mytotalIncomeChart = new Chart(totalIncomeChart, {
        type: "bar",
        data: {
            labels: data_label,
            datasets: [{
                label: "Combustible abastecido",
                backgroundColor: "#ff9e27",
                borderColor: "rgb(23, 125, 255)",
                data: data,
            }, ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        display: false, //this will remove only the label
                    },
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                }, ],
                xAxes: [{
                    gridLines: {
                        drawBorder: false,
                        display: false,
                    },
                }, ],
            },
        },
    });
}