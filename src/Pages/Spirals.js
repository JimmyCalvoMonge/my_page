import React, { Fragment } from 'react';
//import './Spirals.css';

class Spirals extends React.Component {

    constructor(props) {
      super(props);
      this.paint = this.paint.bind(this);
      this.canvasRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.paint();
    }

    //Self-explanatory.
    isPrime(num) {
      for(var i = 2; i < num; i++)
        if(num % i === 0) return false;
      return num > 1;
    }

    //Función para dibujar una espiral de Sacks.
    draw_sacks_spiral(width,height,context,intercept,color,index,index_start,mult,defase,orientation){

      context.strokeStyle = color;
      context.lineWidth = 2;
      context.beginPath();

      let ind_srt = index-index_start+defase;
      let ind_end = ind_srt+1;

      if (orientation==="east"){
        ind_srt= Math.pow(ind_srt,2)+ ind_srt +intercept;
        ind_end= Math.pow(ind_end,2)+ ind_end +intercept;
      } else {
        ind_srt= Math.pow(ind_srt,2)+intercept;
        ind_end= Math.pow(ind_end,2)+intercept;
      }

      let x_coord_start=Math.sqrt(ind_srt)*Math.cos(2*Math.PI*Math.sqrt(ind_srt));
      let y_coord_start=Math.sqrt(ind_srt)*Math.sin(2*Math.PI*Math.sqrt(ind_srt));
      let x_coord_end=Math.sqrt(ind_end)*Math.cos(2*Math.PI*Math.sqrt(ind_end));
      let y_coord_end=Math.sqrt(ind_end)*Math.sin(2*Math.PI*Math.sqrt(ind_end));

      context.moveTo(width*0.5  + mult*x_coord_start,
        height*0.5- mult*y_coord_start);
      context.lineTo(width*0.5  + mult*x_coord_end,
        height*0.5- mult*y_coord_end);
      context.stroke();

    }

    //Función para pintar la animación.
    paint() {

      const {index, spiral_name } = this.props;
      
      //Creamos canvas context//
      const canvas = this.canvasRef.current;
      const context = canvas.getContext("2d");
      const width=canvas.width;
      const height=canvas.height;

      // La animación para eventualmente //
      if (index<10000){

        
        context.save();
        context.beginPath();

        //Si el índice es -1 quiere decir que hemos iniciado con una nueva animación.
        //Así que limpiamos el rectángulo entero.
        if(index===-1){
          context.clearRect(0, 0, width, height);
        }

        // Dibujar la espiral de Sacks //
        if(spiral_name==="Sacks"){

          let x_coord=Math.sqrt(index)*Math.cos(2*Math.PI*Math.sqrt(index));
          let y_coord=Math.sqrt(index)*Math.sin(2*Math.PI*Math.sqrt(index));
          let mult =7; // Multiplicador para separar los puntos para que se vean mejor.

          //Compuesto por Defecto.
          let color_bolita = '#636363';
          let radio_bolita = 2;
          //Cambiar colores si el indice es primo.
          if(this.isPrime(index)){
            color_bolita='#E49A28';
            radio_bolita=5;
          }

          context.arc(
            width*0.5  + mult*x_coord,
            height*0.5 - mult*y_coord,
            radio_bolita, 0, 2 * Math.PI, false
          );

          context.fillStyle = color_bolita;
          context.fill();
          context.lineWidth = 2;
          context.strokeStyle = color_bolita;
          context.stroke();
          context.save();

          //Dibujar espirales de Sacks:
          // Empezamos a dibujarlas después de cierto tiempo.
          //Primer dibujo.
          let index_start1=250;
          if(index>index_start1){
            //n^2+n+41
            this.draw_sacks_spiral(width,height,context,41,'#91E223',index,index_start1,1.5,6,"west");
            //n^2+n+67
            this.draw_sacks_spiral(width,height,context,67,'#D92CEE',index,index_start1,1.5,7,"west");
            // n^2+n+89
            this.draw_sacks_spiral(width,height,context,89,'#E77243',index,index_start1,1.5,11,"west");
          }
          //Segundo dibujo. Después de un tiempo dibujamos las espirales en el otro sentido. :)
          let index_start2=500;
          if(index>index_start2){
            //n^2+n-41
            this.draw_sacks_spiral(width,height,context,41,'#3499C8',index,index_start2,1.5,6,"east");
            //n^2+n-67
            this.draw_sacks_spiral(width,height,context,67,'#EC1A56',index,index_start2,1.5,7,"east");
            // n^2+n-89
            this.draw_sacks_spiral(width,height,context,89,'#F3B80C',index,index_start2,1.5,11,"east");
          }

        }

        // Dibujar la espiral de Ulam //
        if(spiral_name==="Ulam"){

          /*
          Fórmula para la espiral de Ulam:
          https://math.stackexchange.com/questions/4199847/finding-the-formula-for-the-ulam-spiral-starting-with-0-as-a-bijective-functio
          */
          let mult = 10;
          let K = Math.ceil(0.5*(Math.sqrt(index)-1));
          let d = Math.pow(2*K+1,2) - index;

          //Coordenadas x,y para el punto a dibujar de acuerdo al índice.
          let x_coord=0;
          let y_coord=0;

          // Creación de las coordenadas.

          if (d<=2*K+1){
            x_coord=-K;
            y_coord=K+1-d;
          } else if (d<=4*K+1){
            x_coord=-3*K-1+d;
            y_coord=-K;
          } else if (d<6*K+1){
            x_coord=K;
            y_coord=-5*K-1+d;
          } else {
            x_coord=7*K+1-d;
            y_coord=K;
          };

          //Compuesto por Defecto.
          let color_bolita = '#636363';
          let radio_bolita = 2;
          //Cambiar colores si el indice es primo.
          if(this.isPrime(index)){
            color_bolita='#E49A28';
            radio_bolita=5;
          }

          context.arc(
            width*0.5  + mult*x_coord,
            height*0.4- mult*y_coord,
            radio_bolita, 0, 2 * Math.PI, false
          );

          context.fillStyle = color_bolita;
          context.fill();
          context.lineWidth = 2;
          context.strokeStyle = color_bolita;
          context.stroke();
          context.save();
        }
      };
    }
    
    render() {

      let size = 750;
      let scale = window.devicePixelRatio;
      let ww = window.innerWidth;
      if(ww<400){
        size=400;
      }

      return (
        <div>
        <div className="canvas_container">
        <canvas
          ref={this.canvasRef}
          width={size*scale}
          height={size*scale}
        />
        </div>
        </div>
      );
    }
  }

  export default Spirals;