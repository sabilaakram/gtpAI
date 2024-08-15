"use client";

// components/ExpandableSection.js
import React, { useState } from "react";

const ExpandableSection = ({
  title,
  children,
}: {
  title: string;
  children: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        onClick={toggleOpen}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "15px 20px",
          backgroundColor: "#D0D0D0", // Turquoise
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "10px",
          color: "#fff",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s ease, transform 0.2s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#36c9c1")} // Darker Turquoise on hover
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "	#D0D0D0")}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {title}
      </button>
      {isOpen && (
        <div
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {children}
        </div>
      )}
      <br></br>
    </div>
  );
};

export default ExpandableSection;
