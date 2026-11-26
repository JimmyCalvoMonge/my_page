const BlogList = ({blogs,title,description}) =>{
    return (
        <div className="blog-list">
        <h1>{title}</h1>
        <p>{description}</p>
        <br></br>
        <hr></hr>
        <br></br>
        <div className="blog-grid">
        {blogs.map((blog)=>(
            <div className="blog-card" key={blog.id}>
            <div className="blog-image-container">
                <img src={blog.image} alt={blog.title} className="blog-image" />
            </div>
            <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-date">Date: {blog.date}</p>
                <p className="blog-summary">{blog.summary}</p>
                <a href={`${blog.link}`} target={'_blank'} rel="noreferrer" className="blog-link">
                    Read More →
                </a>
            </div>
            </div>
        ))}
        </div>
        </div>
    )
}
export default BlogList;