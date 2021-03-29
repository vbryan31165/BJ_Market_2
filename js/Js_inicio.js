miespacio = window.localStorage;
var dts = [];

function validar() {
    fetch('./json/info_user.json')
        .then(respuesta => respuesta.json())
        .then(usuarios => {
            dts = usuarios;
            var txtuser = document.getElementById('txtuser').value;
            var txtpassw = document.getElementById('txtcontra').value;
            var j;
            for (i = 0; i <= dts.length; i++) {
                if (txtuser == dts[i].user) {
                    console.log("entro");
                    j = i;
                    validarcontra(j);
                }
            }//cliclo for
        })//then-user
}//close fun

function validarcontra(j) {//validar contra
    var txtpassw3 = document.getElementById('txtcontra').value;
    if (txtpassw3 == dts[j].passw) {
        var nom = dts[j].name;
        var ape = dts[j].lastname;
        var ti = dts[j].Tipo;
        miespacio.setItem('nomb', nom);
        miespacio.setItem('apel', ape);
        miespacio.setItem('tip', ti);
        alert("Tipo de usuario " + ti);
        if (ti == "Invitado") {
            alert("No tiene acceso al formulario de quejas");
        }
        location.href = "html/Pprincipal.html";
    } else {
        document.getElementById('res').innerHTML = "Error: usuario y/o contraseña son incorrectos ";
        limpiar();
    }
}//fin fun

function validarcampos() {//validar campos vacios
    var txtuser1 = document.getElementById('txtuser').value;
    var txtpassw2 = document.getElementById('txtcontra').value;
    console.log(txtuser.length);
    if (txtuser1.length >= 4 && txtpassw2.length > 0) {
        validar()
    }
    else {
        document.getElementById('res').innerHTML = "Nota: el usuario debe ser mayor a 4 caracteres";
        limpiar();
    }
    if (txtuser1.length == 0) {
        document.getElementById('res').innerHTML = "Nota: el campo de usuario no puede estar vacio";
        limpiar();
    }
    if (txtpassw2.length == 0) {
        document.getElementById('res').innerHTML = "Nota: el campo de contraseña no puede estar vacio";
        limpiar();
    }
    if (txtuser1.length == 0 && txtpassw2.length == 0) {
        document.getElementById('res').innerHTML = "Nota: los campos usuario y contraseña no puede estar vacios";
        limpiar();
    }
}//fin fun

function limpiar() {//Limpiar form
    document.getElementById('Form_inicio').reset();
}//fin fun
