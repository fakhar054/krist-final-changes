export default function SkeletonLoader() {
    return (
      <div className="all_product_parent_div">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="skeleton_product">
            <div className="skeleton skeleton-img"></div>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-detail"></div>
            <div className="skeleton skeleton-price"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        ))}
      </div>
    );
  }
  