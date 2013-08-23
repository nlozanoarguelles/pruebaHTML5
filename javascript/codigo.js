$(function(){
        var $letra = $("#letra"),$puntuacion=$("#puntuacion"),puntos=0;
          var lrc;
          var texto_actual,array_texto,letra_actual;
        
          var loadLrc = function(url){
            
            lrc && lrc.stop();
            showTimer.stop();
            
            $.ajax(url).done(function(txt){
              lrc = parse(txt)
            })
          };
          
          var showTimer = (function(){
            var timeStamp, timer
              , state, curTime
              ;
            var fn = function(time){
              time = time || 0;
              timeStamp = Date.now() - time;
              show(time);
            };
            
            fn.pause = function(){
              state ? fn.stop() : fn(curTime);
            };
            
            fn.stop = function(){
              clearTimeout(timer);
              state = false;
            };
            
            fn.seek = function(offset){
              timeStamp -= offset;
              if(!state) curTime += offset;
            };
            
            function show(time){
              var curTime = time;
              clearTimeout(timer);
              timer = setTimeout(function(){
                show(Date.now() - timeStamp);
              }, 10);
              state = true;
            }
            return fn;
          })();
          
          var parse = function (txt){
            return new Lrc(txt, function(text, extra){

              if(!text){ return }
              var lrcs = this.lrc.split('\n');
            texto_actual = lrcs[extra.originLineNum].substring(lrcs[extra.originLineNum].indexOf("]")+1,lrcs[extra.originLineNum].length);

            texto_actual=texto_actual.toUpperCase();
            array_texto=texto_actual.split('');
            letra_actual=0;
              var span = $("<span>").text(texto_actual).hide();
              $letra.empty().append(span.fadeIn('slow'));
              
            });
          };

          var jugando=false;
          var elemento,canvas;

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
          var cancion_seleccionada="";
          elemento.addEventListener('click',function(event){
            var x = event.pageX - elemento.offsetLeft,
                y = event.pageY - elemento.offsetTop;

            if(!jugando){
              if (y > 70  && y < 95 
                      && x > 150 && x < 535) {
                  cancion_seleccionada="caminante_no_hay_camino";
                      loadLrc("recursos/caminante_no_hay_camino.lrc");
                      jugando=true;
                  }else if (y > 170  && y < 195 
                      && x > 150 && x < 405) {
                  cancion_seleccionada="veneno_en_la_piel";
                      loadLrc("recursos/veneno_en_la_piel.lrc");
                      jugando=true;
                  }else if (y > 270  && y < 295 
                      && x > 150 && x < 470) {
                  cancion_seleccionada="voy_a_pasarlo_bien";
                      loadLrc("recursos/voy_a_pasarlo_bien.lrc");
                      jugando=true;         
              }
              if(jugando){
                elemento.width=elemento.width;
                canvas.font=" bold 50px verdana, sans-serif";
                canvas.fillStyle="white";
                canvas.fillText("EMPEZAR",200,200);
              }
            }else{
              if (y > 150  && y < 205 
                      && x > 190 && x < 405){
                elemento.width=elemento.width;
                lrc.play(0);
                  showTimer(0);
                 dancer
                .waveform( elemento)
                .load(document.getElementById(cancion_seleccionada));
                dancer.play();
                var span = $("<span>").text("Puntuación: "+puntos).hide();
                  $puntuacion.empty().append(span.show());
              }
            }
          },false);
        }
         Dancer.setOptions({
            flashSWF : 'lib/soundmanager2.swf',
            flashJS  : 'lib/soundmanager2.js'
        });
        var dancer=new Dancer();
        addEventListener("load",iniciar);
        addEventListener('keypress', function(event) {
          if(jugando){
            if(array_texto[letra_actual]==String.fromCharCode(event.keyCode).toUpperCase()){
              letra_actual++;
              puntos++;
              var span = $("<span>").text("Puntuación: "+puntos).hide();
                  $puntuacion.empty().append(span.show());
              var escrita="",no_escrita="";
              for(var i=0; i<array_texto.length;i++){
                if(i<letra_actual){
                  escrita+=array_texto[i];
                }else{
                  no_escrita+=array_texto[i];
                }

              }
              var span_si = $("<span style=color:#FD7400>").text(escrita).hide();
              $letra.empty().append(span_si.show());
              var span_no = $("<span>").text(no_escrita).hide();
                  $letra.append(span_no.show());
            }

          }

            }, false);


        })          
        