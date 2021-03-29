var divtabla = document.getElementById("cuadro"); // cuadro dentro de la tabla
var i = 1; //contadora
var botonenviar = document.getElementById("btnagregar");
var botoneditar = document.getElementById("btneditar");
botoneditar.disabled = false; //no habilitado editar

var infoForm = {}; //variable tipo

var personJSONFromLS = localStorage.getItem("calculadora"); //Obtener datos de localStorage
var personFromLS = JSON.parse(personJSONFromLS); // Covertir a objeto
var datos1 = [];
if (personFromLS === null) // Si no existe, creamos un array vacio.
    var datos1 = [];

function procesar() {
    //calcula y agrega a la fila de la tabla

    var numero1 = document.getElementById("txtnume1").value;
    var numero2 = document.getElementById("txtnume2").value;
    var secuencia = document.getElementById("member_id").value;
    ///validacion de campos requeridos
    var ok = 0;
    var ckbox = document.getElementsByName('op[]');
        for (var i=0; i < ckbox.length; i++){
            if(ckbox[i].checked == true){
            ok = 1;
            }
        }
        /* if(ok == 0){
        alert('indique al menos un mes');
        return false;
        } */

    if ((isNaN(numero1) || isNaN(numero2) || ok!=1)) {
        alert("debe ingresar la informacion en todos los campos y valores numericos");
    } else {
        if (document.getElementById("suma").checked) {
            var resultado = parseFloat(numero1) + parseFloat(numero2);
            alert(resultado);
        }
        if (document.getElementById("resta").checked) {
            var resultado = parseFloat(numero1) - parseFloat(numero2);
            alert(resultado);
        }
        if (document.getElementById("multiplicacion").checked) {
            var resultado = parseFloat(numero1) * parseFloat(numero2);
            alert(resultado);
        }
        if (document.getElementById("division").checked) {
            var resultado = parseFloat(numero1) / parseFloat(numero2);
            alert(resultado);
        }

        //////////////////  cambio de formato
        console.log(secuencia);
        //almacena en el LocalStorage
        /* console.log(infoForm.secuencia) */


        infoForm["id"] = i++;
        infoForm["numero1"] = numero1;
        infoForm["numero2"] = numero2;
        infoForm["resultado"] = resultado;
        infoForm["secuencia"] = guid();
        ////////////////
        /* console.log("Secuencia : " + secuencia) */
        /////////////// insertar a la tabla
        var tabla = document.getElementById("tbPorcentaje");
        var nuevaFila = tabla.insertRow(tabla.lenght);
        nuevaFila.id = infoForm.secuencia;

        cell1 = nuevaFila.insertCell(0);
        cell1.innerText = nuevaFila.id;
        cell1.innerHTML = infoForm.id;

        cell2 = nuevaFila.insertCell(1);
        cell2.innerHTML = infoForm.numero1;

        cell3 = nuevaFila.insertCell(2);
        cell3.innerHTML = infoForm.numero2;

        cell4 = nuevaFila.insertCell(3);
        cell4.innerHTML = infoForm.resultado;

        cell5 = nuevaFila.insertCell(4);

        cell5.innerHTML = '<a  id=' + infoForm["secuencia"] + ' class="btn btn-warning btn-sm " onClick="onEdit(this)">Edit</a><a id=' + infoForm["secuencia"] + ' class= "fila btn btn-danger btn-sm" onClick="onDelete(this)" >Delete</aid=>';
        //////////////


        almacenarLs(infoForm.numero1, infoForm.numero2, infoForm.secuencia);
        //////////////////////

        ///limpia el formilario
        document.getElementById("miForm").reset();
        /*  divtabla.style.display=''; */
        ///muestra la yabla ya que por lo menos se tiene un registro
    }
} ///fin de procesar


///datos
function datos(numero1, numero2, secuencia) {
    this.numero_1 = numero1;
    this.numero_2 = numero2;
    this.secuencia = secuencia;
}

//almacenar
function almacenarLs(numero1, numero2, id) {
    console.log(id);

    var nuevo = new datos(numero1, numero2, id);
    datos1.push(nuevo);
    var jsonPerson = JSON.stringify(datos1);
    localStorage.setItem("calculadora", jsonPerson);
    /*  }else{
         member = document.forms.miForm.member_id.value;	
         console.log(member);
     } */


}

