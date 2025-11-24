import React, { Fragment } from 'react';
import Cantor from './Cantor';
import NoMonotonica from './NoMonotonica';
import KochPure from './KochPure';

class Fractal extends React.Component {

    constructor(props) {
      super(props);
      this.paint = this.paint.bind(this);
      this.canvasRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.paint();
    }

    //Función para pintar la animación de fractales.
    paint() {

      const { index, fractal_name} = this.props;

      //Creamos canvas context//
      const canvas = this.canvasRef.current;
      const context = canvas.getContext("2d");
      const width=canvas.width;
      const height=canvas.height;

      //If index equals -1 that means that we have started
      //a new animation (new fractal) so we clean the entire 
      //rectangle.
      if(index===-1){
        context.clearRect(0, 0, width, height);
      }

      // This is to refresh the animation periodically
      let phase = 100;
      let index_defased=index % phase;

      if ((index_defased===0) & (index>-1)){
        context.clearRect(0, 0, width, height);
      } else {

        let ww= window.innerWidth;

        let lw_cantor=10;
        if(ww<400){
          lw_cantor=5;
        }

        let lw_non_mono=5;
        if(ww<400){
          lw_non_mono=1;
        }

        if (fractal_name==="Cantor"){

          // Draw Cantor Function //

          let cantor = [];
          cantor[0]= new Cantor(0,height,width,0);

          //Agregar todos los objetos de esta clase.
          for(var i = 0;i<=index_defased;i++){
            let rightc = new Cantor(cantor[i].begin_x, cantor[i].begin_y,
              cantor[i].mid1_x, cantor[i].mid1_y);
            let leftc = new Cantor(cantor[i].mid2_x, cantor[i].mid2_y,
              cantor[i].end_x, cantor[i].end_y);
              cantor.push(rightc);
              cantor.push(leftc);
          }

          //Dibujarlos
          for(var i =0; i< cantor.length;i++){
            context.strokeStyle = '#12A135';
            context.lineWidth = lw_cantor;
    
            //Solo Dibujamos la parte plana de la función de Cantor.
            context.beginPath();
            context.moveTo(cantor[i].mid1_x, cantor[i].mid1_y);
            context.lineTo(cantor[i].mid2_x, cantor[i].mid2_y);
            context.stroke();
          }
          context.save();

        }

        if (fractal_name==="Non-Monotonic"){

          let nomonotonica = [];
          nomonotonica[0]= new NoMonotonica(0,height,width,0);

          //Agregar todos los objetos de esta clase.
          for(var i = 0;i<=index_defased;i++){

            if(!nomonotonica[i].finished){
              let rightmono = new NoMonotonica(nomonotonica[i].begin_x, nomonotonica[i].begin_y,
                nomonotonica[i].mid1_x, nomonotonica[i].mid1_y);
              
              let centermono = new NoMonotonica(nomonotonica[i].mid1_x, nomonotonica[i].mid1_y,
                  nomonotonica[i].mid2_x, nomonotonica[i].mid2_y);

              let leftmono = new NoMonotonica(nomonotonica[i].mid2_x, nomonotonica[i].mid2_y,
                nomonotonica[i].end_x, nomonotonica[i].end_y);

              nomonotonica.push(rightmono);
              nomonotonica.push(centermono);
              nomonotonica.push(leftmono);
            }

            nomonotonica[i].finished=true;

          }

          //Dibujarlos.
          for(var i =1; i< nomonotonica.length;i++){

            context.strokeStyle = '#0C0908';
            context.lineWidth =1;
            
            //Dibujamos las porciones de la función no monotónica.
            context.beginPath();
            context.moveTo(nomonotonica[i-1].begin_x, nomonotonica[i-1].begin_y);
            context.lineTo(nomonotonica[i-1].end_x, nomonotonica[i-1].end_y);
            context.stroke();


            context.strokeStyle = '#DA6739';
            context.lineWidth =lw_non_mono;
            
            //Dibujamos las porciones de la función no monotónica.
            context.beginPath();
            context.moveTo(nomonotonica[i].begin_x, nomonotonica[i].begin_y);
            context.lineTo(nomonotonica[i].mid1_x, nomonotonica[i].mid1_y);
            context.stroke();

            context.beginPath();
            context.moveTo(nomonotonica[i].mid1_x, nomonotonica[i].mid1_y);
            context.lineTo(nomonotonica[i].mid2_x, nomonotonica[i].mid2_y);
            context.stroke();

            context.beginPath();
            context.moveTo(nomonotonica[i].mid2_x, nomonotonica[i].mid2_y);
            context.lineTo(nomonotonica[i].end_x, nomonotonica[i].end_y);
            context.stroke();

          }
          context.save();

        }
        
        if (fractal_name==="Koch-Pure"){

          let kochpure = [];
          kochpure[0]= new KochPure(0,height*0.75,width,height*0.75);

          //Agregar todos los objetos de esta clase.
          for(var i = 0;i<=index_defased;i++){

            if(!kochpure[i].finished){

              let rightkoch = new KochPure(kochpure[i].begin_x, kochpure[i].begin_y,
                kochpure[i].mid1_x, kochpure[i].mid1_y);
              
              let centerkoch_1 = new KochPure(kochpure[i].mid1_x, kochpure[i].mid1_y,
                  kochpure[i].mid2_x, kochpure[i].mid2_y);

              let centerkoch_2 = new KochPure(kochpure[i].mid2_x, kochpure[i].mid2_y,
                kochpure[i].mid3_x, kochpure[i].mid3_y);

              let leftkoch = new KochPure(kochpure[i].mid3_x, kochpure[i].mid3_y,
                kochpure[i].end_x, kochpure[i].end_y);

              kochpure.push(rightkoch);
              kochpure.push(centerkoch_1);
              kochpure.push(centerkoch_2);
              kochpure.push(leftkoch);
            }

            kochpure[i].finished=true;

          }

          //Dibujarlos.
          for(var i =1; i< kochpure.length;i++){

            context.strokeStyle = '#2A94D9';
            context.lineWidth =lw_non_mono;
            
            //Dibujamos las porciones de la función de Koch
            context.beginPath();
            context.moveTo(kochpure[i].begin_x, kochpure[i].begin_y);
            context.lineTo(kochpure[i].mid1_x, kochpure[i].mid1_y);
            context.stroke();

            context.beginPath();
            context.moveTo(kochpure[i].mid1_x, kochpure[i].mid1_y);
            context.lineTo(kochpure[i].mid2_x, kochpure[i].mid2_y);
            context.stroke();

            context.beginPath();
            context.moveTo(kochpure[i].mid2_x, kochpure[i].mid2_y);
            context.lineTo(kochpure[i].mid3_x, kochpure[i].mid3_y);
            context.stroke();

            context.beginPath();
            context.moveTo(kochpure[i].mid3_x, kochpure[i].mid3_y);
            context.lineTo(kochpure[i].end_x, kochpure[i].end_y);
            context.stroke();

          }
          context.save();

        }

      }
    }
  
    render() {

      let size = 2050;
      let scale = window.devicePixelRatio;
      let ww = window.innerWidth;
      let mult=0.65
      if(ww<400){
        size=400;
        mult=1;
      }

      return (
        <div className="Fractal">
          <div className="canvas_container">
          <canvas
            ref={this.canvasRef}
            width={size*scale}
            height={size*scale*mult}
          />
          </div>
        </div>
      );
    }
  }

  export default Fractal;