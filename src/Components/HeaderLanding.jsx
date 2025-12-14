import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from '../assets/korzinka_logo.webp';
import {
    biz_haqimizda_SVG, cart_SVG, catalog_SVG, dokonlar_SVG, heart_SVG,
    karyera_SVG, korzinka_go_SVG, korzinka_plus_SVG, news_SVG, search_SVG, yana_SVG
} from "./SvgMaterials";
import { LuUserRound, LuMenu, LuX } from "react-icons/lu";
import LoginModal from "./LoginModal";
import { AppContext } from "../AppContext";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderLanding() {

    const { userInfo } = useContext(AppContext)
    const { user } = userInfo

    const [hidden, setHidden] = useState(false);
    const [lastY, setLastY] = useState(0);
    const [currentLanguage, setLang] = useState("");
    const [loginModal, setModal] = useState(false)
    const [burgerOpen, setBurgerOpen] = useState(false)

    const { t, i18n } = useTranslation();
    const navigate = useNavigate()

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        setLang(lang);
    };

    const openModalCheck = () => {
        if (user) {
            navigate('/profile')
        } else {
            setModal(true)
        }
    }

    useEffect(() => {
        const getLang = localStorage.getItem(`language`) || "uz";
        setLang(getLang);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY > lastY && currentY > 50) {
                setHidden(true);
                setBurgerOpen(false); // Закрываем бургер при скролле вниз
            } else {
                setHidden(false);
            }
            setLastY(currentY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastY]);


    const navItems = [
        { icon: catalog_SVG, label: t("header_catalog_item"), path: "/" },
        { icon: korzinka_plus_SVG, label: t("header_korzina_plus_item"), path: "/" },
        { icon: korzinka_go_SVG, label: t("header_korzina_go"), path: "/" },
        { icon: karyera_SVG, label: t("header_karyera_item"), path: "/" },
        { icon: biz_haqimizda_SVG, label: t("header_about_us_item"), path: "/" },
        { icon: dokonlar_SVG, label: t("header_store_item"), path: "/" },
        { icon: news_SVG, label: t("header_news_item"), path: "/" },
        { icon: yana_SVG, label: t("header_more_item"), path: "/" },
        { icon: cart_SVG, label: t("header_cart_item"), path: "/cart" },
        { icon: heart_SVG, label: t("header_favorites_item"), path: "/" },
    ];

    return (
        <>
            {/* HEADER */}
            <motion.header
                initial={{ y: -70, opacity: 0 }}
                animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 w-full z-50 bg-white shadow-md"
            >
                <div className="max-w-[95%] mx-auto flex items-center justify-between py-3 px-4">
                    {/* Логотип */}
                    <Link to={'/'} className="flex items-center gap-3">
                        <img src={logo} alt="Korzinka" className="h-10 object-contain" />
                    </Link>

                    {/* Десктопное меню */}
                    <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
                        {navItems.map((item, idx) => (
                            <Link to={item.path} key={idx} className="flex flex-col items-center cursor-pointer hover:text-[#e4002b] transition">
                                {item.icon}
                                <span className="mt-1 text-xs">{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Мобильный бургер */}
                    <div className="lg:hidden flex items-center gap-4">
                        <button onClick={() => setBurgerOpen(prev => !prev)} className="text-gray-700 text-2xl">
                            {burgerOpen ? <LuX /> : <LuMenu />}
                        </button>
                        <div onClick={openModalCheck} className="flex flex-col items-center text-gray-800 cursor-pointer">
                            <LuUserRound size={24} className="text-[#e4002b]" />
                        </div>
                    </div>

                    {/* Язык и баланс для десктопа */}
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="btn btn-sm bg-gray-100 border-gray-200 text-gray-800">
                                {currentLanguage.toUpperCase()}
                            </div>
                            <ul tabIndex="-1" className="dropdown-content menu bg-white rounded-md shadow-lg w-40 p-2">
                                <li onClick={() => changeLanguage("uz")} className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">Ozbekcha</li>
                                <li onClick={() => changeLanguage("ru")} className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">Русский</li>
                                <li onClick={() => changeLanguage("en")} className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">English</li>
                            </ul>
                        </div>

                        {user && <div className="bg-[#e4002b] text-white px-4 py-1 rounded-lg flex flex-col items-center justify-center text-xs">
                            <span>Balance</span>
                            <span className="font-bold text-sm">{user.balance.toLocaleString()}</span>
                        </div>}
                    </div>
                </div>

                {/* Мобильное выдвижное меню */}
                {burgerOpen && (
                    <motion.nav
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-white shadow-md w-full absolute top-full left-0 p-4 flex flex-col gap-4 z-40"
                    >
                        {navItems.map((item, idx) => (
                            <Link
                                key={idx}
                                to={item.path}
                                onClick={() => setBurgerOpen(false)}
                                className="flex items-center gap-2 text-gray-700 hover:text-[#e4002b] transition"
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                        {/* Языки */}
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => changeLanguage("uz")} className="btn btn-xs" style={{ backgroundColor: '#e4002b', color: 'white' }}>UZ</button>
                            <button onClick={() => changeLanguage("ru")} className="btn btn-xs" style={{ backgroundColor: '#e4002b', color: 'white' }}>RU</button>
                            <button onClick={() => changeLanguage("en")} className="btn btn-xs" style={{ backgroundColor: '#e4002b', color: 'white' }}>EN</button>
                        </div>
                    </motion.nav>
                )}
            </motion.header>

            {loginModal && <LoginModal onClose={() => setModal(false)} />}
        </>
    );
}
