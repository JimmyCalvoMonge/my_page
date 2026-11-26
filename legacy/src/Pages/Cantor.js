// Clase de Objeto Cantor.

class Cantor {
    constructor(begin_x, begin_y, end_x, end_y, context) {

        this.begin_x = begin_x;
        this.begin_y = begin_y;
        
        this.end_x = end_x;
        this.end_y = end_y;

        this.mid1_x = this.begin_x + (this.end_x - this.begin_x) * (1 / 3);
        this.mid1_y = this.begin_y + (this.end_y - this.begin_y) / 2;

        this.mid2_x = this.begin_x + (this.end_x - this.begin_x) * (2 / 3)
        this.mid2_y = this.begin_y + (this.end_y - this.begin_y) / 2;

        this.finished=false;
    }
}

  export default Cantor;