//////editar
function onEdit(td) {
    personJSONFromLS = localStorage.getItem("calculadora"); //Obtener datos de localStorage
    personFromLS = JSON.parse(personJSONFromLS); // Covertir a objetome
    ///cambio de botones
    botoneditar.disabled = false;
    botonenviar.disabled = true;
    selectedRow = td.parentElement.parentElement; //me trae la fila del tr
    id = selectedRow.id; //del selectedRow solo se usara el id del tr
    // Llemanos el formulario con los datos actuales de la vaca a editar
    var encontro = personFromLS.find(function (item) { //funcion busqueda, el dato a editar
        return item.secuencia == id;
    })
    
    numero1 = document.forms.miForm.txtnume1.value = encontro.numero_1;
    numero2 = document.forms.miForm.txtnume2.value = encontro.numero_2;
    member_id = document.forms.miForm.member_id.value = encontro.secuencia;
   
    /* console.log(selectedRow);
    document.getElementById("txtnume1").value = selectedRow.cells[1].innerHTML;
    document.getElementById("txtnume2").value = selectedRow.cells[2].innerHTML; */
}

////////borrar localstorage

function BorrarLs(id) {
    personJSONFromLS = localStorage.getItem("calculadora"); //Obtener datos de localStorage
    personFromLS = JSON.parse(personJSONFromLS); // Covertir a objeto
    var newData = [];  
    newData = personFromLS.filter(function (item, index) { //filtra menos el que se va a eliminar, de acuerdo al id
        return item.secuencia != id;
    });
    //console.log(newData);
    var data = JSON.stringify(newData);  //se convierte a json
    localStorage.setItem('calculadora', data); //almacena a LocalStorage
 
}


/////// actualizar datos
function actualizarfila() {

    member = document.forms.miForm.member_id.value;
    console.log(member);
    var memberId = personFromLS.find(function (item) {
        return item.secuencia == member;
    })
    memberId.numero_1 = document.forms.miForm.txtnume1.value;
    memberId.numero_2 = document.forms.miForm.txtnume2.value;
    selectedRow.cells[1].innerHTML = memberId.numero_1;
    selectedRow.cells[2].innerHTML = memberId.numero_2;
    
    /* memberId.secuencia = document.forms.miForm.member_id.value; */
    if (memberId.numero_1 == "" || memberId.numero_2  == "") {
        alert("debe ingresar la informacion en todos los campos");
    } else {
        if (document.getElementById("suma").checked) {
            var resultado = parseFloat(memberId.numero_1) + parseFloat(memberId.numero_2);
            alert(resultado);
        }
        if (document.getElementById("resta").checked) {
            var resultado = parseFloat(memberId.numero_1) - parseFloat(memberId.numero_2);
            alert(resultado);
        }
        if (document.getElementById("multiplicacion").checked) {
            var resultado = parseFloat(memberId.numero_1) * parseFloat(memberId.numero_2);
            alert(resultado);
        }
        if (document.getElementById("division").checked) {
            var resultado = parseFloat(memberId.numero_1) / parseFloat(memberId.numero_2);
            alert(resultado);
        }
    }
    selectedRow.cells[3].innerHTML = resultado;
    console.log(memberId);

    var data = JSON.stringify(personFromLS);
    localStorage.setItem('calculadora', data);
    botoneditar.disabled = true;
    botonenviar.disabled = false;
}

//////////////

/////////eliminar
function onDelete(td) {
    console.log(td)
    if (confirm("Estas seguro? si lo borras perderas la informacion")) {
        row = td.parentElement.parentElement;
        document.getElementById("tbPorcentaje").deleteRow(row.rowIndex);
        ///borrarForm();

        var num = document.getElementById("tbPorcentaje").rows.length;

        // alert(num)
        if (num == 1) {
            /* divtabla.style.display='none'; */
        }
        console.log("Borar.:  " + row.id);
        id = row.id;
        BorrarLs(id);

    }
}
/////////////

function guid() {
    return parseInt(Date.now() + Math.random());
}
