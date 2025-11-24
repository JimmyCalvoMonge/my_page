import styled from "styled-components";

//Images for each notes pdf
import ecdif from '../assets/ecdif.jpg';
import algabs from '../assets/algabs.jpg';
import ma0250 from '../assets/ma0250.jpg';
import zahlen from '../assets/zahlen.png';

//List of pdfs for each notes.
const images= [ecdif, algabs, ma0250, zahlen]

const Card1 = styled.div`
  border-radius: 5px;
  border: 1px solid;
  border-color:white;
  backdrop-filter: blur(50px);
  text-align:center;
  margin:auto;
  & h5 {
    text-align:center;
    color: white;
    z-index:2;
  }
  & img {
    padding-top:5%;
    border-radius: 2%;
    width: 50%;
  }
`;

const NotesList = ({blogs,title}) =>{

  const blogs_ids = [];

  blogs.map((blog)=>(
    blogs_ids.push(parseInt(blog.id))
    ));

    return (
        <div>
        <h1>{title}</h1>
        <br></br>
        <hr></hr>
        <h4>Material I have writen for a few courses I gave at the School of Mathematics of 
        the University of Costa Rica. Material is in Spanish.
        </h4>
        <hr></hr>
        <br></br>

        <div className="row">
        {blogs.map((blog)=>(
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12" key={blog.id}>
              <Card1>
                <img src={images[parseInt(blog.id)-1]}/>
                <br></br>
                <a href={blog.link} target={'_blank'}> Access pdf </a>
              </Card1>

              <h3>{blog.title}</h3>
              <br></br>
              <p>{blog.summary}</p>

            </div>
        ))}
        </div>
        </div>
    )
}

export default NotesList;
