import { blogs } from "../assets/fake-data/blog";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Blog = () => {
  let perPage = 5;
  let current = 1;
  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(perPage);
  let pages = Math.ceil(blogs.length / 5);
  let page = [];
  const [active, setActive] = useState(1);

  const getCurrentItem = (current) => {
    setStart((current - 1) * perPage);
    setEnd(current * perPage);
  };
  for (let i = 1; i <= pages; i++) {
    page.push(i);
  }
  console.log(page);
  const Next = () => {
    if (current < pages) {
      current++;

      getCurrentItem(current);
    }
    setActive(current);
  };

  const Prev = () => {
    current--;
    if (current <= 1) {
      current = 1;
    }
    getCurrentItem(current);
    setActive(current);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  },[Prev,Next,getCurrentItem])

  console.log(active);
  return (
    <div className="blog">
      {blogs.slice(start, end).map((item, index) => (
        <BlogCard
          date={item.date}
          img={item.img}
          title={item.title}
          author={item.author}
          path={item.path}
          key={index}
        />
      ))}

      <div className="pagination">
        <button className="blog-pagination" onClick={Prev}>
          Prev
        </button>
        {page.map((item, index) => (
          <button
            onClick={() => {
              setActive(item);
              getCurrentItem(item);
            }}
            key={index}
            className={`blog-pagination ${item === active ? "active" : ""}`}
          >
            {item}
          </button>
        ))}
        <button className="blog-pagination" onClick={Next}>
          Next
        </button>
      </div>
    </div>
  );
};

const BlogCard = (props) => {
  return (
    <div className="blog-box">
      <h1 className="blog-box-date">{props.date.slice(0,5)}</h1>
      <div className="blog-img">
        <img src={props.img} alt="" />
      </div>

      <div className="blog-info">
        <div className="blog-details"><h3>{props.title}</h3></div>
        
        <div>
          <small>- {props.author} -</small>
        </div>
        <br />
        <div> Bài đăng ngày : { props.date }</div>
        <Link to={`${props.path}`}>
          <h2 className="blog-details-link">Xem thêm</h2>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
