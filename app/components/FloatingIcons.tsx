import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface FloatingIcon {
  id: number;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  direction: number;
  size: number;
  opacity: number;
  rotationSpeed: number;
  wave: {
    amplitude: number;
    frequency: number;
    offset: number;
  };
}

export default function FloatingIcons() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    // Create more icons with varied sizes
    const initialIcons = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
      speed: 0.2 + Math.random() * 0.4, // Slower base speed for smoother movement
      direction: Math.random() * Math.PI * 2,
      size: 20 + Math.random() * 40, // More varied sizes (20px to 60px)
      opacity: 0.1 + Math.random() * 0.2, // Subtle opacity
      rotationSpeed: (Math.random() - 0.5) * 0.2, // Random rotation direction and speed
      wave: {
        amplitude: 0.5 + Math.random() * 1.5, // Wave height
        frequency: 0.02 + Math.random() * 0.03, // Wave speed
        offset: Math.random() * Math.PI * 2, // Random wave phase
      },
    }));

    setIcons(initialIcons);

    let frame = 0;
    // Smoother animation loop
    const animate = () => {
      frame++;
      setIcons(prevIcons => 
        prevIcons.map(icon => {
          // Base movement
          let newX = icon.x + Math.cos(icon.direction) * icon.speed;
          let newY = icon.y + Math.sin(icon.direction) * icon.speed;

          // Add wave motion
          newY += Math.sin(frame * icon.wave.frequency + icon.wave.offset) * icon.wave.amplitude;

          // Smooth screen wrapping
          if (newX > window.innerWidth + 50) newX = -50;
          if (newX < -50) newX = window.innerWidth + 50;
          if (newY > window.innerHeight + 50) newY = -50;
          if (newY < -50) newY = window.innerHeight + 50;

          // Update rotation smoothly
          const newRotation = (icon.rotation + icon.rotationSpeed) % 360;

          return {
            ...icon,
            x: newX,
            y: newY,
            rotation: newRotation,
          };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    let animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {icons.map(icon => (
        <div
          key={icon.id}
          className="absolute transform-gpu transition-opacity duration-1000"
          style={{
            transform: `translate3d(${icon.x}px, ${icon.y}px, 0) rotate(${icon.rotation}deg)`,
            opacity: icon.opacity,
            willChange: 'transform',
          }}
        >
          <Image
            src="/images/base-logo.png"
            alt=""
            width={icon.size}
            height={icon.size}
            className="select-none"
            priority
          />
        </div>
      ))}
    </div>
  );
} 