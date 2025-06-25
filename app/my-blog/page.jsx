// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { Suspense, useEffect, useState } from "react";
// import "../../public/assets/css/theme/main.css";
// import "./myblog.css";
// import Link from "next/link";
// import Header2 from "@/components/headers/Header2";
// import Footer2 from "@/components/footers/Footer2";

// function SkeletonLoader() {
//   return (
//     <div className="single_card skeleton">
//       <div className="skeleton-image"></div>
//       <div className="p-2">
//         <div className="skeleton-title"></div>
//         <div className="skeleton-detail"></div>
//         <div className="skeleton-read-more"></div>
//       </div>
//     </div>
//   );
// }

// export default function Page() {
//   const router = useRouter();
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 8;
//   const searchParams = useSearchParams();
//   const slug = searchParams.get('slug');

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const url = slug ? `${baseUrl}?slug=${slug}` : baseUrl;

//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const result = await response.json();
//         setData(result.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [slug]);

//   const handleNavigation = (id) => {
//     router.push(`/my-blog/${id}`);
//   };

//   // Pagination Logic
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = data.slice(indexOfFirstBlog, indexOfLastBlog);
//   const totalPages = Math.ceil(data.length / blogsPerPage);

//   // if (loading) return <div className="loading">Loading...</div>;
//   // if (error) return <div className="error">Error: {error}</div>;

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <>
//         <section className="blog_section" style={{ backgroundColor: "lightgray" }}>
//           <div className="heading_div">
//             <Header2 />
//           </div>
//           <div className="container main_div py-3 mb-3">
//             <div className="blogs_row mt-3">
//               {loading ? (
//                 // Show Skeleton Loader for each blog while loading
//                 [...Array(8)].map((_, index) => <SkeletonLoader key={index} />)  // Adjust the array length as per your needs
//               ) : (
//                 // Map over actual data once loaded, but only show the current page's blogs
//                 currentBlogs.length > 0 ? currentBlogs?.map((card, index) => {
//                   const words = card.details.split(" ");
//                   const shortDetails =
//                     words.length > 30
//                       ? words.slice(0, 30).join(" ")
//                       : card.details;

