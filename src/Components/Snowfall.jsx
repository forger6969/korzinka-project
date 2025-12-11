import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Snowfall = () => {
    const [flakes, setFlakes] = useState([]);

    useEffect(() => {
        const numberOfFlakes = 100; // Количество снежинок
        const generatedFlakes = [];

        for (let i = 0; i < numberOfFlakes; i++) {
            generatedFlakes.push({
                id: i,
                x: Math.random() * window.innerWidth, // начальная позиция X
                size: Math.random() * 5 + 2, // размер снежинки
                delay: Math.random() * 5, // задержка начала анимации
                duration: Math.random() * 10 + 5, // скорость падения
                sway: Math.random() * 50 - 25, // амплитуда колебания
            });
        }

        setFlakes(generatedFlakes);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
            {flakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    initial={{ y: -10, x: flake.x }}
                    animate={{ y: [0, window.innerHeight + 10], x: [flake.x, flake.x + flake.sway] }}
                    transition={{
                        duration: flake.duration,
                        delay: flake.delay,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                    }}
                    style={{
                        width: flake.size,
                        height: flake.size,
                        borderRadius: "50%",
                        backgroundColor: "white",
                        position: "absolute",
                    }}
                />
            ))}
        </div>
    );
};

export default Snowfall;
