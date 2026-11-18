// ==========================================================================
// BRIAN MIX & MARTINI'S - FUNCIONES JAVASCRIPT
// ==========================================================================

// 1. ANALIZADOR DE CANCIONES E HISTORIAL (HOME)
const veredictosBrian = [
  "Tu mezcla tiene tanto rango dinámico como una tabla de planchar. Soltá el limitador.",
  "La fase estéreo de tus guitarras colapsó tanto que en mono parecen una llamada de 2008.",
  "Ese bombo en 60 Hz retumba como si no supieras usar un ecualizador.",
  "Las frecuencias agudas están tan estridentes que lastiman los oídos.",
  "Técnicamente pasable, pero le falta calidez analógica.",
  "¿Sobrecompresión a -5 LUFS? Genial si tu público son aspiradoras industriales."
];

const historialCanciones = [];

// Recorre el historial con un bucle for para ver si el tema ya se analizo
function yaFueAnalizada(nombreCancion) {
  for (let i = 0; i < historialCanciones.length; i++) {
    if (historialCanciones[i] == nombreCancion) {
      return true;
    }
  }
  return false;
}

// Dibuja los <li> del historial en el HTML
function mostrarHistorial() {
  let listaHTML = document.getElementById("listaHistorial");
  let acumuladorHTML = "";

  for (let i = 0; i < historialCanciones.length; i++) {
    acumuladorHTML += "<li>" + (i + 1) + ". " + historialCanciones[i] + "</li>";
  }

  listaHTML.innerHTML = acumuladorHTML;
}

// Audita la cancion ingresada en el Home
function analizarCancionRapida() {
  let input = document.getElementById("inputPista");
  let textoVeredicto = document.getElementById("textoVeredicto");
  let cajaVeredicto = document.getElementById("veredictoBrian");
  let nombrePista = input.value;

  if (nombrePista == "") {
    textoVeredicto.innerText = "Brian dice: 'Por favor, escribí el nombre de tu canción antes de auditar.'";
    cajaVeredicto.style.backgroundColor = "#7f1d1d";
    return;
  }

  if (yaFueAnalizada(nombrePista) == true) {
    textoVeredicto.innerText = "Brian protesta: 'Ya analizamos \"" + nombrePista + "\". Por favor, subí otro tema distinto.'";
    cajaVeredicto.style.backgroundColor = "#7f1d1d";
    return;
  }

  historialCanciones.push(nombrePista);

  let indiceAleatorio = Math.floor(Math.random() * veredictosBrian.length);
  textoVeredicto.innerText = "Brian analiza '" + nombrePista + "': \"" + veredictosBrian[indiceAleatorio] + "\"";
  cajaVeredicto.style.backgroundColor = "#064e3b";

  mostrarHistorial();
}


// 2. REGISTRO E INICIO DE SESION SIMULADO (TODAS LAS PAGINAS)
const usuariosRegistrados = ["brian"];
const passwordsRegistrados = ["martini"];

function buscarIndiceUsuario(nombreUsuario) {
  for (let i = 0; i < usuariosRegistrados.length; i++) {
    if (usuariosRegistrados[i] == nombreUsuario) {
      return i;
    }
  }
  return -1;
}

function abrirModalAuth(modo) {
  let modal = document.getElementById("modalAuth");
  let titulo = document.getElementById("tituloModalAuth");
  let btnLogin = document.getElementById("btnSubmitLogin");
  let btnRegistro = document.getElementById("btnSubmitRegistro");
  let mensaje = document.getElementById("mensajeModalAuth");

  document.getElementById("inputAuthUsuario").value = "";
  document.getElementById("inputAuthPassword").value = "";
  mensaje.innerText = "";

  if (modo == "login") {
    titulo.innerText = "Iniciar Sesión";
    btnLogin.style.display = "block";
    btnRegistro.style.display = "none";
  } else {
    titulo.innerText = "Registrarse";
    btnLogin.style.display = "none";
    btnRegistro.style.display = "block";
  }

  modal.style.display = "flex";
}

function cerrarModalAuth() {
  document.getElementById("modalAuth").style.display = "none";
}

