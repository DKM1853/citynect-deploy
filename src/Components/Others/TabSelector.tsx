import * as React from "react";

export const TabSelector = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
<button
  style={{width:"50%"}}
  className={`  ${
    isActive
      ? "selected-tab"
      : "unselected-tab"
  }`}
  onClick={onClick}
>
  {children}
</button>
);