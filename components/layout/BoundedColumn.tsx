import React, { PropsWithChildren } from "react";

export function BoundedColumn({ children }: PropsWithChildren<{}>) {
  return (
    <div
      className="flex flex-col w-full ml-3 mr-3"
      style={{ maxWidth: "1280px" }}
    >
      {children}
    </div>
  );
}
