import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretLeft } from "react-icons/ai";

function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    // <div>ExpandablePanel</div>
    <div className=" mb-2 border rounded">
      <div className="flex p-2 justify-between items-center">
        <div className="flex p-2 items-center justify-between gap-2">
          {header}
        </div>
        <div className=" cursor-pointer " onClick={handleExpandClick}>
          {expanded ? (
            <AiFillCaretDown className="text-3xl" />
          ) : (
            <AiFillCaretLeft className="text-3xl" />
          )}
        </div>
      </div>
      {expanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
