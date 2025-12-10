import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LandingProducts = () => {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const req = await axios.get(`https://dummyjson.com/products/category/groceries?limit=5`)
            setProducts(req.data.products)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {products.map((product) => {
                const price = product.price * 12000

                return (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center p-4 relative"
                    >
                        <div className="relative w-full flex justify-center">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-32 h-32 object-cover"
                            />
                            <div className="absolute -bottom-3 -right-3 bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center rotate-12 shadow-lg">
                                <p className="text-red-600 font-bold text-sm text-center">
                                    {price.toLocaleString()} <span className="text-xs">/ кг</span>
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="font-medium text-gray-800">{product.title}</p>
                            <p className="text-gray-400 text-sm mt-1">1 кг</p>
                        </div>

                        <button className="mt-4 bg-white border border-gray-200 rounded-full px-6 py-2 shadow hover:bg-gray-100 transition">
                            Sotib olish
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default LandingProducts
