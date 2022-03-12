import { useParams } from "react-router-dom"
import getDataBlog from "../assets/fake-data/blog";
import Helmet from "../components/Helmet";
import { useEffect } from "react";
import { blogs } from "../assets/fake-data/blog";
import guest from "../assets/images/guest.png"
import { Link } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
const BlogDetails = () => {
    const { post } = useParams();
    const blog = getDataBlog.getBlogByPath(post);
    console.log(blog)
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [blog]);
  const otherBlog = blogs[Math.floor(Math.random() * 9)]; 
  

    return (
      <Helmet title={blog.title}>
        <div className="blog-detail">
          <h4 className="news">News</h4>
          <div className="blog-details-title">{blog.title}</div>
          <div className="blog-details-date">
            <b>Đã đăng vào</b> {blog.date} bởi <b>{blog.author}</b>
          </div>

          <div className="blog-details-img">
            <img src={blog.img} alt="" />
            <i>Ảnh bởi Nike</i>
          </div>

          <div className="blog-details-info">{blog.information}</div>
          <div className="blog-details-img">
            <img src={blog.img2} alt="" />
            <img src={blog.img3} alt="" />
            <img src={blog.img4} alt="" />
            <i>Ảnh bởi Nike</i>
          </div>
          <div className="blog-details-info">
            Hãy theo dõi Kicks Geeks trên Facebook để nắm bắt tin tức về giày
            bóng rổ sớm nhất nhé!
          </div>
          <div className="blog-guest-info">
            <h3>Tác giả</h3>
            <span>
              <img src={guest} alt="" />
              Minh Trần
            </span>
          </div>
          <div className="blog-link">
            <Link to={`/blog/${otherBlog.path}`}>
              <span>
                <GrFormPreviousLink/>
              </span>{" "}
              {otherBlog.title}
            </Link>
          </div>
        </div>
      </Helmet>
    );
}

export default BlogDetails