import React, { useContext } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { toast } from 'sonner'

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
}

interface CartProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  items: CartItem[]
  removeFromCart: (bookId: number) => void
  totalPrice: number
  discount: number
  finalPrice: number
  clearCart: Function
}

const Cart = ({ isOpen, setIsOpen, items, removeFromCart, totalPrice, discount, finalPrice, clearCart }: CartProps) => {
  if (!isOpen) return null
  //---------------------
  //   HANDLE
  //---------------------
  const handlePurchase = () => {
    toast.success('Purchase successful! Thank you for your order.')
    clearCart()
    setIsOpen(false)
  }

  //---------------------
  //   RENDER
  //---------------------
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className={classNames('bg-white p-6 rounded-lg max-w-[600px] mx-[10px]', { 'animate-cart-open': isOpen })}>
        {items.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <img src="/no-data.png" alt="" className="w-[200px] object-cover" />
            <p className="text-[24px] font-semibold">Your Cart is empty.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Your Order :</h2>
            {_.map(items, (item, i) => (
              <div key={i} className="flex justify-between items-center mb-2">
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <div>
                  <span className="ml-4">{item.price * item.quantity} baht</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-2">
                    <i className="fa-solid fa-trash text-red-800 hover:text-red-600 transition-all duration-500"></i>
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 border-t pt-4">
              <p>Total Price: {totalPrice} baht</p>
              <p>Discount: {discount} baht</p>
              <p className="font-bold">Final Price: {finalPrice} baht</p>
            </div>
          </>
        )}
        <div className="flex gap-[10px]">
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-slate-500 hover:bg-slate-800 transition-all duration-200  text-white px-4 py-2 rounded w-full"
          >
            Close
          </button>
          {items.length === 0 || (
            <button
              onClick={() => {
                handlePurchase()
              }}
              className="mt-4 bg-orange-800 hover:bg-orange-950 transition-all duration-200 text-white px-4 py-2 rounded w-full"
            >
              Buy it !
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
