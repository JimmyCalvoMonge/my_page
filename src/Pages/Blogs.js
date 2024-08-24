import BlogList from './BlogList';

const Blogs = () => {
    const data = require('../data/BlogData.json');
    return (
        <div className="List">
            {data && <BlogList blogs={data} title="Blogs about Math (mostly) ..."
            description="Here are some research articles, blogs, notes I have done in the past years. These show my academic interests over time. Sometimes I colaborate on pure math stuff, some other times on applied math, some others on data science ..."/>}
        </div>
      );
}
export default Blogs;