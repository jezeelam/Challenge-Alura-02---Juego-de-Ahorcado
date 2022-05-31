const cambiarBotones = document.querySelector('.botones');
const botonJuego = document.querySelector('.boton1');
const botonJuego2 = document.querySelector('.boton2');
const pantalla = document.querySelector('canvas');
const pincel = pantalla.getContext('2d');
const letrasMal = document.querySelector('.letrasMalas');
const letrasPresionadas = document.querySelector('.presionadas');
const borrarCanvas = document.querySelector("canvas");
const teclado = document.querySelector(".teclado");
const tm = document.querySelectorAll(".teclaAbc");

pincel.strokeStyle = "#000000"; 
pincel.lineWidth = 4;

let adivinar = ["PERDON", "MIENTRAS", "PERECE", "CAOS", "PEDRO", "CASTRO", "BOLA", "CASA", "CANCHA", "ALITAS", "MEXICO", "COLOMBIA", "WEB", "ECUADOR", "PERU", "BRAZIL", "AMERICA","CELULAR","LLUVIA","DISCORD","ALURA","PANAMA","HONDURAS","TECLADO","MOUSE","MONITOR","TORRE","CLASES", "TOALLA", "RETO", "LISTO", "ENOJO", "SONRISA", "CAMA", "TECLADO", "DORMIR", "VIDA", "ERROR"];
let malasLetras = [];   
let buenasLetras = [];
let presionadas = [];
let p = [];
let ganaste;
let aleatorio = Math.round(Math.random()* (adivinar.length - 1));
let palabraMisteriosa = adivinar[aleatorio]; 
    
