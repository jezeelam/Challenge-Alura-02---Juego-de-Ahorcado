const cambiarBotones = document.querySelector('.botones');
const botonJuego = document.querySelector('.boton1');
const botonJuego2 = document.querySelector('.boton2');
const inputOff = document.querySelector('.input');
const pantalla = document.querySelector('canvas');
const pincel = pantalla.getContext('2d');
const letrasMal = document.querySelector('.letrasMalas');
const letrasPresionadas = document.querySelector('.presionadas');

pincel.strokeStyle = "#000000"; 
pincel.lineWidth = 4;

let adivinar = ["PERDON", "MIENTRAS", "PERECE", "CAOS", "PEDRO", "CASTRO", "BOLA", "CASA", "CANCHA", "ALITAS", "Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];
let malasLetras = [];   
let buenasLetras = [];
let presionadas = [];
let p = [];
let ganaste;
let aleatorio = Math.round(Math.random()*10);
let palabraMisteriosa = adivinar[aleatorio];
let intentos = 0;
    
botonJuego.addEventListener("click", function(e) {
    e.preventDefault();

    if (botonJuego.textContent == "Nuevo Juego") {
        location.reload();
    }
    if(botonJuego.textContent == "Iniciar juego") {
        canvasOn(); 
        crearCanvas(); 
        presionadasLetras();
    }
    for(let i = 0; i < palabraMisteriosa.length; i++) {
        crearTd();
        crearClase();
    }
    escucharLetras();   
});
botonJuego2.addEventListener("click", function(e) {
    e.preventDefault();
    if(botonJuego2.textContent == "Cancelar") {
        canvasOff();
        location.reload();
    }   
});
function escucharLetras() { document.addEventListener("keypress", function(event) {

    let tecla = event.key;
    
    let permitidos = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let noPermitidas = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']; 

    for (let i = 0; i < permitidos.length; i++) {           
        const letra = permitidos[i]; 

        if(tecla == letra) {
            if (presionadas.includes(tecla)) {
                swal("", "Ya presionaste esta letra!", "warning")
            } else {
                presionadas.push(tecla);
            }
            if (palabraMisteriosa.search(letra) == -1) {
                if (!malasLetras.includes(letra)) {
                    malasLetras.push(tecla);  
                }
            }
            if(malasLetras.length == 10) {
                swal("Perdiste!", "La palabra era " + palabraMisteriosa + " " , "error");
            }  
            letrasPresionadas.textContent = presionadas.join(" ");
            crearAhoracado();
            crearLetras(tecla, letra);
            if (p.length === buenasLetras.length) {
                ganasteAlerta();
            }
        }
            for (let i = 0; i < noPermitidas.length; i++) {
            const letrasMinuculas = noPermitidas[i];
            if(tecla == letrasMinuculas)  {
                alertaError();              
                break;
            }
        }      
    }       
});
}
function canvasOn() {
    cambiarBotones.classList.add("canvasOn");
    botonJuego.classList.add("boton");
    botonJuego2.classList.add("boton");
    letrasPresionadas.classList.remove("sacar");
    botonJuego2.textContent = "Cancelar"
    botonJuego.textContent = "Nuevo Juego"   
}
function canvasOff() {
    cambiarBotones.classList.remove("canvasOn");
    botonJuego.classList.remove("boton");
    botonJuego2.classList.remove("boton");
    botonJuego2.textContent = "Agregar nueva palabra"
    botonJuego.textContent = "Iniciar juego"
    removerCanvas();
}
function crearCanvas() {
    pantalla.classList.remove('removerCanvas')

}
function removerCanvas() {
    let borrarCanvas = document.querySelector("canvas");
    if (borrarCanvas > "") {
        borrarCanvas.classList.add('removerCanvas');
    }
}
function alertaError() {
    swal("Ups!", "Solo letras y que sean mayúsculas, por favor", "error");
}
function crearTd() {
    let tdletra = document.createElement("td");
    letrasMal.appendChild(tdletra);
}   
function crearAhoracado() {
    if(malasLetras.length == 1) {
        pincel.moveTo(90, 125); // Base de la horca
        pincel.lineTo(140, 125);
        pincel.stroke();
    }
    if(malasLetras.length == 2){
        pincel.moveTo(115, 125); // Altura de la Horca
        pincel.lineTo(115, 21);
        pincel.stroke();
    }
    if(malasLetras.length == 3) {
        pincel.moveTo(113, 20); // Base para la cuerda
        pincel.lineTo(160, 20);
        pincel.stroke();
    }
    if(malasLetras.length == 4){
        pincel.moveTo(158, 20); // Base para el cuello 
        pincel.lineTo(158, 50);
        pincel.stroke();
    }
    if(malasLetras.length == 5){
        pincel.beginPath(); // Cabeza 
        pincel.arc(158, 61, 13, 0, 2 * Math.PI, false);
        pincel.stroke();
    }
    if(malasLetras.length == 6) {
        pincel.moveTo(158, 76); // Cuerpo
        pincel.lineTo(158, 100);
        pincel.stroke();
    }
    if(malasLetras.length == 7) {
        pincel.moveTo(158, 80); // Brazo derecha
        pincel.lineTo(168, 98);
        pincel.stroke();
    }
    if(malasLetras.length == 8) {
        pincel.moveTo(158, 80); // Brazo izquierdo
        pincel.lineTo(148, 98);
        pincel.stroke();
    }
    if(malasLetras.length == 9) {
        pincel.moveTo(158, 99) // Pierna derecha
        pincel.lineTo(168, 115);
        pincel.stroke();
    }
    if(malasLetras.length == 10) {
        pincel.moveTo(158, 99) // Pierna izquierda
        pincel.lineTo(148, 115);
        pincel.stroke();
    }  

}
function crearLetras(tecla) {
    let td = document.querySelectorAll("td");
    td.forEach( () => {
        for (let i = 0; i < palabraMisteriosa.length; i++) {
            const a = palabraMisteriosa[i];
            if(tecla == a) {
                td[i].textContent = a;
                meterLetras(tecla);
            }
            }
    });            
}
function crearClase() {
    let td = document.querySelectorAll(':scope td');  
    for (let i = 0; i < td.length; i++) {
        const clase = td[i];
        if (i == 0) {
            clase.classList.add('td1');
        } else if(i == 1) {
            clase.classList.add('td2');
        } else if(i == 2){
            clase.classList.add('td3');
        } else if(i == 3) {
            clase.classList.add('td4');
        } else if(i == 4){
            clase.classList.add('td5');                           
        } else if(i == 5) {
            clase.classList.add('td6');
        } else if(i == 6){
            clase.classList.add('td7');
        } else if(i == 7) {
            clase.classList.add('td8');
        } else if(i == 8){
            clase.classList.add('td9');                            
        }
    }   
}
function ganasteAlerta() {  
    ganaste = window.setTimeout(slowAlert, 500);     
}    
function slowAlert() {
  swal("Ganaste!", "", "success");
}
function meterLetras(letra) {
    if (!buenasLetras.includes(letra)) {
        buenasLetras.push(letra);  
    }
}
function presionadasLetras() {
    for (const i of palabraMisteriosa) {
        if(!p.includes(i)) {
            p.push(i);
        }
    }
}