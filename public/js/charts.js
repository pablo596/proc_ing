var barChart = document.getElementById('barChart').getContext('2d');
var myBarChart;
$("#sele-indice-mes").datepicker({
    format: "mm-yyyy",
    startView: "months",
    minViewMode: "months",
    changeMonth: true,
    autoclose: true
}).change(function(e) {
    console.log('a');
    console.log(this.value);
    var fecha = this.value,
        f = fecha.split("-");

    var data = {
        mes: f[0],
        anio: f[1]
    }
    ajax_all("/graficos/indicecombustiblemes", data, "", barChartMes, "", "");
    $(this).datepicker('hide');
});
ajax_all("/graficos/indicecombustiblemes", { mes: 0, anio: 0 }, "", barChartMes, "", "");

function barChartMes(data) {
    var d = data["indiceMes"],
        datos = [],
        datos_label = [],
        galones = 0,
        colors = [];
    console.log(d.label);
    for (let i = 0; i < d.length; i++) {
        galones = galones + parseFloat(d[i]["galones"]);
        datos.push(d[i]["galones"]);
        datos_label.push(d[i]["fecha_abastecimiento"]);
        colors.push('rgb(23, 125, 255)');
    }
    colors.push('rgb(255, 158, 39)');
    datos.push(galones);
    datos_label.push("Total General");
    console.log(datos);
    myBarChart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: datos_label,
            datasets: [{
                label: "Consumo diario de diesel(glns)",
                backgroundColor: colors,
                borderColor: 'rgb(23, 125, 255)',
                data: datos,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    });
}