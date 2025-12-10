import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from '../assets/korzinka_logo.webp'
import { biz_haqimizda_SVG, catalog_SVG, dokonlar_SVG, karyera_SVG, korzinka_go_SVG, korzinka_plus_SVG, news_SVG, search_SVG, yana_SVG } from "./SvgMaterials";

export default function HeaderLanding() {
    const [hidden, setHidden] = useState(false);
    const [lastY, setLastY] = useState(0);
    const [currentLanguage, setLang] = useState("")

    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    };

    useEffect(() => {
        const getLang = localStorage.getItem(`language`) || "uz"
        setLang(getLang)
    }, [])


    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY > lastY && currentY > 50) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            setLastY(currentY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastY]);

    return (
        <motion.header
            initial={{ y: -70, opacity: 0 }}  // Анимация появления
            animate={{
                y: hidden ? -100 : 0,
                opacity: hidden ? 0 : 1
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 w-full mx-auto z-50 bg-white text-white shadow-lg rounded-b-3xl"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="" />
                </div>

                <nav className="flex items-center gap-8 text-sm font-medium">
                    <p className="flex flex-col items-center text-[#302E33]">{catalog_SVG} <span>{t("header_catalog_item")}</span></p>
                    <p className="flex flex-col items-center text-[#302E33]"> {korzinka_plus_SVG} <span>{t("header_korzina_plus_item")}</span></p>
                    <p className="flex flex-col items-center text-[#302E33]"> {korzinka_go_SVG} <span>{t("header_korzina_go")}</span></p>
                    <p className="flex flex-col items-center text-[#302E33]"> {karyera_SVG} <span> {t("header_karyera_item")} </span></p>
                    <p className="flex flex-col items-center text-[#302E33]"> {biz_haqimizda_SVG} <span> {t("header_about_us_item")} </span></p>
                    <p className="flex flex-col items-center text-[#302E33]"> {dokonlar_SVG} <span> {t("header_store_item")} </span></p>
                    <p className="flex flex-col items-center text-[#302E33]"> {news_SVG} <span> {t("header_news_item")} </span></p>
                    <p className="flex flex-col items-center text-[#302E33]"> {yana_SVG} <span> {t("header_more_item")} </span></p>
                </nav>


                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">{currentLanguage.toUpperCase()}</div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li onClick={() => changeLanguage("uz")} className="text-[#302E33] text-2xl cursor-pointer">Ozbekcha</li>
                        <li onClick={() => changeLanguage("ru")} className="text-[#302E33] text-2xl cursor-pointer">Русский</li>
                        <li onClick={() => changeLanguage("en")} className="text-[#302E33] text-2xl cursor-pointer">English</li>
                    </ul>
                </div>

                <div className="text-2xl cursor-pointer">{search_SVG}</div>
            </div>
        </motion.header>
    );
}
