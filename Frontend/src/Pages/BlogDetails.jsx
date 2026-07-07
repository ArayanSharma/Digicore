import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { defaultBlogs, fetchAllBlogs, slugify } from "../utils/blogData";
import "../Styles/BlogDetails.css";
import "../Styles/BlogCard.css";

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const load = async () => {
      setLoading(true);
      const allBlogs = await fetchAllBlogs();

      const current = allBlogs.find(
        (b) => (b.slug || slugify(b.title)) === slug
      );
      setBlog(current || null);

      // exclude current blog, cap the rest at 4
      const others = allBlogs.filter(
        (b) => (b.slug || slugify(b.title)) !== slug
      );
      setRecentBlogs(others.slice(0, 4));
      setLoading(false);
    };

    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-details-page">
        <div className="blog-details-loading">
          <div className="blog-loading-spinner" />
          <p>Loading blog…</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-details-page">
        <div className="blog-not-found">
          <h2>Blog Not Found</h2>
          <p>The blog post you're looking for doesn't exist or has been removed.</p>
          <button className="blog-back-btn" onClick={() => navigate("/blogs")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
            Browse All Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="blog-details-page">
        <div className="blog-details-container">

          <button className="blog-back-btn" onClick={() => navigate("/blogs")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </button>

          <div className="blog-details-hero">
            <img src={blog.image} alt={blog.title} />
          </div>

          <div className="blog-details-meta">
            {blog.author && (
              <span className="blog-meta-author">{blog.author}</span>
            )}
            {blog.author && blog.date && <span className="blog-meta-dot" />}
            {blog.date && (
              <span className="blog-meta-date">{blog.date}</span>
            )}
            {blog.category && (
              <span className="blog-meta-category">{blog.category}</span>
            )}
          </div>

          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-content">
            {blog.content || blog.desc}
          </div>

          <div className="blog-details-divider" />
        </div>
      </section>

      {recentBlogs.length > 0 && (
        <section className="blog-recent-section">
          <div className="blog-recent-header">
            <h2>Recent Blogs</h2>
            <div className="blog-recent-line" />
          </div>

          <div className="blog-recent-grid">
            {recentBlogs.map((item, index) => {
              const itemSlug = item.slug || slugify(item.title);
              return (
                <div className="blog-card" key={item.id || index}>
                  <div className="blog-top">
                    <div className="blog-img-border">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="blog-title">
                      <h5>{item.title}</h5>
                    </div>
                  </div>

                  <div className="blog-content">
                    <p>{item.desc}</p>
                    <button
                      className="read-more-btn"
                      onClick={() => navigate(`/blog/${itemSlug}`)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="blog-recent-viewall">
            <button
              className="blog-recent-viewall-btn"
              onClick={() => navigate("/blogs")}
            >
              View All Blogs
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogDetails;
