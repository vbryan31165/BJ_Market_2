var personJSONFromLS = localStorage.getItem("person"); //Obtener datos de localStorage
var personFromLS = JSON.parse(personJSONFromLS); // Covertir a objeto
var datos1 = [];
if (personFromLS === null) // Si no existe, creamos un array vacio.
	var datos1 = [];

function validaVacio(valor) {
	valor = valor.replace("&nbsp;", "");
	valor = valor == undefined ? "" : valor;
	if (!valor || 0 === valor.trim().length) {
		return true;
	}
	else {
		return false;
	}
}

function Validar_C() {

	var MensajeError = [];
	var vnombre = document.getElementById('txtnombre').value;
	var vapellido = document.getElementById('txtapellido').value;
	var vemail = document.getElementById('txtemail').value;
	var vcelular = document.getElementById('numcelular').value;
	var errorM = document.getElementById('error_msg');
	if (validaVacio(vnombre) || validaVacio(vapellido) || validaVacio(vemail) || validaVacio(vcelular)) {  //COMPRUEBA CAMPOS VACIOS

		MensajeError.push("Los Campos no deben quedar vacios*");
		errorM.innerHTML = MensajeError.join(",")
		return false;
	} else {
		Almacenar()
	}
	return true;

}

function Almacenar() {
	var numero1 = document.forms.Listas.nombre.value;
	var numero2 = document.forms.Listas.apellido.value;
	var correo = document.forms.Listas.correo.value;
	var celular = document.forms.Listas.celular.value;
	var id = document.forms.Listas.member_id.value;
	if (id == '') {
		id = guid();
		var nuevo = new datos(nombre, apellido, correo, celular, id);
		datos1.push(nuevo);
		var jsonPerson = JSON.stringify(datos1);
		localStorage.setItem("person", jsonPerson);
	} else {
		member = document.forms.Listas.member_id.value;
		var memberId = personFromLS.find(function (item) {
			return item.id == member;
		})
		memberId.nombre_l = document.forms.Listas.nombre.value;
		memberId.apellido_l = document.forms.Listas.apellido.value;
		memberId.correo_l = document.forms.Listas.correo.value;
		memberId.celular_l = document.forms.Listas.celular.value;
		memberId.id = document.forms.Listas.member_id.value;

		console.log(memberId);

		var data = JSON.stringify(personFromLS);
		localStorage.setItem('person', data);
	}
	doShowAll();
}

function datos(nombre, apellido, correo, celular, id) {
	this.nombre_l = nombre;
	this.apellido_l = apellido;
	this.correo_l = correo;
	this.celular_l = celular;
	this.id = id;
}

function onEdit(id) {
	// Llemanos el formulario con los datos actuales de la vaca a editar
	var memberId = personFromLS.find(function (item) {
		return item.id == id;
	})
	nombre = document.forms.Listas.nombre.value = memberId.nombre_l;
	apellido = document.forms.Listas.apellido.value = memberId.apellido_l;
	correo = document.forms.Listas.correo.value = memberId.correo_l;
	celular = document.forms.Listas.celular.value = memberId.celular_l;
	member_id = document.forms.Listas.member_id.value = memberId.id;
}

/**
* genera un id unico
*/
function guid() {
	return parseInt(Date.now() + Math.random());
}

function Borrar(id) {
	var newData = [];
	newData = personFromLS.filter(function (item, index) {
		return item.id != id;
	});
	console.log(newData);
	var data = JSON.stringify(newData);
	localStorage.setItem('person', data);
	doShowAll();
}


function ClearAll() {
	localStorage.clear();
	doShowAll();
}

// dynamically draw the table
function doShowAll() {
	if (CheckBrowser()) {
		var list = "<tr><th>Nro</th><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Celular</th><th>Opciones</th></tr>\n";
		if (localStorage.getItem("person")) {
			personJSONFromLS = localStorage.getItem("person");
			personFromLS = JSON.parse(personJSONFromLS);
			for (const [key, value] of Object.entries(personFromLS)) {
				//	    console.log(key, value);
				list += "<tr><td>" + key + "</td>\n<td>"
					+ value.nombre_l + "</td>\n<td>"
					+ value.apellido_l + "</td>\n<td>"
					+ value.correo_l + "</td>\n<td>"
					+ value.celular_l + "</td>\n<td>"
					+ '<a class="btn btn-warning mx-3 " onClick="onEdit(\'' + value.id + '\')">Editar</a>' + "  " + '<a class= "btn btn-danger mx-2 btnDelete " onClick="Borrar(\'' + value.id + '\')">Eliminar</a>' + "</td></tr>";
			}
		} else {
			if (list == "<tr><th>Nro</th><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Celular</th></tr>\n") {
				list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td>\n<td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
			}
		}
		document.getElementById('list').innerHTML = list;
	} else {
		alert('No soportado local storage');
	}
}

/*
* Checking the browser compatibility.
* 
* Alternately can use Modernizr scripts- JavaScript library that helps us to
* detect the browser support for HTML5 and CSS features Example - <script
* type="text/javascript" src="modernizr.min.js"></script>
* 
* if (Modernizr.localstorage) { //use localStorage object to store data } else {
* alert('Cannot store user preferences as your browser do not support local
* storage'); }
*/
function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store data
		return true;
	} else {
		return false;
	}
}