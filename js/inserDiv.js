miespacio = window.localStorage;
var activo_usern = miespacio.getItem('nomb');
var activo_usera = miespacio.getItem('apel');
var activo_usert = miespacio.getItem('tip');
document.getElementById('dato_usuario').innerHTML ='<img class="img-fluid w-1 h-2 " src="../img/cerra.svg" alt="" srcset="">'+activo_usern+" "+activo_usera;

//fin------------------------------------------------

if(activo_usern == null){
    location.href="../index.html";
}

if (activo_usert == "Invitado"){
    var res = document.getElementById('cuad');
    res.style.display = "none";
}
function cerrar(){
    var respuest = confirm("Are you sure you want to log out?");
    if (respuest == true)
    {
        miespacio.clear();
        console.log("Cerraste sesion");
        location.href="../index.html";
    }
    else
    {
        return false;
    }

}