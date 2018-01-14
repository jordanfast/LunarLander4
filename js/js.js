var y = 10; // altura inicial y0=10%, debe leerse del css
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
var fuel = 100;
var activo = true;


window.onload = function(){
    document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	document.getElementById("hidem").onclick = function () {
	document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//Empezar a mover nave
	start();
  if (y > 0){

  document.onkeydown = motorOn;
  document.onkeyup = motorOff;
}
}



function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}


function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=Math.round(v);
	y +=v*dt;
	document.getElementById("altura").innerHTML=Math.round(80-y);

	//mover hasta que top sea un 70% de la pantalla
	if (y<80){
		document.getElementById("nave").style.top = y+"%";
	} else {
    if (v>=5){
      explosion();
      activo = false;
      document.getElementById('loose').style.display = 'inline-block';
      window.setTimeout(function(){ document.location.reload(true); }, 10000);


      stop();
    } else aterrizado();

  if (fuel == 0){
    activo = false;
    timerFuel = null;
    stop();
  }
	}
}

function motorOn (){
  if (activo == true){
  a = -g;
  document.getElementById("imgNave").src = "img/cohete2.png";
  if (timerFuel == null)
      timerFuel = setInterval(function() {
        actualizar();
      },100);
if (fuel <= 0 ){
  motorOff();
  document.getElementById("fuel").innerHTML = 0;
}
}
}

function motorOff (){
  if (activo == true){
  a = g;
  document.getElementById("imgNave").src = "img/cohete.png";
  clearInterval(timerFuel);
  timerFuel = null;
}
}

function actualizar(){
  fuel -= 1;
  document.getElementById("fuel").innerHTML = fuel;
}

function aterrizado(){
  motorOff();
  stop();
  activo = false;
  document.getElementById('win').style.display = 'inline-block';
}

function explosion(){
  document.getElementById("imgNave").src = "img/explosion.gif";
  stop();
}


function pausar(){
  motorOff();
  clearInterval(timerFuel);
  timerFuel = null;
  activo = false;
  stop();
  document.getElementById("pausa").style.display = 'none';
  document.getElementById("reanudar").style.display = 'inline-block';
}

function play(){
  activo = true;
  start();
  document.getElementById("pausa").style.display = 'inline-block';
  document.getElementById("reanudar").style.display = 'none';
}

function reload(){
  location.reload(true);
}
