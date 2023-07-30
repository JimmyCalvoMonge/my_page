import React from "react";

// Import Fractals Widget Component
import Fractal from './Fractal';

class FunFractals extends React.Component {

    constructor(props) {
      
        super(props);
        this.state = { index :-1, 
        fractal_name: "Cantor",
        explanations: [`In 1884 Georg Cantor introduced this particular function, which 
        provides a lot of counterexamples in real analysis. The importance of this function
        is that it is one of the first examples that shows us that some of our intuitions on 
        continuous functions might be wrong. Read more info in the article below.`,
        `This is a rather simple, but powerful, example of a function that is NOT Mononotic in ANY
        subinterval of it's domain. Naturally, to have such an example we must seek fractals and limits
        for help. Check out the article below for details on how to build this function.`,
        `Koch's snowflake is a quintessential example of a fractal 2d curve. It's used in many examples in this
        field and has many interesting qualities, besides it looks really cute. A peculiar fact of this curve is that
        it has an INFINITE length, this despite the fact that it covers a finite region of space.`],
        explanation_name: `In 1884 Georg Cantor introduced this particular function, which 
        provides a lot of counterexamples in real analysis. The importance of this function
        is that it is one of the first examples that shows us that some of our intuitions on 
        continuous functions might be wrong. Read more info in the article below.`,
        reference:"canvas", 
        fractals:["Cantor","Non-Monotonic","Koch-Pure"],
        };
        this.textInput = React.createRef();
        this.tick = this.tick.bind(this);
      }
  
      setFractalName_Forward = () => {
        const number_fractals=this.state.fractals.length;
        const this_index = this.state.fractals.indexOf(this.state.fractal_name);
        const new_index = (this_index+1)%number_fractals;

        //Change Fractal Name
        this.setState({fractal_name:this.state.fractals[new_index]});

        //Change Fractal Description
        this.setState({explanation_name:this.state.explanations[new_index]});

        this.setState({index:-1});
      }

      setFractalName_Backward = () => {
        const number_fractals=this.state.fractals.length;
        let this_index = this.state.fractals.indexOf(this.state.fractal_name);

        // Be careful with invalid index 
        let new_index=0
        if(this_index===0){
          new_index=number_fractals-1;
        }else{
          new_index = (this_index-1)%number_fractals;
        }

        //Change Fractal Name
        this.setState({fractal_name:this.state.fractals[new_index]});

        //Change Fractal Description
        this.setState({explanation_name:this.state.explanations[new_index]});

        this.setState({index:-1});
      }
    
      componentDidMount() {
        requestAnimationFrame(this.tick);
      }
    
      tick() {
        const new_index = this.state.index+1;
        this.setState({ index:new_index });
        setTimeout(() => {requestAnimationFrame(this.tick)}, 200);
      }
  
    render() {

      const wh= window.innerWidth;
      let mult=0.7;
      if(wh>700){
        mult=0.35;
      }

      return (
        <div className="aboutme">
        <h1>Fun with Fractals!</h1>

        <hr></hr>
        <p>This little fractals widget contains some visualizations on fractal functions.</p>
        <hr></hr>

        <Fractal
            index={this.state.index}
            width={window.innerWidth*0.5}
            height={window.innerWidth*mult} 
            reference={this.state.reference}
            fractal_name={this.state.fractal_name}
            >
        </Fractal>

        <div className="flex-container">
          <div className="col-30">
          <button onClick={this.setFractalName_Backward}> &lt; &lt;</button>
          </div>
          <div className="col-30-a">
          <p>{this.state.fractal_name}</p>
          </div>
          <div className="col-30">
          <button onClick={this.setFractalName_Forward}> &gt; &gt;</button>
          </div>
        </div>

        <div className="explanation-container">
          <p>{this.state.explanation_name}</p>
        </div>

        <hr></hr>
        </div>
        );
    }
  }
  
export default FunFractals;