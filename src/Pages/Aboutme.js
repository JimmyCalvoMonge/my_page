import profilepic from '../assets/me.jpg';
import React from "react";

// Import download component and pdf with my cv
import Download from './Download';
import My_CV from '../documents/CV_Jimmy_Calvo_Monge.pdf';

class Aboutme extends React.Component {
  
    render() {

      return (
        <div className="aboutme">
        <h1>Hi!</h1>

        <img src={profilepic}></img>

        <hr></hr>
        <p>My name is Jimmy Calvo-Monge. I studied pure mathematics at the University of Costa Rica (UCR),
        ending with a masters degree in Algebraic Geometry. There I was a full time professor for three years.
        Now I'm working as a statistician and data scientist at Intel. I obtained a
        <a href="http://www.posgradomatematica.ucr.ac.cr/index.php/oferta-academica/maestria-profesional-en-metodos-matematicos-y-aplicaciones"> Masters degree in applied mathematical methods</a>,
        at UCR and another master program in Full Stack Web Development at 
        <a href="https://www.threepoints.com/es/">Three Points Business School</a>.        
        </p>

        <p>
        Since I graduated from Maths I wrote several math material as class notes, blogs, and books. So, I decided to create 
        this webpage to upload all this information for students, teachers or anyone interested!
        I have worked as a Data Scientist for Intel and now I work as a Data Engineer for Hakkoda.
        I dream about continue my learning and professional journey and move on to new exciting places!
        </p>

        <p>
          Email: <a href="mailto:jimjocamon94@gmail.com">jimjocamon94@gmail.com</a>
        </p>
        <p>
          Github: <a href="https://github.com/JimmyCalvoMonge"> JimmyCalvoMonge</a>
        </p>
        <p>
          Linkedin: <a href="https://www.linkedin.com/in/jimmy-calvo-monge-367636208/">Jimmy Calvo Monge</a>
        </p>
        <hr></hr>

        <Download Pdf={My_CV} Message={"Download CV"}></Download>
        </div>
        );
    }
  }
  
export default Aboutme;