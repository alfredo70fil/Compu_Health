// Ingresamos nuestra base de datos de FireBase
var firebaseConfig = {
    apiKey: "AIzaSyBm3eLMSoryKAhtSGlO3_jbMgJFnoVM3QM",
    authDomain: "compuhealth-a64f4.firebaseapp.com",
    databaseURL: "https://compuhealth-a64f4-default-rtdb.firebaseio.com",
    projectId: "compuhealth-a64f4",
    storageBucket: "compuhealth-a64f4.appspot.com",
    messagingSenderId: "54545821017",
    appId: "1:54545821017:web:bc87bf31738810402e3048",
    measurementId: "G-FF8E7D280W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='selecciona';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
    document.getElementById("Input5").value='selecciona';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
    document.getElementById("Input8").value='';
}
function createR() {
    // Se almacenan y capturan los datos
    document.getElementById("Input1").disabled = false;
    var id = document.getElementById("Input1").value;
    var marca = document.getElementById("Input2").value;
    var modelo = document.getElementById("Input3").value;
    var tipo_pantalla = document.getElementById("Input4").value;
    var procesador = document.getElementById("Input5").value;
    var memoria = document.getElementById("Input6").value;
    var almacenamiento = document.getElementById("Input7").value;
    var grafica = document.getElementById("Input8").value;

    if (id.length > 0) {
        // Creacion de objeto para almacenar la informacion
        var computadora = {
            id, 
            marca,
            modelo,
            tipo_pantalla,
            procesador,
            memoria,
            almacenamiento,
            grafica,
        }

        // Verifica el ingreso de los datos limpiando los campos de registro posteriormente
        firebase.database().ref('Computadoras/' + id).update(computadora).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    // Se habilita el ingreso del ID
    document.getElementById("Input1").disabled = false;
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Computadoras');
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(computadora){
    
    if(computadora!=null){
        var table = document.getElementById("Table1"); 

        // Creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        // Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);

        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = computadora.id;
        cell2.innerHTML = computadora.marca;
        cell3.innerHTML = computadora.modelo; 
        cell4.innerHTML = computadora.tipo_pantalla;
        cell5.innerHTML = computadora.procesador; 
        cell6.innerHTML = computadora.memoria; 
        cell7.innerHTML = computadora.almacenamiento; 
        cell8.innerHTML = computadora.grafica;
        
        // Llamamos a la funcion correspondiente a cada accion de los botones identificando el objeto por el ID
        cell9.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${computadora.id})">Eliminar</button>`;
        cell10.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+computadora.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Computadoras/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

// Toma los datos almacenados de la base de datos en base al ID donde el valor que se hace referencia se modifica con snapshots
function seekR(id){
    var ref = firebase.database().ref('Computadoras/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

// Muestas los campos que ya fueron ingresados en la base de datos
function updateR(computadora){
    if(computadora!=null)
    {
        document.getElementById("Input1").value=computadora.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=computadora.marca;
        document.getElementById("Input3").value=computadora.modelo;
        document.getElementById("Input4").value=computadora.tipo_pantalla;
        document.getElementById("Input5").value=computadora.procesador;
        document.getElementById("Input6").value=computadora.memoria;
        document.getElementById("Input7").value=computadora.almacenamiento;
        document.getElementById("Input8").value=computadora.grafica;
    }
}


// Permite la consulta de las computadoras por medio de la Marca
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input2").value;

    var ref = firebase.database().ref("Computadoras");
    ref.orderByChild("marca").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


// Muestra los datos que se quieren consultar
function printRowQ(computadora){

    var table = document.getElementById("Table2"); 
    
    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);

    cell1.innerHTML = computadora.id;
    cell2.innerHTML = computadora.marca;
    cell3.innerHTML = computadora.modelo; 
    cell4.innerHTML = computadora.tipo_pantalla;
    cell5.innerHTML = computadora.procesador; 
    cell6.innerHTML = computadora.memoria; 
    cell7.innerHTML = computadora.almacenamiento; 
    cell8.innerHTML = computadora.grafica; 
}