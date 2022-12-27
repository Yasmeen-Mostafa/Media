import React from "react";
import classNames from "classnames";

function Skeleton({ times, className }) {
  //times=> how many grey boxes you need
  const outerClassNames = classNames(
    "relative",
    "overflow-hidden",
    "bg-gray-200",
    "rounded",
    "mb-2.5",
    className
  );
  const innerClassNames = classNames(
    "animate-shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200"
  );

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div className={outerClassNames} key={i}>
        <div className={innerClassNames} />
      </div>
    ));

  return boxes;
}

export default Skeleton;
