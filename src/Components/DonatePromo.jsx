import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import DonateSuccessModal from "./DonateSuccesModal";

const DonatePromo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [effects, setEffects] = useState([]);
  const [showOnMobile, setShowOnMobile] = useState(false);

  const [succesModal, setSucces] = useState(false)

  // Для мобильных: показываем через 5 секунд
  useEffect(() => {
    const timer = setTimeout(() => setShowOnMobile(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDonate = async () => {

    try {

      const userID = JSON.parse(localStorage.getItem(`currentUserID`))

      if (userID) {
        const req = await axios.post(`https://korzinka-server.onrender.com/donate`, {
          "userId": userID,
          "amount": +amount,
          "message": message,
          "isAnonymous": false
        })

        const res = req.data
        console.log(res);

        if (res.success) {

          setSucces(true)
          console.log(succesModal);
        }

      }

    } catch (err) {
      console.log(err);
    }
  };

  // Функция добавления анимации сердечек
  const addEffect = () => {
    const id = Date.now();
    setEffects((prev) => [...prev, id]);
    setTimeout(() => {
      setEffects((prev) => prev.filter((e) => e !== id));
    }, 2000);
  };

  // Проверяем ширину экрана
  const isMobile = window.innerWidth <= 768;

  // Если на мобильном, показываем только если showOnMobile true
  if (isMobile && !showOnMobile) return null;

  return (
    <>
      {/* Эффекты */}
      {effects.map((id) => (
        <motion.div
          key={id}
          className="fixed bottom-24 right-6 text-3xl"
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={{ y: -100, opacity: 0, scale: 1.5 }}
          transition={{ duration: 1.5 }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Блок в правом нижнем углу */}
      <motion.div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-[#e4002b] to-[#ff4c5b] text-white rounded-3xl shadow-2xl cursor-pointer z-50 overflow-hidden ${isMobile ? "w-56 p-3" : "w-72 p-5"
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center justify-center">
          <motion.h3
            className={`font-bold mb-2 ${isMobile ? "text-lg" : "text-xl"}`}
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            💖 Поддержите фонд!
          </motion.h3>
          <p className={`text-white/90 text-center ${isMobile ? "text-xs" : "text-sm"}`}>
            Ваша помощь реально помогает нуждающимся
          </p>
        </div>
      </motion.div>

      {/* Модалка выезжающая снизу */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-6 right-6 bg-white rounded-3xl shadow-2xl z-50 ${isMobile ? "w-56 p-3" : "w-72 p-5"
              }`}
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
            >
              ✕
            </button>
            <h2 className={`font-bold mb-3 text-center text-[#e4002b] ${isMobile ? "text-lg" : "text-xl"}`}>
              Пожертвовать
            </h2>
            <input
              type="number"
              placeholder="Сумма (сум)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4002b]"
            />
            <textarea
              placeholder="Сообщение (необязательно)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4002b]"
            />
            <motion.button
              onClick={handleDonate}
              className="w-full bg-[#e4002b] hover:bg-[#ff4c5b] text-white font-bold py-2 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Сделать пожертвование
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {succesModal && <DonateSuccessModal amount={amount} onClose={() => setSucces(false)} />}
    </>
  );
};

export default DonatePromo;