function procesarRegistro() {
  let nuevoUsuario = document.getElementById("inputAuthUsuario").value;
  let nuevaPassword = document.getElementById("inputAuthPassword").value;
  let mensaje = document.getElementById("mensajeModalAuth");

  if (nuevoUsuario == "" || nuevaPassword == "") {
    mensaje.innerText = "Completá usuario y contraseña.";
    return;
  }

  if (buscarIndiceUsuario(nuevoUsuario) != -1) {
    mensaje.innerText = "Ese usuario ya existe. Elegí otro.";
    return;
  }

  usuariosRegistrados.push(nuevoUsuario);
  passwordsRegistrados.push(nuevaPassword);

  mostrarSesionIniciada(nuevoUsuario);
  cerrarModalAuth();
}

function procesarLogin() {
  let usuario = document.getElementById("inputAuthUsuario").value;
  let password = document.getElementById("inputAuthPassword").value;
  let mensaje = document.getElementById("mensajeModalAuth");

  let indice = buscarIndiceUsuario(usuario);

  if (indice == -1 || passwordsRegistrados[indice] != password) {
    mensaje.innerText = "Usuario o contraseña incorrectos.";
    return;
  }

  mostrarSesionIniciada(usuario);
  cerrarModalAuth();
}

function mostrarSesionIniciada(nombreUsuario) {
  document.getElementById("bloqueBotonesUsuario").style.display = "none";
  document.getElementById("bloqueSesionActiva").style.display = "flex";
  document.getElementById("nombreUsuarioActivo").innerText = "🍸 Hola, " + nombreUsuario;
}

function cerrarSesion() {
  document.getElementById("bloqueSesionActiva").style.display = "none";
  document.getElementById("bloqueBotonesUsuario").style.display = "flex";
}


// 3. SIMULADOR DE LUFS Y ORDEN DE DIAGNOSTICO (SERVICIOS)
function evaluarNivelLufs() {
  let valorTexto = document.getElementById("inputLufs").value;
  let estadoSenal = document.getElementById("estadoSenal");
  let cajaVeredicto = document.getElementById("cajaVeredictoServicio");
  let textoVeredicto = document.getElementById("textoVeredictoServicio");
  let imagenSenal = document.getElementById("imagenSenal");
  let imagenBrian = document.getElementById("imagenBrianServicio");

  if (valorTexto == "") {
    estadoSenal.innerText = "⚠️ Ingresá un número de LUFS";
    return;
  }

  let nivelLufs = Number(valorTexto);

  if (nivelLufs > -9) {
    estadoSenal.innerText = "⚠️ Compresión severa (" + nivelLufs + " LUFS)";
    cajaVeredicto.style.backgroundColor = "#fee2e2";
    textoVeredicto.innerText = "\"A " + nivelLufs + " LUFS aplastaste toda la música. Bajá el limitador.\"";
    imagenSenal.src = "./img/SenalLUFS4.png";
    imagenBrian.src = "./img/Brian-5LUFS.png";
  } else if (nivelLufs >= -14 && nivelLufs <= -9) {
    estadoSenal.innerText = "✅ Rango dinámico saludable (" + nivelLufs + " LUFS)";
    cajaVeredicto.style.backgroundColor = "#dcfce7";
    textoVeredicto.innerText = "\"¡Excelente! A " + nivelLufs + " LUFS tus instrumentos respiran con claridad.\"";
    imagenSenal.src = "./img/SenalLUFS9.png";
    imagenBrian.src = "./img/Brian_Jugzando_Recorte.png";
  } else {
    estadoSenal.innerText = "🔉 Señal muy débil (" + nivelLufs + " LUFS)";
    cajaVeredicto.style.backgroundColor = "#fef9c3";
    textoVeredicto.innerText = "\"A " + nivelLufs + " LUFS se escucha muy bajo. Subí la ganancia.\"";
    imagenSenal.src = "./img/SenalLUFS15.png";
    imagenBrian.src = "./img/Brian-15LUFS.png";
  }
}

const herramientasSeleccionadas = [];
const costosSeleccionados = [];

function tieneHerramienta(nombre) {
  for (let i = 0; i < herramientasSeleccionadas.length; i++) {
    if (herramientasSeleccionadas[i] == nombre) {
      return true;
    }
  }
  return false;
}

function calcularTotalMartinis() {
  let suma = 0;
  for (let i = 0; i < costosSeleccionados.length; i++) {
    suma += costosSeleccionados[i];
  }
  return suma;
}

