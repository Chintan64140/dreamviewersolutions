"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

// 👇 Always start from top, move downward
const getRandomStartPoint = () => {
  const side = Math.random() < 0.5 ? "top" : "left"; // random side
  const x = side === "top" ? Math.random() * window.innerWidth : -10;
  const y = side === "top" ? -10 : Math.random() * window.innerHeight * 0.3; // small top section
  const angle = 45; // move diagonally down-right
  return { x, y, angle };
};

export const ShootingStars = ({
  minSpeed = 1,
  maxSpeed = 4,
  minDelay = 100,
  maxDelay = 300,
  starColor = "#ffffffc4",
  trailColor = "#dfdc2eff",
  starWidth = 10,
  starHeight = 1,
  numberOfStars = 5,
  className,
}) => {
  const [stars, setStars] = useState([]);
  const svgRef = useRef(null);

  // Create stars periodically
  useEffect(() => {
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      const newStar = {
        id: Date.now() + Math.random(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };

      setStars((prev) => {
        const updated = [...prev, newStar];
        return updated.slice(-numberOfStars);
      });

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      setTimeout(createStar, randomDelay);
    };

    createStar();
  }, [minSpeed, maxSpeed, minDelay, maxDelay, numberOfStars]);

  // Animate all stars
  useEffect(() => {
    const moveStars = () => {
      setStars((prevStars) =>
        prevStars
          .map((star) => {
            const newX =
              star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
            const newY =
              star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
            const newDistance = star.distance + star.speed;
            const newScale = 1 + newDistance / 100;

            // remove if below screen
            if (newY > window.innerHeight + 20) return null;

            return { ...star, x: newX, y: newY, distance: newDistance, scale: newScale };
          })
          .filter(Boolean)
      );

      requestAnimationFrame(moveStars);
    };

    const animationFrame = requestAnimationFrame(moveStars);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <svg ref={svgRef} className={cn("w-full h-full absolute inset-0", className)}>
      {stars.map((star) => (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      ))}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};
