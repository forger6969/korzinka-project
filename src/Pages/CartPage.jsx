import React, { useActionState, useContext, useEffect, useState } from "react";
import { LuTrash2, LuMinus, LuPlus } from "react-icons/lu";
import { AppContext } from "../AppContext";
import axios from "axios";
import InsufficientFundsAnimation from "../Components/InsufficientFundsAnimation";
import SuccessAnimation from "../Components/SuccessAnimation";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [productIds, setProductIds] = useState([]);
    const { userInfo } = useContext(AppContext)
    const { setUser, user } = userInfo

    const [noMoney, setMoney] = useState(false)
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const savedIds = JSON.parse(localStorage.getItem("productIds")) || [];

        setCart(savedCart);
        setProductIds(savedIds);
    }, []);


    const updateLS = (newCart, newIds) => {
        setCart(newCart);
        setProductIds(newIds);

        localStorage.setItem("cart", JSON.stringify(newCart));
        localStorage.setItem("productIds", JSON.stringify(newIds));
    };


    const increaseCount = (id) => {
        const updatedCart = cart.map((item) =>
            item.product._id === id
                ? { ...item, count: item.count + 1 }
                : item
        );

        const updatedIds = [...productIds, id];

        updateLS(updatedCart, updatedIds);
    };

    const decreaseCount = (id) => {
        const updatedCart = cart.map((item) => {
            if (item.product._id === id) {
                const newCount = Math.max(1, item.count - 1);
                return { ...item, count: newCount };
            }
            return item;
        });

        const index = productIds.indexOf(id);
        let updatedIds = [...productIds];

        if (index !== -1) {
            updatedIds.splice(index, 1);
        }

        updateLS(updatedCart, updatedIds);
    };


    const removeItem = (id) => {
        const updatedCart = cart.filter((item) => item.product._id !== id);

        const updatedIds = productIds.filter((pid) => pid !== id);

        updateLS(updatedCart, updatedIds);
    };


    const totalPrice = cart.reduce(
        (sum, item) => sum + item.product.price * item.count,
        0
    );

    const buyProduct = async () => {
        try {
            if (user) {

                const getProducts = JSON.parse(localStorage.getItem(`productIds`))
                console.log(getProducts);


                const req = await axios.post(`https://korzinka-server.onrender.com/purchase`, {
                    userId: user._id,
                    productIds: getProducts
                })

                console.log(req);


                if (req.data.success) {
                    const refUser = await axios.get(`https://korzinka-server.onrender.com/users/${user._id}`)
                    setUser(refUser.data)
                    localStorage.removeItem(`cart`)
                    localStorage.removeItem(`productIds`)
                    setSuccess(true)

                } else {
                    setMoney(true)
                }

            } else {
                alert(`Oldin akkaunt och`)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-4 py-10 pt-[90px]">
                <h1 className="text-3xl font-bold mb-6">🛒 Корзина</h1>

                {cart.length === 0 ? (
                    <p className="text-xl text-gray-500">Корзина пустая</p>
                ) : (
                    <div className="space-y-4">

                        {cart.map((item) => (
                            <div
                                key={item.product._id}
                                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />

                                    <div>
                                        <p className="text-lg font-semibold">
                                            {item.product.name}
                                        </p>
                                        <p className="text-[#e4002b] font-bold text-lg">
                                            {item.product.price} сум
                                        </p>
                                    </div>
                                </div>


                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => decreaseCount(item.product._id)}
                                        className="p-2 border rounded-lg hover:bg-gray-100"
                                    >
                                        <LuMinus size={18} />
                                    </button>

                                    <span className="text-lg font-semibold">
                                        {item.count}
                                    </span>

                                    <button
                                        onClick={() => increaseCount(item.product._id)}
                                        className="p-2 border rounded-lg hover:bg-gray-100"
                                    >
                                        <LuPlus size={18} />
                                    </button>
                                </div>


                                <button
                                    onClick={() => removeItem(item.product._id)}
                                    className="p-3 text-red-500 hover:text-red-700"
                                >
                                    <LuTrash2 size={22} />
                                </button>
                            </div>
                        ))}


                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 mt-6 flex justify-between items-center">
                            <p className="text-xl font-bold">Итого:</p>
                            <p className="text-2xl font-bold text-[#e4002b]">{totalPrice} сум</p>
                        </div>

                        <button onClick={buyProduct} className="w-full mt-4 bg-[#e4002b] text-white py-4 rounded-xl text-xl font-semibold hover:bg-[#cc001f]">
                            Перейти к оплате
                        </button>
                    </div>
                )}
            </div>

            {noMoney && <InsufficientFundsAnimation onClose={() => setMoney(false)} />}
            {success && <SuccessAnimation onClose={() => navigate(`/`)} />}
        </>
    );
};

export default CartPage;