function mostrarOrdenAuditoria() {
  let listaHTML = document.getElementById("listaHerramientasElegidas");
  document.getElementById("contadorHerramientas").innerText = herramientasSeleccionadas.length + " / 4 Módulos";
  document.getElementById("totalMartinis").innerText = calcularTotalMartinis() + " Martinis 🍸";

  if (herramientasSeleccionadas.length == 0) {
    listaHTML.innerHTML = "<li>Todavía no agregaste ninguna herramienta.</li>";
    return;
  }

  let acumuladorHTML = "";
  for (let i = 0; i < herramientasSeleccionadas.length; i++) {
    acumuladorHTML += "<li>" + (i + 1) + ". " + herramientasSeleccionadas[i] + " (" + costosSeleccionados[i] + " Martinis 🍸)</li>";
  }
  listaHTML.innerHTML = acumuladorHTML;
}

function agregarHerramienta(nombre, costo) {
  let mensaje = document.getElementById("mensajeOrden");
  if (tieneHerramienta(nombre) == true) {
    mensaje.innerText = "⚠️ Ya agregaste '" + nombre + "' a tu orden.";
    return;
  }
  herramientasSeleccionadas.push(nombre);
  costosSeleccionados.push(costo);
  mensaje.innerText = "✅ Agregaste '" + nombre + "'.";
  mostrarOrdenAuditoria();
}

function quitarUltimaHerramienta() {
  let mensaje = document.getElementById("mensajeOrden");
  if (herramientasSeleccionadas.length == 0) {
    mensaje.innerText = "⚠️ No hay herramientas para quitar.";
    return;
  }
  let quitada = herramientasSeleccionadas.pop();
  costosSeleccionados.pop();
  mensaje.innerText = "Quitaste '" + quitada + "'.";
  mostrarOrdenAuditoria();
}

function confirmarSesionAuditoria() {
  let mensaje = document.getElementById("mensajeOrden");
  if (herramientasSeleccionadas.length == 0) {
    mensaje.innerText = "⚠️ Seleccioná al menos una herramienta primero.";
    return;
  }
  mensaje.innerText = "🍸 ¡Sesión confirmada por " + calcularTotalMartinis() + " Martinis!";
}


// 4. MENU HAMBURGUESA Y CARRUSELES EN CELULAR
let menuMovilAbierto = false;

function alternarMenuMovil() {
  let menu = document.getElementById("menuDesplegable");
  let boton = document.getElementById("btnHamburguesa");

  if (menuMovilAbierto == false) {
    menu.className = "menu-desplegable abierto";
    boton.innerText = "✕";
    menuMovilAbierto = true;
  } else {
    menu.className = "menu-desplegable";
    boton.innerText = "☰";
    menuMovilAbierto = false;
  }
}

let indiceHistoria = 0;
let indiceServicios = 0;
let indicePdlv = 0;

function mostrarSlideCarrusel(prefijoId, indiceActivo, idContador) {
  for (let i = 0; i < 4; i++) {
    let slide = document.getElementById(prefijoId + i);
    if (i == indiceActivo) {
      slide.className = "slide-carrusel activo-movil";
    } else {
      slide.className = "slide-carrusel oculto-movil";
    }
  }
  document.getElementById(idContador).innerText = (indiceActivo + 1) + " / 4";
}

function cambiarSlideHistoria(paso) {
  indiceHistoria = indiceHistoria + paso;
  if (indiceHistoria > 3) {
    indiceHistoria = 0;
  } else if (indiceHistoria < 0) {
    indiceHistoria = 3;
  }
  mostrarSlideCarrusel("slideHistoria", indiceHistoria, "contadorCarruselHistoria");
}

function cambiarSlideServicios(paso) {
  indiceServicios = indiceServicios + paso;
  if (indiceServicios > 3) {
    indiceServicios = 0;
  } else if (indiceServicios < 0) {
    indiceServicios = 3;
  }
  mostrarSlideCarrusel("slideServicios", indiceServicios, "contadorCarruselServicios");
}

function cambiarSlidePdlv(paso) {
  indicePdlv = indicePdlv + paso;
  if (indicePdlv > 3) {
    indicePdlv = 0;
  } else if (indicePdlv < 0) {
    indicePdlv = 3;
  }
  mostrarSlideCarrusel("slidePdlv", indicePdlv, "contadorCarruselPdlv");
}
