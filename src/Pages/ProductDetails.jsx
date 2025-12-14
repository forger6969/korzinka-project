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
                alert("Пожалуйста, войдите в аккаунт")
                return
            }

            if (reviewText.trim() !== "") {
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
            } else {
                alert(`Введите текст`)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const addToCart = () => {
        if (!product) return

        const cart = JSON.parse(localStorage.getItem("cart")) || []
        const productIds = JSON.parse(localStorage.getItem("productIds")) || []

        const index = cart.findIndex(item => item.product._id === product._id)

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

        const index = cart.findIndex(item => item.product._id === product._id)

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
        <div className="pt-28 px-6 max-w-7xl mx-auto bg-base-100">
            <AnimatePresence>
                {product && (
                    <>
                        {/* PRODUCT CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-10 card bg-white shadow-xl rounded-3xl p-6 mb-12"
                        >
                            <div className="relative">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="rounded-2xl object-cover w-full h-[400px] shadow-md"
                                />
                            </div>

                            <div className="flex flex-col gap-5">
                                <span className="badge badge-lg" style={{ backgroundColor: '#e4002b', color: 'white' }}>
                                    {product.category}
                                </span>

                                <h1 className="text-4xl font-bold">{product.name}</h1>

                                <p className="text-gray-600">{product.description}</p>

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-yellow-400 text-2xl">★</span>
                                    <span className="font-semibold text-lg">
                                        {product.rating} / 5
                                    </span>
                                </div>

                                <div className="text-3xl font-bold mt-2" style={{ color: '#e4002b' }}>
                                    {product.price} сум
                                </div>

                                {count === 0 ? (
                                    <button
                                        onClick={addToCart}
                                        className="btn mt-4 text-white"
                                        style={{ backgroundColor: '#e4002b' }}
                                    >
                                        Добавить в корзину
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-4 mt-4">
                                        <button
                                            onClick={minusFromCart}
                                            className="btn btn-outline"
                                            style={{ borderColor: '#e4002b', color: '#e4002b' }}
                                        >
                                            −
                                        </button>
                                        <span className="text-xl font-bold">{count}</span>
                                        <button
                                            onClick={addToCart}
                                            className="btn text-white"
                                            style={{ backgroundColor: '#e4002b' }}
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
                            className="card bg-white shadow-xl rounded-3xl p-6 mb-12"
                        >
                            <h2 className="text-2xl font-bold mb-4">Оставить отзыв</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input
                                    value={reviewText}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Ваш отзыв..."
                                    className="input input-bordered md:col-span-2"
                                />
                                <select
                                    value={reviewRating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className="select select-bordered"
                                >
                                    <option value="0">Оценка</option>
                                    <option value="1">1 ⭐</option>
                                    <option value="2">2 ⭐</option>
                                    <option value="3">3 ⭐</option>
                                    <option value="4">4 ⭐</option>
                                    <option value="5">5 ⭐</option>
                                </select>
                                <button
                                    onClick={postNewComment}
                                    className="btn text-white"
                                    style={{ backgroundColor: '#e4002b' }}
                                >
                                    Отправить
                                </button>
                            </div>
                        </motion.div>

                        {/* COMMENTS */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="card bg-white shadow-xl rounded-3xl p-6"
                        >
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Users size={22} />
                                Отзывы ({product.comments.length})
                            </h2>

                            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
                                {product.comments.map((m) => {
                                    const user =
                                        allUsers && allUsers.find((u) => u._id === m.userId)

                                    return (
                                        <div
                                            key={m._id}
                                            className="card bg-base-200 p-4 rounded-2xl shadow hover:shadow-lg transition"
                                        >
                                            <div className="flex justify-between mb-2">
                                                <p className="font-bold">
                                                    {user ? user.name : "Пользователь"}
                                                </p>
                                                <span className="text-yellow-400">
                                                    {"★".repeat(m.rating)}
                                                </span>
                                            </div>
                                            <p className="text-gray-600">{m.text}</p>
                                        </div>
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
