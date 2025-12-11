import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const LandingProducts = () => {
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [categories, setCategories] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [notification, setNotification] = useState(null) // уведомление
    const { t } = useTranslation()

    const getProducts = async () => {
        try {
            const req = await axios.get(`https://korzinka-server.onrender.com/products`)
            setProducts(req.data)

            const uniqueCategories = ['All', ...new Set(req.data.map(p => p.category))]
            setCategories(uniqueCategories)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProducts()
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        setCartCount(cart.reduce((acc, item) => acc + item.count, 0))
    }, [])

    const addToCart = (product) => {

        const productIds = JSON.parse(localStorage.getItem(`productIds`)) || []
        productIds.push(product._id)
        localStorage.setItem("productIds", JSON.stringify(productIds))

        const cart = JSON.parse(localStorage.getItem('cart')) || []
        const existing = cart.find(item => item.product._id === product._id)

        if (existing) {
            existing.count += 1
        } else {
            cart.push({ product, count: 1 })
        }

        localStorage.setItem('cart', JSON.stringify(cart))
        setCartCount(cart.reduce((acc, item) => acc + item.count, 0))

        // Показ notification
        setNotification(`${product.name} ${t("added_to_cart")}`)
        setTimeout(() => setNotification(null), 2000)
    }

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory)

    return (
        <div className="flex flex-col h-[80vh] p-4 w-[95%] mx-auto relative">
            {/* Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50"
                    >
                        {notification}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Корзина */}
            <div className="flex justify-end mb-2">
                <span className="px-4 py-2 bg-yellow-400 rounded-full font-bold text-gray-800">
                    {t("cart")}: {cartCount}
                </span>
            </div>

            {/* Категории */}
            <div className="mb-4">
                {categories.length <= 5 ? (
                    <div className="flex gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full border ${selectedCategory === cat ? 'bg-[#e4002b] text-white' : 'bg-white text-gray-700'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                ) : (
                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Продукты */}
            <div className="flex flex-wrap gap-[40px] pb-4 justify-center">
                {filteredProducts.map((product) => {
                    const price = product.price * 12000

                    return (
                        <div
                            key={product._id}
                            className="bg-white rounded-2xl shadow-md flex flex-col items-center relative min-w-[300px] max-w-[300px] pb-4"
                        >
                            <div className="relative w-full flex justify-center">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-32 object-cover rounded-t-2xl"
                                />
                                <div className="absolute -bottom-3 -right-3 bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center rotate-12 shadow-lg">
                                    <p className="text-red-600 font-bold text-sm text-center">
                                        {price.toLocaleString()} <span className="text-xs">/</span>
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 text-center px-2">
                                <p className="font-medium text-gray-800">{product.name}</p>
                                <p className="text-gray-400 text-sm mt-1">{product.description}</p>
                            </div>

                            <button
                                onClick={() => addToCart(product)}
                                className="mt-4 bg-[#e4002b] text-white border border-[#e4002b] rounded-full px-6 py-2 shadow hover:bg-red-700 transition"
                            >
                                {t("product_card_cart")}
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LandingProducts
