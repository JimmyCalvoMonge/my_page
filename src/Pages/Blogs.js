import BlogList from './BlogList';

const Blogs = () => {
    const data = require('../data/BlogData.json');
    return (
        <div className="List">
            {data && <BlogList blogs={data} title="Blogs about Math (mostly) ..."/>}
        </div>
      );
}
export default Blogs;