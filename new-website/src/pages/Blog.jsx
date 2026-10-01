import { Link, useParams } from 'react-router-dom'
import BlogParser from '../components/BlogParser.jsx'
import { getBlog } from '../utils/blogs.js'
import './css/Blog.css'

export default function Blog() {
    const { slug } = useParams()
    const blog = getBlog(slug)

    if (!blog) {
        return (
            <div className="blog-page">
                <h1>Blog not found</h1>
                <Link to="/blog" className="blog-back">&lt; Back to blog</Link>
            </div>
        )
    }

    return (
        <div className="blog-page">
            <Link to="/blog" className="blog-back">&lt; Back to blog</Link>
            <BlogParser markdown={blog.markdown} />
        </div>
    )
}
