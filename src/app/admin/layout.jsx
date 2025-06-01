import Sidebar from "@/components/admin/SidBar";
import React from "react";

export default function layout({ children }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