//                   return (
//                     <div key={card.id || index} className="single_card">
//                       <Link href={`/my-blog/${card.id}`}>
//                         <img src={card.photo} alt={card.title} loading="lazy" />
//                       </Link>
//                       <div className="p-2">
//                         <span>{card?.category} / {card?.created_at}</span>
//                         <h3>{card.title}</h3>
//                         <p onClick={() => handleNavigation(card?.id)}>
//                           {shortDetails} <br />
//                           {words.length > 30 && (
//                             <Link href={"/my-blog"} className="read-more">
//                               Continue reading
//                             </Link>
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 }) : !loading && currentBlogs.length === 0 && (
//                   <p className="alert alert-warning">No Blogs Found</p>)
//               )}
//             </div>

//             {/* Pagination Numbers */}
//             <div className="pagination-numbers mt-4">
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <button
//                   key={index}
//                   className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
//                   onClick={() => setCurrentPage(index + 1)}  // Update page on click
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <Footer2 />
//         </section>

//         {/* Optional inline styling (move to your CSS file if preferred) */}
//         <style jsx>{`
//         .pagination-numbers {
//           display: flex;
//           justify-content: center;
//           gap: 8px;
//           margin-top: 20px;
//         }

//         .page-btn {
//           padding: 8px 12px;
//           border: 1px solid #ddd;
//           background-color: white;
//           cursor: pointer;
//           border-radius: 5px;
//           font-weight: 500;
//           transition: all 0.3s ease;
//         }

//         .page-btn:hover {
//           background-color: #eee;
//         }

//         .page-btn.active {
//           background-color: #333;
//           color: white;
//           border-color: #333;
//         }
//       `}</style>

//         <style jsx>{`
//         .single_card.skeleton {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//           width: 100%;
//           max-width: 300px;
//         }

//         .skeleton-image {
//           width: 100%;
//           height: 200px;
//           background-color: #ddd;
//           border-radius: 5px;
//         }

//         .skeleton-title,
//         .skeleton-detail,
//         .skeleton-read-more {
//           background-color: #ddd;
//           height: 20px;
//           border-radius: 4px;
//         }

//         .skeleton-title {
//           width: 70%;
//         }

//         .skeleton-detail {
//           width: 90%;
//         }

//         .skeleton-read-more {
//           width: 50%;
//         }
//       `}</style>
//       </>
//     </Suspense>
//   );
// }

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import "../../public/assets/css/theme/main.css";
import "./myblog.css";
import Link from "next/link";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";

function SkeletonLoader() {
  return (
    <div className="single_card skeleton">
      <div className="skeleton-image"></div>
      <div className="p-2">
        <div className="skeleton-title"></div>
        <div className="skeleton-detail"></div>
        <div className="skeleton-read-more"></div>
      </div>
    </div>
  );
}

function BlogPageContent() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const url_base = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseUrl = `${url_base}api/front/blogs`;
        const url = slug ? `${baseUrl}?slug=${slug}` : baseUrl;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleNavigation = (id) => {
    router.push(`/my-blog/${id}`);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = data.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(data.length / blogsPerPage);

  return (
    <>
      <section
        className="blog_section"
        style={{ backgroundColor: "lightgray", marginTop: "146px" }}
      >
        <div className="heading_div">
          <Header2 />
        </div>
        <div className="container main_div py-3 mb-3">
          <div className="text-center">
            {slug && (
              <button className="btn btn-dark mb-2 text-uppercase">
                {slug.replace(/-/g, " ")}
              </button>
            )}
          </div>
          <div className="blogs_row mt-3">
            {loading
              ? [...Array(8)].map((_, index) => <SkeletonLoader key={index} />)
              : currentBlogs.length > 0
              ? currentBlogs.map((card, index) => {
                  const words = card.details.split(" ");
                  const shortDetails =
                    words.length > 20
                      ? words.slice(0, 20).join(" ")
                      : card.details;

                  return (
                    <div key={card.id || index} className="single_card">
                      <Link href={`/my-blog/${card.id}`}>
                        <img src={card.photo} alt={card.title} loading="lazy" />
                      </Link>
                      <div className="p-2">
                        <span>
                          {card?.category}{" "}
                          {card?.created_at &&
                            new Date(card.created_at).toLocaleDateString(
                              "en-GB"
                            )}
                        </span>
                        <h3>{card.title}</h3>
                        <p onClick={() => handleNavigation(card?.id)}>
                          {shortDetails} <br />
                          {words.length > 20 && (
                            <Link href={"/my-blog"} className="read-more">
                              Continue reading
                            </Link>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })
              : !loading &&
                currentBlogs.length === 0 && (
                  <p className="alert alert-warning">No Blogs Found</p>
                )}
          </div>

          <div className="pagination-numbers mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-btn ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <Footer2 />
      </section>

      {/* Optional inline styling (move to your CSS file if preferred) */}
      <style jsx>{`
        .pagination-numbers {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }

        .page-btn {
          padding: 8px 12px;
          border: 1px solid #ddd;
          background-color: white;
          cursor: pointer;
          border-radius: 5px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .page-btn:hover {
          background-color: #eee;
        }

        .page-btn.active {
          background-color: #333;
          color: white;
          border-color: #333;
        }
      `}</style>

      <style jsx>{`
        .single_card.skeleton {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          max-width: 300px;
        }

        .skeleton-image {
          width: 100%;
          height: 200px;
          background-color: #ddd;
          border-radius: 5px;
        }

        .skeleton-title,
        .skeleton-detail,
        .skeleton-read-more {
          background-color: #ddd;
          height: 20px;
          border-radius: 4px;
        }
        .skeleton-title {
          width: 70%;
        }

        .skeleton-detail {
          width: 90%;
        }

        .skeleton-read-more {
          width: 50%;
        }
      `}</style>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading blogs...</div>}>
      <BlogPageContent />
    </Suspense>
  );
}
