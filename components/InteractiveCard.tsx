"use client";

import { ReactNode } from "react";

export default function InteractiveCard({
  children,
  style,
  className,
  translateY = -4,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  translateY?: number;
}) {
  return (
    <div
      className={className}
      style={{
        ...style,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = `translateY(${translateY}px)`;
        el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = style?.boxShadow ?? "0 4px 16px rgba(139, 69, 19, 0.04)";
      }}
    >
      {children}
    </div>
  );
}