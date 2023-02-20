//Clase de Objeto No Monotonica (Función nunca monotónica).

class NoMonotonica {

    constructor(begin_x, begin_y, end_x, end_y, context) {
        
        this.begin_x = begin_x;
        this.begin_y = begin_y;
        
        this.end_x = end_x;
        this.end_y = end_y;

        let a = (this.end_y-this.begin_y)/Math.abs(this.end_y-this.begin_y);
        let b = Math.abs(this.end_y-this.begin_y);

        this.mid1_x = this.begin_x + (this.end_x - this.begin_x) * (1 / 3);
        this.mid1_y = this.begin_y + (3/4)*a*b;

        this.mid2_x= this.begin_x + (this.end_x - this.begin_x) * (2/ 3);
        this.mid2_y=this.begin_y + (1/4)*a*b;
    }
}

  export default NoMonotonica;