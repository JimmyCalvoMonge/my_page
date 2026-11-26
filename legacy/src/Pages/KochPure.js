// Clase de Objeto KochPure

class KochPure {
    constructor(begin_x, begin_y, end_x, end_y, context) {

        this.begin_x = begin_x;
        this.begin_y = begin_y;
        
        this.end_x = end_x;
        this.end_y = end_y;

        this.mid1_x = this.begin_x + (this.end_x - this.begin_x) * (1 / 3);
        this.mid1_y = this.begin_y + (this.end_y - this.begin_y) * (1 / 3);

        this.mid3_x = this.begin_x + (this.end_x - this.begin_x) * (2 / 3);
        this.mid3_y = this.begin_y + (this.end_y - this.begin_y) * (2 / 3);

        let x_dif = this.mid3_x - this.mid1_x;
        let y_dif = this.mid3_y - this.mid1_y;

        this.mid2_x = this.mid1_x  + Math.cos(Math.PI*(-1/3))*x_dif - Math.sin(Math.PI*(-1/3))*y_dif;
        this.mid2_y = this.mid1_y  + Math.sin(Math.PI*(-1/3))*x_dif + Math.cos(Math.PI*(-1/3))*y_dif;
        

        this.finished=false;

    }
}

  export default KochPure;