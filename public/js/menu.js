// Menu Option Active
var ruta = window.location.pathname;
// console.log(ruta[1]);
// console.log($('a[href="' + ruta + '"]'));
$('a[href="' + ruta + '"]')
    .parent()
    .parent()
    .parent()
    .parent()
    .children("a")
    .removeClass("collapsed");
$('a[href="' + ruta + '"]')
    .parent()
    .parent()
    .parent()
    .parent()
    .children("a")
    .attr("aria-expanded", true);
$('a[href="' + ruta + '"]')
    .parent()
    .parent()
    .parent()
    .parent()
    .children("div")
    .addClass("show");
$('a[href="' + ruta + '"]').addClass("menu-opt-active");

var AJ_AX = "";

function ajax_all(url, data, btn, fun, div, btnhtml) {
    var aj = $.ajax({
        method: "post",

        url: url,
        data: data,
        headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        //   beforeSend: function (xhr) {

        //     $("#" + btn).html('<h5 class="text-center"><i class="fa fa-spinner fa-spin fa-fw"></i></h5>')
        //   }
    });
    aj.done(function(data) {
        //   $('#' + btn).attr("disabled", false);
        //   $("#" + btn).html(btnhtml)
        fun(data);
    });
    aj.fail(function() {
        $("#" + btn).attr("disabled", false);
        $("#" + btn).html(btnhtml);
        $("#" + div).html(
            "Alert, Check your connection to inter and try again later"
        );
    });
}

function ajax_all_keyup(url, data, btn, fun, div, btnhtml) {
    if (AJ_AX && AJ_AX.readyState != 4) {
        AJ_AX.abort();
        AJ_AX = null;
    }

    AJ_AX = $.ajax({
        method: "post",

        url: url,
        data: data,
        headers: { "X-CSRF-TOKEN": $("#csrf-token").val() },
        cache: false,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        // beforeSend: function(xhr) {

        // $("#" + btn).html('<h5 class="text-center"><i class="fa fa-spinner fa-spin fa-fw"></i></h5>')
        // }
    });
    AJ_AX.done(function(data) {
        // $('#' + btn).attr("disabled", false);
        // $("#" + btn).html(btnhtml)
        fun(data);
    });
    AJ_AX.fail(function() {
        $("#" + btn).attr("disabled", false);
        $("#" + btn).html(btnhtml);
        $("#" + div).html(
            "Alert, Check your connection to inter and try again later"
        );
    });
}

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = mm + "-" + dd + "-" + yyyy;
