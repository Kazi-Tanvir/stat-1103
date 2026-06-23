"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TreeNode {
  label: string;
  probability: string;
  children?: TreeNode[];
  highlighted?: boolean;
}

interface ProbabilityTreeProps {
  data: TreeNode;
  className?: string;
}

export function ProbabilityTree({ data, className = "" }: ProbabilityTreeProps) {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const renderNode = (
    node: TreeNode,
    x: number,
    y: number,
    level: number,
    spread: number,
    path: string,
    parentX?: number,
    parentY?: number
  ): React.ReactElement[] => {
    const elements: React.ReactElement[] = [];
    const isHovered = hoveredPath !== null && path.startsWith(hoveredPath);
    const isOnPath = hoveredPath !== null && hoveredPath.startsWith(path);
    const opacity = hoveredPath === null ? 1 : isHovered || isOnPath ? 1 : 0.25;

    // Draw line from parent
    if (parentX !== undefined && parentY !== undefined) {
      elements.push(
        <motion.line
          key={`line-${path}`}
          x1={parentX}
          y1={parentY}
          x2={x}
          y2={y}
          stroke={isHovered || isOnPath ? "var(--accent)" : "var(--border-strong)"}
          strokeWidth={isHovered || isOnPath ? 2.5 : 1.5}
          opacity={opacity}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: level * 0.2 }}
        />
      );

      // Probability label on the branch
      const midX = (parentX + x) / 2;
      const midY = (parentY + y) / 2;
      elements.push(
        <text
          key={`prob-${path}`}
          x={midX + (x > parentX ? 8 : -8)}
          y={midY - 5}
          fill={isHovered || isOnPath ? "var(--accent-light)" : "var(--text-subtle)"}
          fontSize="11"
          fontFamily="var(--font-mono)"
          textAnchor="middle"
          opacity={opacity}
        >
          {node.probability}
        </text>
      );
    }

    // Draw node
    elements.push(
      <motion.g
        key={`node-${path}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: opacity }}
        transition={{ duration: 0.3, delay: level * 0.2 + 0.1 }}
        onMouseEnter={() => setHoveredPath(path)}
        onMouseLeave={() => setHoveredPath(null)}
        className="cursor-pointer"
      >
        <circle
          cx={x}
          cy={y}
          r={level === 0 ? 22 : 18}
          fill={
            node.highlighted
              ? "var(--accent)"
              : isHovered || isOnPath
              ? "var(--accent-dark)"
              : "var(--bg-elevated)"
          }
          stroke={isHovered || isOnPath ? "var(--accent)" : "var(--border-strong)"}
          strokeWidth={2}
        />
        <text
          x={x}
          y={y + 4}
          fill="var(--text-primary)"
          fontSize={level === 0 ? "12" : "10"}
          fontFamily="var(--font-display)"
          fontWeight="bold"
          textAnchor="middle"
        >
          {node.label}
        </text>
      </motion.g>
    );

    // Render children
    if (node.children) {
      const childCount = node.children.length;
      const childSpread = spread / (childCount > 1 ? 1.8 : 1);
      node.children.forEach((child, i) => {
        const childX =
          childCount === 1
            ? x
            : x + (i - (childCount - 1) / 2) * (spread * 0.9);
        const childY = y + 80;
        elements.push(
          ...renderNode(
            child,
            childX,
            childY,
            level + 1,
            childSpread,
            `${path}-${i}`,
            x,
            y
          )
        );
      });
    }

    return elements;
  };

  // Calculate SVG dimensions based on tree depth/breadth
  const getTreeDepth = (node: TreeNode): number => {
    if (!node.children || node.children.length === 0) return 0;
    return 1 + Math.max(...node.children.map(getTreeDepth));
  };

  const depth = getTreeDepth(data);
  const width = Math.max(400, 200 * Math.pow(2, depth));
  const height = 80 * (depth + 1) + 60;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ minWidth: "300px", maxHeight: "400px" }}
      >
        {renderNode(data, width / 2, 35, 0, width / 2.5, "root")}
      </svg>
    </div>
  );
}

// ── Pre-built tree for insurance example ──
export const insuranceTree: TreeNode = {
  label: "Start",
  probability: "",
  children: [
    {
      label: "Prone",
      probability: "0.3",
      children: [
        { label: "Acc", probability: "0.4", highlighted: true },
        { label: "No Acc", probability: "0.6" },
      ],
    },
    {
      label: "Not",
      probability: "0.7",
      children: [
        { label: "Acc", probability: "0.2" },
        { label: "No Acc", probability: "0.8" },
      ],
    },
  ],
};

// ── Pre-built tree for plant problem ──
export const plantTree: TreeNode = {
  label: "Start",
  probability: "",
  children: [
    {
      label: "Water",
      probability: "0.9",
      children: [
        { label: "Dies", probability: "0.15" },
        { label: "Lives", probability: "0.85", highlighted: true },
      ],
    },
    {
      label: "Forgot",
      probability: "0.1",
      children: [
        { label: "Dies", probability: "0.80" },
        { label: "Lives", probability: "0.20" },
      ],
    },
  ],
};