botonJuego.addEventListener("click", function(e) {
    e.preventDefault();
    if(botonJuego.textContent == "Iniciar juego") {
        canvasOn(); 
        crearCanvas(); 
        presionadasLetras();
        formarPalabra();  
        escucharLetras();
        escucharTouch();

    }
    if (botonJuego.textContent == "Nuevo Juego") { 
        reiniciarJuego();
        presionadasLetras();
        formarPalabra(); 
    }
 
});
botonJuego2.addEventListener("click", function(e) {
    e.preventDefault();
    if(botonJuego2.textContent == "Desistir") {
        swal("", "La palabra era "+ palabraMisteriosa + " " , "info", {})
        .then(() =>{
            location.reload();  
      });   
    }   
   
});
function escucharTouch() { teclado.addEventListener("touchstart", function(e) {
    e.preventDefault();
    let toque = e.target.textContent;
    if(toque.length > 1) {
        alertaTouchfuera();
    } else { 
        for (let i = 0; i < palabraMisteriosa.length; i++) {
            const m = palabraMisteriosa[i];
            console.log(m);
            if (toque == m) {
                crearLetras(m);          
                e.target.classList.add("acierto");
            }
            if (palabraMisteriosa.search(toque) == -1) {
                if (!malasLetras.includes(toque)) {
                    malasLetras.push(toque);  
                    e.target.classList.add("desacierto");
                }
            }
            if (p.length === buenasLetras.length) {
                ganasteAlerta();
            } 
            if(malasLetras.length == 10) {
                swal("Perdiste!", "La palabra era " + palabraMisteriosa + " " , "error", {
                    button: "Intentarlo de Nuevo",
                })
                .then(() =>{
                      reiniciarJuego();
                      presionadasLetras();
                      formarPalabra();  
                });
            } 
        }
        crearAhoracado();
    }
});
}
function escucharLetras() { document.addEventListener("keydown", function(event) {
    let tecla = event.key;
    let permitidos = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let noPermitidas = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9']; 
    for (let i = 0; i < permitidos.length; i++) {         
        const letra = permitidos[i]; 
        juego(tecla, letra, noPermitidas);
        
    }       
});
}
function canvasOn() {
    cambiarBotones.classList.add("canvasOn");
    botonJuego.classList.add("boton");
    botonJuego2.classList.add("boton");
    teclado.classList.remove("sacar");
    letrasPresionadas.classList.remove("sacar");
    botonJuego2.textContent = "Desistir"
    botonJuego.textContent = "Nuevo Juego"   
}
function crearCanvas() {
    pantalla.classList.remove('removerCanvas');
}
function alertaError() {
    swal("Ups!", "Solo letras y que sean mayúsculas, por favor", "error", {button: false});
}
function alertaTouchfuera() {
    swal("Ups!", "No le diste a la letra", "error");
}
function crearTd() {
    let tdletra = document.createElement("td");
    letrasMal.appendChild(tdletra);
}   
function crearAhoracado() {
    if(malasLetras.length === 1) {
        pincel.moveTo(90, 125); // Base de la horca
        pincel.lineTo(140, 125);
        pincel.stroke();
    }
    if(malasLetras.length === 2){
        pincel.moveTo(115, 125); // Altura de la Horca
        pincel.lineTo(115, 21);
        pincel.stroke();
    }
    if(malasLetras.length === 3) {
        pincel.moveTo(113, 20); // Base para la cuerda
        pincel.lineTo(160, 20);
        pincel.stroke();
    }
    if(malasLetras.length === 4){
        pincel.moveTo(158, 20); // Base para el cuello 
        pincel.lineTo(158, 50);
        pincel.stroke();
    }
    if(malasLetras.length === 5){
        pincel.beginPath(); // Cabeza 
        pincel.arc(158, 61, 13, 0, 2 * Math.PI, false);
        pincel.stroke();
    }
    if(malasLetras.length === 6) {
        pincel.moveTo(158, 76); // Cuerpo
        pincel.lineTo(158, 100);
        pincel.stroke();
    }
    if(malasLetras.length === 7) {
        pincel.moveTo(158, 80); // Brazo derecha
        pincel.lineTo(168, 98);
        pincel.stroke();
    }
    if(malasLetras.length === 8) {
        pincel.moveTo(158, 80); // Brazo izquierdo
        pincel.lineTo(148, 98);
        pincel.stroke();
    }
    if(malasLetras.length === 9) {
        pincel.moveTo(158, 99) // Pierna derecha
        pincel.lineTo(168, 115);
        pincel.stroke();
    }
    if(malasLetras.length === 10) {
        pincel.moveTo(158, 99) // Pierna izquierda
        pincel.lineTo(148, 115);
        pincel.stroke();
    }  
}
function crearLetras(tecla, m) {
    let td = document.querySelectorAll("td");
    td.forEach( () => {
        for (let i = 0; i < palabraMisteriosa.length; i++) {
            const a = palabraMisteriosa[i];
            if(tecla == a || m == a) {
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
  swal("Ganaste!", "", "success", {
      button: "Jugar de Nuevo",
  })
  .then(() =>{
        reiniciarJuego();
        presionadasLetras();
        formarPalabra();  
  });
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
function juego(tecla, letra, noPermitidas) {

    if(tecla == letra) {
        if (!presionadas.includes(tecla)) {
            presionadas.push(letra);
        } else {
             swal("", "Ya presionaste esta letra!", "warning", {button: false});
        }
        if (palabraMisteriosa.search(letra) == -1) {
            if (!malasLetras.includes(letra)) {
                malasLetras.push(tecla);  
            }
        }
        if(malasLetras.length == 10) {
            swal("Perdiste!", "La palabra era " + palabraMisteriosa + " " , "error", {
                button: "Intentarlo de Nuevo",
            })
            .then(() =>{
                  reiniciarJuego();
                  presionadasLetras();
                  formarPalabra();  
            });
        }  
        letrasPresionadas.textContent = malasLetras.join(" ");
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
function reinciarCanvas() {
    const context = borrarCanvas.getContext('2d');
    context.clearRect(0, 0, borrarCanvas.width, borrarCanvas.height);
    context.beginPath();

}
function reiniciarJuego () { 
    letrasMal.innerHTML = "";
    letrasPresionadas.innerHTML = "";
    presionadas = [];
    malasLetras = [];   
    buenasLetras = [];
    p.length = 0
    aleatorio = Math.round(Math.random()* (adivinar.length - 1));
    palabraMisteriosa = adivinar[aleatorio];
    tm.forEach(element => {
        element.classList.remove("acierto");
        element.classList.remove("desacierto");
    });

    reinciarCanvas();  
}
function formarPalabra() {
    for(let i = 0; i < palabraMisteriosa.length; i++) {
        crearTd();
        crearClase();
    }
}