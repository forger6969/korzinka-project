import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const KorzinkaSwiper = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);
    const autoPlayRef = useRef(null);

    const slides = [
        {
            title: "7 hafta — 7 avtomobil!",
            subtitle: "Chekdagi har 200 000 so'm",
            subtitle2: "evaziga Chery avtomobillaridan",
            subtitle3: "biri sizniki bo'lishi mumkin",
            description: "Hamkorlar tovarlari xaridi",
            description2: "qo'shimcha imkon beradi!",
            bgGradient: "from-red-600 to-red-700",
        },
        {
            title: "Yangi yil sovg'alari!",
            subtitle: "Eng yaxshi takliflar",
            subtitle2: "barcha mahsulotlarda",
            subtitle3: "maxsus chegirmalar",
            description: "Premium brendlar",
            description2: "arzon narxlarda!",
            bgGradient: "from-blue-600 to-blue-700",
        },
        {
            title: "Mega chegirmalar!",
            subtitle: "50% gacha chegirma",
            subtitle2: "taniqli brendlarda",
            subtitle3: "cheklangan vaqt",
            description: "Tezroq bo'ling",
            description2: "imkoniyatni qo'ldan boy bermang!",
            bgGradient: "from-purple-600 to-purple-700",
        }
    ];

    const brands = [
        { name: "Chery", logo: "🚗" },
        { name: "Pepsi", logo: "🥤" },
        { name: "Grass", logo: "🧴" },
        { name: "Nestle", logo: "☕" },
        { name: "Nescafe", logo: "☕" },
        { name: "Lipton", logo: "🍵" },
        { name: "KitKat", logo: "🍫" },
        { name: "365 kun", logo: "📅" }
    ];

    const products = [
        { icon: "🍗", label: "Go'sht" },
        { icon: "🍞", label: "Non" },
        { icon: "🥚", label: "Tuxum" },
        { icon: "🧀", label: "Sut" },
        { icon: "🥓", label: "Kolbasa" }
    ];

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
    }, [currentSlide]);

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayRef.current = setTimeout(() => {
            nextSlide();
        }, 5000);
    };

    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearTimeout(autoPlayRef.current);
        }
    };

    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        if (index === currentSlide) return;
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    return (
        <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
            {/* Slider Container */}
            <div className="relative w-full h-full pt-20">
                {slides.map((slide, index) => {
                    const isActive = index === currentSlide;
                    const isPrev = index === (currentSlide - 1 + slides.length) % slides.length;
                    const isNext = index === (currentSlide + 1) % slides.length;

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-700 ease-out ${isActive
                                ? 'opacity-100 translate-x-0 z-20'
                                : isPrev
                                    ? 'opacity-0 -translate-x-full z-10'
                                    : isNext
                                        ? 'opacity-0 translate-x-full z-10'
                                        : 'opacity-0 translate-x-full z-0'
                                }`}
                            style={{
                                transitionProperty: 'opacity, transform',
                            }}
                        >
                            <div className={`w-full h-full bg-gradient-to-br ${slide.bgGradient} relative overflow-hidden`}>
                                {/* Snowflakes Animation */}
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute text-white text-opacity-70 pointer-events-none"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${-20 + Math.random() * 40}%`,
                                            fontSize: `${Math.random() * 15 + 10}px`,
                                            animation: `snowfall ${5 + Math.random() * 10}s linear infinite`,
                                            animationDelay: `${Math.random() * 5}s`
                                        }}
                                    >
                                        ❄️
                                    </div>
                                ))}

                                {/* Content */}
                                <div className="container mx-auto h-full flex items-center px-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
                                        {/* Left Side - Text */}
                                        <div
                                            className={`text-white space-y-6 transition-all duration-1000 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                                                }`}
                                            style={{ transitionDelay: isActive ? '200ms' : '0ms' }}
                                        >
                                            <h1
                                                className={`text-6xl lg:text-7xl font-black leading-tight transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                                    }`}
                                                style={{ transitionDelay: isActive ? '300ms' : '0ms' }}
                                            >
                                                {slide.title}
                                            </h1>

                                            <div
                                                className={`text-xl lg:text-2xl font-medium space-y-2 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                                    }`}
                                                style={{ transitionDelay: isActive ? '400ms' : '0ms' }}
                                            >
                                                <p className="italic">{slide.subtitle}</p>
                                                <p className="italic">{slide.subtitle2}</p>
                                                <p className="italic">{slide.subtitle3}</p>
                                            </div>

                                            <div
                                                className={`text-2xl lg:text-3xl font-bold space-y-1 pt-4 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                                    }`}
                                                style={{ transitionDelay: isActive ? '500ms' : '0ms' }}
                                            >
                                                <p>{slide.description}</p>
                                                <p>{slide.description2}</p>
                                            </div>

                                            {/* Brand Logos */}
                                            <div
                                                className={`flex flex-wrap items-center gap-4 pt-6 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                                    }`}
                                                style={{ transitionDelay: isActive ? '600ms' : '0ms' }}
                                            >
                                                {brands.map((brand, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-white rounded-lg p-3 flex items-center justify-center w-16 h-16 shadow-lg hover:scale-110 transition-transform duration-300"
                                                        style={{
                                                            animation: isActive ? `scaleIn 0.5s ease-out ${0.7 + i * 0.05}s both` : 'none'
                                                        }}
                                                    >
                                                        <span className="text-2xl">{brand.logo}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Product Icons */}
                                            <div
                                                className={`flex gap-4 pt-4 transition-all duration-1000 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                                    }`}
                                                style={{ transitionDelay: isActive ? '1000ms' : '0ms' }}
                                            >
                                                {products.map((product, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-30 hover:scale-110 transition-all duration-300 cursor-pointer"
                                                    >
                                                        <span className="text-3xl">{product.icon}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Side - Cars */}
                                        <div
                                            className={`relative h-full flex items-center justify-center transition-all duration-1000 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                                                }`}
                                            style={{ transitionDelay: isActive ? '300ms' : '0ms' }}
                                        >
                                            {/* Gift Boxes */}
                                            <div
                                                className="absolute top-10 right-20 z-20"
                                                style={{
                                                    animation: isActive ? 'float 3s ease-in-out infinite' : 'none'
                                                }}
                                            >
                                                <div className="relative">
                                                    <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg shadow-2xl transform rotate-12"></div>
                                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-full bg-red-600"></div>
                                                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-4 bg-red-600"></div>
                                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-5xl">🎀</div>
                                                </div>
                                            </div>

                                            <div
                                                className="absolute top-32 right-40 z-10"
                                                style={{
                                                    animation: isActive ? 'float 2.5s ease-in-out infinite 0.5s' : 'none'
                                                }}
                                            >
                                                <div className="relative">
                                                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-2xl transform -rotate-6"></div>
                                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-full bg-green-600"></div>
                                                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-3 bg-green-600"></div>
                                                </div>
                                            </div>

                                            {/* Christmas Trees */}
                                            <div
                                                className="absolute top-0 right-10 text-8xl opacity-80"
                                                style={{
                                                    animation: isActive ? 'pulse 3s ease-in-out infinite' : 'none'
                                                }}
                                            >
                                                🎄
                                            </div>
                                            <div
                                                className="absolute top-20 right-5 text-6xl opacity-70"
                                                style={{
                                                    animation: isActive ? 'pulse 3s ease-in-out infinite 1s' : 'none'
                                                }}
                                            >
                                                🎄
                                            </div>

                                            {/* Cars Stack */}
                                            <div className="relative w-full h-96">
                                                <div
                                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 hover:scale-105 transition-transform duration-300"
                                                    style={{
                                                        animation: isActive ? 'slideInCar1 1s ease-out 0.5s both' : 'none'
                                                    }}
                                                >
                                                    <div className="w-80 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl relative">
                                                        <div className="absolute top-4 left-8 w-16 h-12 bg-gray-700 rounded-lg"></div>
                                                        <div className="absolute bottom-2 left-8 w-10 h-10 bg-gray-600 rounded-full border-4 border-gray-400"></div>
                                                        <div className="absolute bottom-2 right-8 w-10 h-10 bg-gray-600 rounded-full border-4 border-gray-400"></div>
                                                        <div className="absolute top-6 right-12 w-8 h-6 bg-yellow-400 opacity-80 rounded"></div>
                                                    </div>
                                                </div>

                                                <div
                                                    className="absolute top-24 left-1/2 transform -translate-x-1/2 translate-x-12 z-20 hover:scale-105 transition-transform duration-300"
                                                    style={{
                                                        animation: isActive ? 'slideInCar2 1s ease-out 0.7s both' : 'none'
                                                    }}
                                                >
                                                    <div className="w-80 h-32 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl relative">
                                                        <div className="absolute top-4 left-8 w-16 h-12 bg-gray-300 rounded-lg"></div>
                                                        <div className="absolute bottom-2 left-8 w-10 h-10 bg-gray-400 rounded-full border-4 border-gray-300"></div>
                                                        <div className="absolute bottom-2 right-8 w-10 h-10 bg-gray-400 rounded-full border-4 border-gray-300"></div>
                                                        <div className="absolute top-6 right-12 w-8 h-6 bg-yellow-300 opacity-80 rounded"></div>
                                                    </div>
                                                </div>

                                                <div
                                                    className="absolute top-48 left-1/2 transform -translate-x-1/2 -translate-x-12 z-10 hover:scale-105 transition-transform duration-300"
                                                    style={{
                                                        animation: isActive ? 'slideInCar3 1s ease-out 0.9s both' : 'none'
                                                    }}
                                                >
                                                    <div className="w-80 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl shadow-2xl relative">
                                                        <div className="absolute top-4 left-8 w-16 h-12 bg-blue-700 rounded-lg"></div>
                                                        <div className="absolute bottom-2 left-8 w-10 h-10 bg-gray-700 rounded-full border-4 border-gray-500"></div>
                                                        <div className="absolute bottom-2 right-8 w-10 h-10 bg-gray-700 rounded-full border-4 border-gray-500"></div>
                                                        <div className="absolute top-6 right-12 w-8 h-6 bg-yellow-200 opacity-80 rounded"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-40 bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-40 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                >
                    <ChevronLeft size={32} />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-40 bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-40 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                >
                    <ChevronRight size={32} />
                </button>

                {/* Pagination */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className="relative overflow-hidden"
                        >
                            <div
                                className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'w-16 bg-white'
                                    : 'w-8 bg-white bg-opacity-40'
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0.3;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInCar1 {
          from {
            opacity: 0;
            transform: translateX(-50%) translateX(-200px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateX(0) scale(1);
          }
        }

        @keyframes slideInCar2 {
          from {
            opacity: 0;
            transform: translateX(-50%) translateX(12px) translateX(-200px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateX(12px) translateX(0) scale(1);
          }
        }

        @keyframes slideInCar3 {
          from {
            opacity: 0;
            transform: translateX(-50%) translateX(-12px) translateX(-200px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateX(-12px) translateX(0) scale(1);
          }
        }
      `}</style>
        </div>
    );
};

export default KorzinkaSwiper;