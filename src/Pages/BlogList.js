const BlogList = ({blogs,title,description}) =>{
    return (
        <div className="blog-list">
        <h1>{title}</h1>
        <p>{description}</p>
        <br></br>
        <hr></hr>
        <br></br>
        {blogs.map((blog)=>(
            <div className="blog-preview" key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.summary}</p>
            <br></br>
            <a href={`${blog.link}`} target={'_blank'}> Read this blog </a>
            <p style={{'text-align': 'right'}}> Date: {blog.date}</p>
            <hr></hr>
            </div>
        ))}
        </div>
    )
}
export default BlogList;