import React from 'react';
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

    //Get description for each animation
    getAnimationDescription(name) {
      const descriptions = {
        'Sacks': 'Sacks Spiral - Prime numbers highlighted in a spiral pattern based on square roots',
        'Ulam': 'Ulam Spiral - Prime numbers arranged in a square spiral starting from the center',
        'Fourier': 'Fourier Series - Complex curves drawn by rotating circles (epicycles)',
        'Lissajous': 'Lissajous Curves - Parametric curves showing harmonic oscillation relationships',
        'Lorenz': 'Lorenz Attractor - The famous butterfly effect from chaos theory',
        'Mandelbrot': 'Mandelbrot Set - Zooming into the famous fractal boundary',
        'Barnsley': 'Barnsley Fern - A fractal created using iterated function systems',
        'Koch': 'Koch Snowflake - A fractal curve built by iteratively adding triangular bumps',
        'Cantor': "Cantor Function (Devil's Staircase) - A continuous but fractal monotonic function"
      };
      return descriptions[name] || 'Mathematical Animation';
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

        // Dibujar Fourier Series (Epicycles) //
        if(spiral_name==="Fourier"){
          const t = index * 0.01;
          const centerX = width * 0.5;
          const centerY = height * 0.5;

          // Define circles with different frequencies and amplitudes
          const circles = [
            { radius: 100, freq: 1, phase: 0 },
            { radius: 50, freq: 3, phase: Math.PI/4 },
            { radius: 30, freq: 5, phase: Math.PI/2 },
            { radius: 20, freq: 7, phase: Math.PI }
          ];

          let x = centerX;
          let y = centerY;

          // Draw the circles
          circles.forEach((circle, i) => {
            const prevX = x;
            const prevY = y;

            const angle = circle.freq * t + circle.phase;
            x += circle.radius * Math.cos(angle);
            y += circle.radius * Math.sin(angle);

            // Draw circle
            context.beginPath();
            context.arc(prevX, prevY, circle.radius, 0, 2 * Math.PI);
            context.strokeStyle = `rgba(${100 + i * 40}, ${150 - i * 20}, 255, 0.3)`;
            context.lineWidth = 1;
            context.stroke();

            // Draw line to next point
            context.beginPath();
            context.moveTo(prevX, prevY);
            context.lineTo(x, y);
            context.strokeStyle = '#FF6B6B';
            context.lineWidth = 2;
            context.stroke();
          });

          // Draw the final point
          context.beginPath();
          context.arc(x, y, 4, 0, 2 * Math.PI);
          context.fillStyle = '#FF6B6B';
          context.fill();

          // Store and draw the path
          if (!this.fourierPath) this.fourierPath = [];
          this.fourierPath.push({ x, y });

          if (this.fourierPath.length > 500) this.fourierPath.shift();

          context.beginPath();
          this.fourierPath.forEach((point, i) => {
            if (i === 0) context.moveTo(point.x, point.y);
            else context.lineTo(point.x, point.y);
          });
          context.strokeStyle = '#4ECDC4';
          context.lineWidth = 2;
          context.stroke();

          if (index === -1) this.fourierPath = [];
        }

        // Dibujar Lissajous Curves //
        if(spiral_name==="Lissajous"){
          const t = index * 0.02;
          const centerX = width * 0.5;
          const centerY = height * 0.5;

          // Lissajous parameters
          const A = 150;
          const B = 150;
          const a = 3;
          const b = 4;
          const delta = Math.PI / 2;

          const x = centerX + A * Math.sin(a * t + delta);
          const y = centerY + B * Math.sin(b * t);

          // Store and draw the path
          if (!this.lissajousPath) this.lissajousPath = [];
          this.lissajousPath.push({ x, y });

          if (this.lissajousPath.length > 1000) this.lissajousPath.shift();

          // Draw the curve with gradient color
          this.lissajousPath.forEach((point, i) => {
            if (i > 0) {
              const prevPoint = this.lissajousPath[i - 1];
              const hue = (i / this.lissajousPath.length) * 360;
              context.beginPath();
              context.moveTo(prevPoint.x, prevPoint.y);
              context.lineTo(point.x, point.y);
              context.strokeStyle = `hsl(${hue}, 70%, 60%)`;
              context.lineWidth = 2;
              context.stroke();
            }
          });

          // Draw current point
          context.beginPath();
          context.arc(x, y, 5, 0, 2 * Math.PI);
          context.fillStyle = '#FF6B6B';
          context.fill();

          if (index === -1) this.lissajousPath = [];
        }

        // Dibujar Lorenz Attractor //
        if(spiral_name==="Lorenz"){
          // Initialize Lorenz system state
          if (!this.lorenzState || index === -1) {
            this.lorenzState = { x: 0.1, y: 0, z: 0 };
            this.lorenzPath = [];
          }

          // Lorenz parameters
          const sigma = 10;
          const rho = 28;
          const beta = 8/3;
          const dt = 0.005;

          // Calculate derivatives
          const dx = sigma * (this.lorenzState.y - this.lorenzState.x) * dt;
          const dy = (this.lorenzState.x * (rho - this.lorenzState.z) - this.lorenzState.y) * dt;
          const dz = (this.lorenzState.x * this.lorenzState.y - beta * this.lorenzState.z) * dt;

          // Update state
          this.lorenzState.x += dx;
          this.lorenzState.y += dy;
          this.lorenzState.z += dz;

          // Project 3D to 2D
          const scale = 8;
          const centerX = width * 0.5;
          const centerY = height * 0.5;
          const x = centerX + this.lorenzState.x * scale;
          const y = centerY + this.lorenzState.z * scale - 200;

          // Store path
          this.lorenzPath.push({ x, y, z: this.lorenzState.z });

          if (this.lorenzPath.length > 3000) this.lorenzPath.shift();

          // Draw the attractor with color based on z-coordinate
          this.lorenzPath.forEach((point, i) => {
            if (i > 0) {
              const prevPoint = this.lorenzPath[i - 1];
              const hue = ((point.z + 30) / 60) * 240; // Blue to red based on height
              context.beginPath();
              context.moveTo(prevPoint.x, prevPoint.y);
              context.lineTo(point.x, point.y);
              context.strokeStyle = `hsl(${hue}, 80%, 60%)`;
              context.lineWidth = 1;
              context.stroke();
            }
          });
        }

        // Dibujar Mandelbrot Set //
        if(spiral_name==="Mandelbrot"){
          if (index === -1 || index % 50 === 0) {
            // Redraw every 50 frames for zoom effect
            const zoom = 1 + index * 0.003;
            const centerX_frac = -0.5;
            const centerY_frac = 0;
            const maxIter = 50;

            const pixelSize = 2; // Draw every 2 pixels for performance

            for (let px = 0; px < width; px += pixelSize) {
              for (let py = 0; py < height; py += pixelSize) {
                // Map pixel to complex plane
                const x0 = ((px - width/2) / (width/4)) / zoom + centerX_frac;
                const y0 = ((py - height/2) / (height/4)) / zoom + centerY_frac;

                let x = 0;
                let y = 0;
                let iteration = 0;

                // Mandelbrot iteration
                while (x*x + y*y <= 4 && iteration < maxIter) {
                  const xTemp = x*x - y*y + x0;
                  y = 2*x*y + y0;
                  x = xTemp;
                  iteration++;
                }

                // Color based on iteration count
                if (iteration === maxIter) {
                  context.fillStyle = '#000000';
                } else {
                  const hue = (iteration / maxIter) * 360;
                  context.fillStyle = `hsl(${hue}, 100%, 50%)`;
                }

                context.fillRect(px, py, pixelSize, pixelSize);
              }
            }
          }
        }

        // Dibujar Barnsley Fern //
        if(spiral_name==="Barnsley"){
          // Initialize fern state
          if (!this.fernState || index === -1) {
            this.fernState = { x: 0, y: 0 };
            this.fernPoints = [];
          }

          // Draw multiple points per frame for faster generation
          for (let i = 0; i < 10; i++) {
            const rand = Math.random();
            let nextX, nextY;

            // Apply one of four transformations based on probability
            if (rand < 0.01) {
              // Stem (1% probability)
              nextX = 0;
              nextY = 0.16 * this.fernState.y;
            } else if (rand < 0.86) {
              // Successively smaller leaflets (85% probability)
              nextX = 0.85 * this.fernState.x + 0.04 * this.fernState.y;
              nextY = -0.04 * this.fernState.x + 0.85 * this.fernState.y + 1.6;
            } else if (rand < 0.93) {
              // Largest left-hand leaflet (7% probability)
              nextX = 0.2 * this.fernState.x - 0.26 * this.fernState.y;
              nextY = 0.23 * this.fernState.x + 0.22 * this.fernState.y + 1.6;
            } else {
              // Largest right-hand leaflet (7% probability)
              nextX = -0.15 * this.fernState.x + 0.28 * this.fernState.y;
              nextY = 0.26 * this.fernState.x + 0.24 * this.fernState.y + 0.44;
            }

            this.fernState.x = nextX;
            this.fernState.y = nextY;

            // Store the point
            this.fernPoints.push({ x: nextX, y: nextY });
          }

          // Keep only recent points
          if (this.fernPoints.length > 10000) {
            this.fernPoints = this.fernPoints.slice(-10000);
          }

          // Draw all points
          const scale = 60;
          const centerX = width * 0.5;
          const centerY = height * 0.85;

          this.fernPoints.forEach((point, i) => {
            const px = centerX + point.x * scale;
            const py = centerY - point.y * scale;

            // Color gradient based on age of point
            const alpha = Math.min(1, (i / this.fernPoints.length) + 0.3);
            const hue = 120; // Green color for fern

            context.fillStyle = `hsla(${hue}, 70%, 40%, ${alpha})`;
            context.fillRect(px, py, 2, 2);
          });
        }

        // Dibujar Koch Snowflake //
        if(spiral_name==="Koch"){
          // Function to generate Koch curve from a line segment
          const kochSegment = (p1, p2) => {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;

            // Divide the line into 3 equal parts
            const p3 = { x: p1.x + dx/3, y: p1.y + dy/3 };
            const p5 = { x: p1.x + 2*dx/3, y: p1.y + 2*dy/3 };

            // Create the peak of the triangle (pointing OUTWARD)
            const angle = Math.atan2(dy, dx) + Math.PI/3;
            const length = Math.sqrt(dx*dx + dy*dy) / 3;
            const p4 = {
              x: p3.x + length * Math.cos(angle),
              y: p3.y + length * Math.sin(angle)
            };

            return [p1, p3, p4, p5, p2];
          };

          // Apply Koch transformation to all segments (including closing segment)
          const applyKoch = (points) => {
            const newPoints = [];
            for (let i = 0; i < points.length; i++) {
              const nextIndex = (i + 1) % points.length;
              const segment = kochSegment(points[i], points[nextIndex]);
              newPoints.push(...segment.slice(0, -1));
            }
            return newPoints;
          };

          // Draw the snowflake
          const drawSnowflake = (points, color, lineWidth) => {
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
              context.lineTo(points[i].x, points[i].y);
            }
            context.closePath();
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.stroke();
          };

          // Initialize with equilateral triangle (MUCH LARGER)
          if (!this.kochPoints || index === -1) {
            const size = 350;
            const centerX = width * 0.5;
            const centerY = height * 0.5;

            this.kochPoints = [
              { x: centerX, y: centerY - size * Math.sqrt(3)/3 },
              { x: centerX - size/2, y: centerY + size * Math.sqrt(3)/6 },
              { x: centerX + size/2, y: centerY + size * Math.sqrt(3)/6 }
            ];
            this.kochIteration = 0;
          }

          // Progress through iterations based on index
          const iterationSpeed = 150; // Frames per iteration
          const targetIteration = Math.min(5, Math.floor(index / iterationSpeed));

          if (targetIteration > this.kochIteration) {
            this.kochPoints = applyKoch(this.kochPoints);
            this.kochIteration = targetIteration;
          }

          // Draw with color gradient based on iteration
          const hue = (this.kochIteration / 5) * 240; // Blue to purple
          const color = `hsl(${180 + hue}, 70%, 50%)`;
          drawSnowflake(this.kochPoints, color, 2);
        }

        // Dibujar Cantor Function (Devil's Staircase) //
        if(spiral_name==="Cantor"){
          // Initialize Cantor function segments
          if (!this.cantorSegments || index === -1) {
            // Start with a single diagonal line from (0,0) to (1,1)
            this.cantorSegments = [
              { x1: 0, y1: 0, x2: 1, y2: 1 }
            ];
            this.cantorIteration = 0;
          }

          // Function to apply Cantor transformation to a segment
          const cantorTransform = (segments) => {
            const newSegments = [];
            segments.forEach(seg => {
              const dx = seg.x2 - seg.x1;
              const dy = seg.y2 - seg.y1;

              // First third: rising segment
              newSegments.push({
                x1: seg.x1,
                y1: seg.y1,
                x2: seg.x1 + dx/3,
                y2: seg.y1 + dy/2
              });

              // Middle third: horizontal plateau
              newSegments.push({
                x1: seg.x1 + dx/3,
                y1: seg.y1 + dy/2,
                x2: seg.x1 + 2*dx/3,
                y2: seg.y1 + dy/2
              });

              // Last third: rising segment
              newSegments.push({
                x1: seg.x1 + 2*dx/3,
                y1: seg.y1 + dy/2,
                x2: seg.x2,
                y2: seg.y2
              });
            });
            return newSegments;
          };

          // Draw the Cantor function
          const drawCantorFunction = (segments, color, lineWidth) => {
            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = lineWidth;

            segments.forEach((seg, i) => {
              if (i === 0) {
                context.moveTo(seg.x1, seg.y1);
              }
              context.lineTo(seg.x2, seg.y2);
            });

            context.stroke();
          };

          // Progress through iterations
          const iterationSpeed = 180;
          const targetIteration = Math.min(7, Math.floor(index / iterationSpeed));

          if (targetIteration > this.cantorIteration) {
            // Clear the canvas before drawing the next iteration
            context.clearRect(0, 0, width, height);
            this.cantorSegments = cantorTransform(this.cantorSegments);
            this.cantorIteration = targetIteration;
          }

          // Scale and position the function
          const margin = 80;
          const scale = Math.min(width - 2*margin, height - 2*margin);
          const offsetX = (width - scale) / 2;
          const offsetY = (height - scale) / 2;

          // Transform segments to canvas coordinates
          const canvasSegments = this.cantorSegments.map(seg => ({
            x1: offsetX + seg.x1 * scale,
            y1: offsetY + scale - seg.y1 * scale, // Flip y-axis
            x2: offsetX + seg.x2 * scale,
            y2: offsetY + scale - seg.y2 * scale
          }));

          // Draw axes
          context.strokeStyle = '#666666';
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(offsetX, offsetY + scale);
          context.lineTo(offsetX + scale, offsetY + scale);
          context.moveTo(offsetX, offsetY + scale);
          context.lineTo(offsetX, offsetY);
          context.stroke();

          // Draw the function with color gradient
          const hue = (this.cantorIteration / 7) * 180;
          const color = `hsl(${hue + 180}, 80%, 55%)`;
          drawCantorFunction(canvasSegments, color, 3);
        }
      };
    }
    
    render() {

      const { spiral_name } = this.props;
      let size = 750;
      let scale = window.devicePixelRatio;
      let ww = window.innerWidth;
      if(ww<400){
        size=400;
      }

      return (
        <div>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <em>{this.getAnimationDescription(spiral_name)}</em>
        </div>
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