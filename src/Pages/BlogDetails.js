import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom';

const BlogDetails = () => {
    
    const { id } = useParams();
    const jsonData = require('../data/BlogData.json');
    const thisData = jsonData.filter((element)=>element.id === id);

    return (  
        <div className="blog-details">
        <h1>{thisData[0].title}</h1>
        <Link to="/blogs"> Back to Blogs</Link>
        <hr></hr>
        {thisData && <p>{thisData[0].content}</p>
        }
        </div>
    );
}
 
export default BlogDetails;

