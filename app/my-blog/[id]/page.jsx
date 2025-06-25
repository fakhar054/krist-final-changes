"use client";
import React, { useEffect, useState } from "react";
import "../../../public/assets/css/theme/main.css";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";
import { useParams } from "next/navigation";
import "../../my-blog/myblog.css";
import Related_blogs from "@/components/popular_products/Related_blogs";
import Link from "next/link";

// 🦴 Skeleton Loader Component
function BlogSkeletonLoader() {
  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-lg-9">
          <div className="text-center mb-4">
            <div className="skeleton-btn mb-3"></div>
            <div className="skeleton-title mb-2"></div>
            <div className="skeleton-meta mb-4"></div>
          </div>
          <div className="skeleton-image mb-4"></div>
          <div className="skeleton-content"></div>
        </div>
        <div className="col-lg-3">
          <div className="skeleton-sidebar mb-3"></div>
          <div className="skeleton-related-post mb-2"></div>
          <div className="skeleton-related-post mb-2"></div>
        </div>
      </div>

      <style jsx>{`
        .skeleton-btn {
          width: 150px;
          height: 35px;
          background: #ddd;
          border-radius: 5px;
          margin: auto;
        }

        .skeleton-title {
          height: 30px;
          width: 60%;
          background: #ccc;
          border-radius: 6px;
          margin: auto;
        }

        .skeleton-meta {
          height: 18px;
          width: 40%;
          background: #e0e0e0;
          margin: auto;
          border-radius: 4px;
        }

        .skeleton-image {
          width: 100%;
          height: 300px;
          background: #ddd;
          border-radius: 12px;
        }

        .skeleton-content {
          width: 100%;
          height: 200px;
          background: #eee;
          border-radius: 8px;
        }

        .skeleton-sidebar {
          width: 100%;
          height: 180px;
          background: #eee;
          border-radius: 6px;
        }

        .skeleton-related-post {
          width: 100%;
          height: 60px;
          background: #ddd;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}

export default function Page() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  // console.log(blog, "blog detail.....")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}api/front/blog/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const result = await response.json();
        setBlog(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  return (
    <>
      <section className="">
        <div className="heading_div">
          <Header2 />
        </div>

        <div className="blog-detail-section main_div">
          {loading ? (
            <BlogSkeletonLoader />
          ) : (
            <div className="container pt-4">
              <div className="row">
                <div className="col-lg-9">
                  <div>
                    <div className="text-center">
                      <button className="btn btn-dark mb-2 text-uppercase">
                        {blog?.blog?.category}
                      </button>
                      <h1 className="blog-title">{blog?.blog?.title}</h1>
                      <p className="blog-meta text-muted my-2">
                        Published on:{" "}
                        {blog?.blog?.created_at &&
                          new Date(blog?.blog?.created_at).toLocaleDateString(
                            "en-GB"
                          )}
                      </p>
                    </div>
                    <img
                      src={blog?.blog?.photo}
                      alt={blog?.blog?.title}
                      width="100%"
                      style={{ borderRadius: "12px" }}
                      className="blog-image"
                    />
                    <div
                      className="blog-content mt-4"
                      dangerouslySetInnerHTML={{ __html: blog?.blog?.details }}
                    ></div>
                  </div>
                  <Related_blogs blog={blog} />
                </div>

                <div className="col-lg-3 right_sec">
                  <ul style={{ listStyle: "none" }} className="p-0">
                    <li>
                      <h5>Categories</h5>
                    </li>
                    {blog?.categories &&
                      blog?.categories?.map((category, index) => (
                        <li key={index}>
                          <Link href={`/my-blog?slug=${category?.slug}`}>
                            {category?.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  <hr className="w-100" />
                  <h5>Related Posts</h5>
                  <div>
                    {blog?.relatedBlogs?.slice(0, 3)?.map((item, index) => {
                      return (
                        <div className="d-flex gap-2 mb-2" key={index}>
                          <img
                            src={item?.photo}
                            width={60}
                            height={60}
                            style={{ borderRadius: "6px" }}
                            alt={item?.title}
                          />
                          <div>
                            <p>{item?.title}</p>
                            <span>{item?.created_at}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <hr className="w-100" />
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer2 />
      </section>
    </>
  );
}
