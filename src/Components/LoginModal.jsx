import axios from 'axios';
import React, { useState } from 'react';
import { LuX } from 'react-icons/lu';

const LoginModal = ({ onClose }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");   // <-- для ошибки

    const loginUser = async () => {
        try {
            setError(""); // очистить ошибку

            const login = await axios.post(`https://korzinka-server.onrender.com/login`, {
                email,
                password
            });

            console.log(login.data.user.id);
            localStorage.setItem(`currentUserID`, JSON.stringify(login.data.user.id))

            onClose();

        } catch (err) {

            // Сервер вернул ошибку
            if (err.response) {
                if (err.response.status === 401) {
                    setError("Неверный пароль!");
                } else if (err.response.status === 404) {
                    setError("Пользователь не найден!");
                } else {
                    setError("Ошибка сервера");
                }
            } else {
                setError("Ошибка соединения");
            }

            console.log(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-[400px] p-6 rounded-2xl relative shadow-lg">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <LuX size={24} />
                </button>

                <p className="text-2xl font-semibold mb-6 text-center">Login</p>

                <div className="flex flex-col gap-4 mb-2">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#e4002b]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#e4002b]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* ошибка */}
                {error && (
                    <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
                )}

                <button
                    onClick={loginUser}
                    className="w-full bg-[#e4002b] text-white py-3 rounded-lg hover:bg-[#cc001f] transition"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
