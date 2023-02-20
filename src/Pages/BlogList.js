const BlogList = ({blogs,title}) =>{

    return (
        <div className="blog-list">
        <h1>{title}</h1>
        <br></br>
        <hr></hr>
        <br></br>
        {blogs.map((blog)=>(
            <div className="blog-preview" key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.summary}</p>
            <br></br>
            <a href={`${blog.link}`} target={'_blank'}> Read this blog </a>
            <hr></hr>
            </div>
        ))}
        </div>
    )
}
export default BlogList;