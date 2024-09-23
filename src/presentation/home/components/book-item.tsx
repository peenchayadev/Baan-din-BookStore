import _ from 'lodash'
import React, { useState } from 'react'
import { PrimaryButton } from './primary-button'
import { Book } from '@/domain/book.domain'

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
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
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
        <h3 className="text-lg font-semibold mb-2 titleM">{props.data.title}</h3>
        <p className="text-gray-600 mb-4">Price: {props.data.price} Baht</p>
        <div className="flex items-center mb-4">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-[20px] border rounded">
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="mx-[3px] w-[64px] text-center border rounded outline-none appearance-none
                     [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                     [-moz-appearance:textfield] focus:ring-2 focus:ring-gray-700
                     transition-all duration-300 ease-in-out
                     focus:scale-105 focus:shadow-lg"
          />
          <button onClick={() => setQuantity(quantity + 1)} className="w-[20px] border rounded">
            +
          </button>
        </div>
        <div>
          <PrimaryButton
            icon="fa-solid fa-cart-shopping"
            disabled={quantity === 0}
            title="ADD TO CART"
            onClick={() => {
              handleAddToCart()
            }}
          />
        </div>
      </div>
    </div>
  )
}
