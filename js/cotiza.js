miespacio = window.localStorage;

function validarcampos() {
    var cantida = document.getElementById('txtcant').value;
    var ele = document.getElementsByName('pocentaje');
    var e = document.getElementById("txt_prod");
    var producto = e.options[e.selectedIndex].text;

    alert(producto)
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            porcentaje = ele[i].value;
        alert(prod_D)
    }
    var tbcotizacion = "<tr><th>Producto</th><th>cantidad</th><th>descuento</th><th>total a pagar</th></tr>\n";

    for (var x = 0; x < prod_D.length; x++) {
        tbcotizacion += "<tr><td>" + prod_D[i].prod + "</td>\n<td>"
            + prod_p[i].pre + "</td>\n<td>"
            + "</td></tr>";
    }
    console.log(tbcotizacion);
    alert(cantida);
    var res = document.getElementById('tbcotizacion');
    res.innerHTML = tbcotizacion
}




function limpiar() {//limpia form
    document.getElementById('form').reset();
}



function producto(producto, cantidad, correo, celular) {
    this.nombre_l = nombre;
    this.apellido_l = apellido;
    this.correo_l = correo;
    this.celular_l = celular;

}