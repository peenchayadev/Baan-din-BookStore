import _ from 'lodash'
import React, { useState } from 'react'

interface Book {
  id: number
  img: string
  title: string
  price: number
}

interface BookItemProps {
  data: Book
  addToCart: Function
}

export const BookItem = (props: BookItemProps) => {
  //---------------------
  //   STATES
  //---------------------
  const [quantity, setQuantity] = useState(1)

  //---------------------
  //   HANDLE
  //---------------------
  const handleAddToBasket = () => {
    for (let i = 1; i < quantity; i++) {
      props.addToCart(props.data)
    }
    setQuantity(1)
  }

  //---------------------
  //  RENDER
  //---------------------
  return (
    <div>
      <div className="border bg-white p-4 rounded-lg shadow-md">
        <div className="w-full h-[192px]  mb-4 flex items-center justify-center rounded-[10px]">
          <img src={props.data.img} alt="" className="w-[50%] h-full object-cover" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{props.data.title}</h3>
        <p className="text-gray-600 mb-4">Price: {props.data.price} Baht</p>
        <div className="flex items-center mb-4">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="mx-[8px] w-[64px] text-center border rounded outline-none appearance-none
                     [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                     [-moz-appearance:textfield] focus:ring-2 focus:ring-gray-700
                     transition-all duration-300 ease-in-out
                     focus:scale-105 focus:shadow-lg"
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" onClick={handleAddToBasket} disabled={quantity === 0}>
          Add to Basket
        </button>
      </div>
    </div>
  )
}
