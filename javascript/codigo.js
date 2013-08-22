var canvas
var elemento

function iniciar(){  
  elemento=document.getElementById('canvas');
  canvas=elemento.getContext('2d');
  canvas.font=" bold 35px verdana, sans-serif";
  canvas.fillStyle="black";
  canvas.textAlign="start";
  canvas.fillText("Selecciona una canción:",20,30);
  canvas.font=" bold 30px verdana, sans-serif";
  canvas.fillStyle="white";
  canvas.textBaseline="bottom";
  canvas.fillText("Caminante no hay camino",160,100);
  canvas.fillText("Veneno en la piel",160,200);
  canvas.fillText("Voy a pasarmelo bien",160,300);
  elemento.addEventListener('click',function(event){
    var x = event.pageX - elemento.offsetLeft,
        y = event.pageY - elemento.offsetTop;

    if (y > 70  && y < 95 
            && x > 150 && x < 535) {
            document.getElementById('letra').innerText="Caminante no hay camino";
            document.getElementById('caminante_no_hay_camino').play();
        }

    if (y > 170  && y < 195 
            && x > 150 && x < 405) {
            alert('Veneno en la piel');
            document.getElementById('veneno_en_la_piel').play();
        }

    if (y > 270  && y < 295 
            && x > 150 && x < 470) {
            alert('Voy a pasarmelo bien');
            document.getElementById('voy_a_pasarlo_bien').play();
        }


    //elemento.width=elemento.width;


  },false);
}
addEventListener("load",iniciar);

