$(".forward-img").attr("id", 0);
$(".backward-img").attr("id", 0);
$(".backward-img").addClass("disabled")
$(".forward-img").click(function() {
    console.log(imagenes);
    var id = this.id;
    $(".backward-img").removeClass("disabled")
    if (this.id >= 0 && this.id < imagenes.length) {
        console.log(this.id);
        id++;
        $(".vista-imagen-principal").attr(
            "src",
            "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" + imagenes[id]
        );
        if (id == imagenes.length - 1) {
            $(".forward-img").addClass("disabled")
        }
        $(".forward-img").attr("id", id);
        $(".backward-img").attr("id", id);
    } else {
        $(".forward-img").addClass("disabled")
    }
    console.log(this.id);
});
$(".backward-img").click(function() {
    console.log(imagenes);
    var id = this.id;
    $(".forward-img").removeClass("disabled")
    if (this.id >= 0 && this.id < imagenes.length) {
        console.log(this.id);
        id--;
        $(".vista-imagen-principal").attr(
            "src",
            "https://api-mantenimiento.paedpaal.com/api/buscarImg?file3=" + imagenes[id]
        );
        if (id == 0) {
            $(".backward-img").addClass("disabled")
        }
        $(".backward-img").attr("id", id);
        $(".forward-img").attr("id", id);
    } else {
        $(".backward-img").addClass("disabled")
    }
    console.log(this.id);
});
