import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BackgroundAnimation = () => {
    const [shapes, setShapes] = useState([]);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768; // мобильные устройства
        const count = isMobile ? 15 : 40; // меньше фигур на телефоне

        const newShapes = Array.from({ length: count }).map(() => {
            const size = isMobile ? Math.random() * 40 + 20 : Math.random() * 100 + 30;
            const opacity = isMobile ? Math.random() * 0.2 + 0.1 : Math.random() * 0.3 + 0.2;
            const duration = isMobile ? Math.random() * 8 + 5 : Math.random() * 15 + 10;

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const x = Math.random() * screenWidth;
            const y = -size;

            return {
                size,
                opacity,
                duration,
                initial: { x, y },
                animate: { x, y: screenHeight + size },
            };
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
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundAnimation;
