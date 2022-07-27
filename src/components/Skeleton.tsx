import React from "react";
import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="134" cy="119" r="117" />
    <rect x="-2" y="253" rx="15" ry="15" width="280" height="24" />
    <rect x="0" y="294" rx="0" ry="0" width="280" height="81" />
    <rect x="1" y="387" rx="0" ry="0" width="93" height="30" />
    <rect x="166" y="386" rx="15" ry="15" width="113" height="31" />
  </ContentLoader>
);
