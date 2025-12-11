import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BackgroundAnimation = () => {
    const [shapes, setShapes] = useState([]);

    useEffect(() => {
        const newShapes = Array.from({ length: 40 }).map(() => {
            const size = Math.random() * 100 + 30;
            const opacity = Math.random() * 0.3 + 0.2;
            const duration = Math.random() * 15 + 10;
            const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left

            let initial = {};
            let animate = {};

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            switch (side) {
                case 0: // top
                    initial = { x: Math.random() * screenWidth, y: -size };
                    animate = { x: initial.x + (Math.random() * 200 - 100), y: screenHeight + size };
                    break;
                case 1: // right
                    initial = { x: screenWidth + size, y: Math.random() * screenHeight };
                    animate = { x: -size, y: initial.y + (Math.random() * 200 - 100) };
                    break;
                case 2: // bottom
                    initial = { x: Math.random() * screenWidth, y: screenHeight + size };
                    animate = { x: initial.x + (Math.random() * 200 - 100), y: -size };
                    break;
                case 3: // left
                    initial = { x: -size, y: Math.random() * screenHeight };
                    animate = { x: screenWidth + size, y: initial.y + (Math.random() * 200 - 100) };
                    break;
                default:
                    break;
            }

            return { size, opacity, duration, initial, animate };
        });

        setShapes(newShapes);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[#e4002b]">
            {shapes.map((shape, i) => (
                <motion.div
                    key={i}
                    initial={shape.initial}
                    animate={shape.animate}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                    }}
                    style={{
                        width: shape.size,
                        height: shape.size,
                        backgroundColor: "rgba(255,255,255,0.3)",
                        borderRadius: "50%",
                        position: "absolute",
                        opacity: shape.opacity,
                        filter: "blur(2px)",
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundAnimation;
