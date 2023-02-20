import React from "react";
import {Link} from 'react-router-dom';

// Import number spirals //
import Spirals from './Spirals';

class Home extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = { index :-1, 
      spiral_name: 'Sacks', 
      reference:"canvas", 
      spirals:["Sacks","Ulam"],
      };
      this.textInput = React.createRef();
      this.tick = this.tick.bind(this);
    }

    setSpiralName = () => {
      const number_spirals=this.state.spirals.length;
      const this_index = this.state.spirals.indexOf(this.state.spiral_name);
      const new_index = (this_index+1)%number_spirals;
      this.setState({spiral_name:this.state.spirals[new_index]});
      this.setState({index:-1});
    }
  
    componentDidMount() {
      requestAnimationFrame(this.tick);
    }
  
    tick() {
      const new_index = this.state.index+1;
      this.setState({ index:new_index });
      setTimeout(() => {requestAnimationFrame(this.tick)}, 10);
    }
  
    render() {

      return (
        <div className="Home">

          <div className="row mx-auto">

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6 col-start">

              <h1>Hey there! </h1>
              <h2>I'm Jimmy</h2>

              <p>Welcome to my personal webpage. Here I upload mathematics material 
                and some blogs about things I enjoy!
              </p>

              <hr></hr>

              <div className="class1">

              <a href="/aboutme"><p>About me ... </p></a>
              <a href="/notes"><p>Class Notes</p></a>
              <a href="/blogs"><p>Blogs</p></a>
              <a href="/funfractals"><p>Fun with fractals!</p></a>

              </div>

              <div className="class1">
                <button onClick={this.setSpiralName} type="button" className="btn btn-dark">
                Change the spiral
                </button>
              </div>  

            </div>


            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-6 col-xs-6 col-right">

              <Link to="/blogs/spirals">
                <Spirals index={this.state.index} spiral_name={this.state.spiral_name} />
              </Link>

            </div>

          </div>

        </div>
        );
    }
  }
  
export default Home;