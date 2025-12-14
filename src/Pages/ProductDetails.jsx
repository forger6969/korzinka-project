import axios from "axios"
import { Users } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReviewSuccess from "../Components/ReviewSuccess"
import { motion, AnimatePresence } from "framer-motion"

const ProductDetails = () => {
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [allUsers, setUsers] = useState(null)
    const [successOpen, setSuccess] = useState(false)

    const [reviewText, setText] = useState("")
    const [reviewRating, setRating] = useState(0)
    const [count, setCount] = useState(0)

    const getProductsByID = async () => {
        try {
            const productReq = await axios.get(
                `https://korzinka-server.onrender.com/products/${id}`
            )
            setProduct(productReq.data)

            const usersReq = await axios.get(
                `https://korzinka-server.onrender.com/users`
            )
            setUsers(usersReq.data)

            const cart = JSON.parse(localStorage.getItem("cart")) || []
            const find = cart.find(item => item.product._id === id)
            setCount(find ? find.count : 0)
        } catch (err) {
            console.log(err)
        }
    }

    const postNewComment = async () => {
        try {
            const getUserID = JSON.parse(localStorage.getItem("currentUserID"))

            if (!getUserID) {
                alert("Akkountga kir")
                return
            }

            const req = await axios.post(
                `https://korzinka-server.onrender.com/products/${id}/comments`,
                {
                    userId: getUserID,
                    text: reviewText,
                    rating: reviewRating
                }
            )

            if (req.status === 200) {
                setSuccess(true)
                setText("")
                setRating(0)
                getProductsByID()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addToCart = () => {
        if (!product) return

        const cart = JSON.parse(localStorage.getItem("cart")) || []
        const productIds = JSON.parse(localStorage.getItem("productIds")) || []

        const index = cart.findIndex(
            item => item.product._id === product._id
        )

        if (index !== -1) {
            cart[index].count += 1
            setCount(cart[index].count)
        } else {
            cart.push({ product, count: 1 })
            setCount(1)
        }

        productIds.push(product._id)

        localStorage.setItem("cart", JSON.stringify(cart))
        localStorage.setItem("productIds", JSON.stringify(productIds))
    }

    const minusFromCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || []
        let productIds = JSON.parse(localStorage.getItem("productIds")) || []

        const index = cart.findIndex(
            item => item.product._id === product._id
        )

        if (index === -1) return

        cart[index].count -= 1

        const idIndex = productIds.indexOf(product._id)
        if (idIndex !== -1) productIds.splice(idIndex, 1)

        if (cart[index].count === 0) {
            cart.splice(index, 1)
            productIds = productIds.filter(id => id !== product._id)
            setCount(0)
        } else {
            setCount(cart[index].count)
        }

        localStorage.setItem("cart", JSON.stringify(cart))
        localStorage.setItem("productIds", JSON.stringify(productIds))
    }

    useEffect(() => {
        getProductsByID()
    }, [])

    return (
        <div className="pt-[120px] px-6 max-w-7xl mx-auto bg-gradient-to-b from-[#fafafa] to-white">
            <AnimatePresence>
                {product && (
                    <>
                        {/* PRODUCT CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[32px] shadow-2xl p-8 mb-14"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-[#e4002b] opacity-10 blur-2xl rounded-3xl" />
                                <motion.img
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.5 }}
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="relative w-full h-[420px] object-cover rounded-3xl shadow-xl"
                                />
                            </div>

                            <div className="flex flex-col gap-6">
                                <div>
                                    <span className="inline-block px-4 py-1 rounded-full bg-[#e4002b]/10 text-[#e4002b] font-semibold text-sm">
                                        {product.category}
                                    </span>
                                </div>

                                <h1 className="text-5xl font-extrabold text-[#302E33]">
                                    {product.name}
                                </h1>

                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {product.description}
                                </p>

                                <div className="flex items-center gap-3">
                                    <span className="text-yellow-400 text-3xl">★</span>
                                    <span className="font-bold text-xl">
                                        {product.rating} / 5
                                    </span>
                                </div>

                                <div className="text-4xl font-extrabold text-[#e4002b]">
                                    {product.price} сум
                                </div>

                                {count === 0 ? (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={addToCart}
                                        className="mt-6 px-10 py-5 bg-[#e4002b] text-white rounded-2xl text-xl shadow-xl"
                                    >
                                        Добавить в корзину
                                    </motion.button>
                                ) : (
                                    <div className="flex items-center gap-6 mt-6">
                                        <button
                                            onClick={minusFromCart}
                                            className="w-14 h-14 rounded-2xl bg-gray-100 text-3xl hover:bg-gray-200 transition"
                                        >
                                            −
                                        </button>

                                        <span className="text-3xl font-bold">
                                            {count}
                                        </span>

                                        <button
                                            onClick={addToCart}
                                            className="w-14 h-14 rounded-2xl bg-[#e4002b] text-white text-3xl hover:scale-110 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* REVIEW FORM */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl shadow-xl p-8 mb-14"
                        >
                            <h2 className="text-3xl font-bold mb-6">
                                Оставить отзыв
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input
                                    value={reviewText}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Ваш отзыв..."
                                    className="md:col-span-2 border rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-[#e4002b]"
                                />

                                <select
                                    value={reviewRating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className="border rounded-2xl px-4 py-4 text-lg"
                                >
                                    <option value="0">Оценка</option>
                                    <option value="1">1 ⭐</option>
                                    <option value="2">2 ⭐</option>
                                    <option value="3">3 ⭐</option>
                                    <option value="4">4 ⭐</option>
                                    <option value="5">5 ⭐</option>
                                </select>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-[#e4002b] text-white rounded-2xl text-lg font-semibold"
                                    onClick={postNewComment}
                                >
                                    Отправить
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* COMMENTS */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-3xl shadow-xl p-8"
                        >
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Users size={26} />
                                Отзывы ({product.comments.length})
                            </h2>

                            <div className="grid gap-5">
                                {product.comments.map((m) => {
                                    const user =
                                        allUsers && allUsers.find((u) => u._id === m.userId)

                                    return (
                                        <motion.div
                                            key={m._id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="rounded-2xl border p-5 hover:shadow-lg transition"
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="font-bold text-lg">
                                                    {user ? user.name : "Пользователь"}
                                                </p>
                                                <span className="text-yellow-400 text-lg">
                                                    {"★".repeat(m.rating)}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-lg">
                                                {m.text}
                                            </p>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {successOpen && <ReviewSuccess onClose={() => setSuccess(false)} />}
        </div>
    )
}

export default ProductDetails
