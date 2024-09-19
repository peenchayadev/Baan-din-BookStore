import React from 'react'

interface BasketItem {
  id: number
  title: string
  price: number
  quantity: number
}

interface BasketProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  items: BasketItem[]
  removeFromBasket: (bookId: number) => void
  totalPrice: number
  discount: number
  finalPrice: number
}

const Basket: React.FC<BasketProps> = ({ isOpen, setIsOpen, items, removeFromBasket, totalPrice, discount, finalPrice }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Your Basket</h2>
        {items.length === 0 ? (
          <p>Your basket is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2">
                <span>
                  {item.title} (x{item.quantity})
                </span>
                <div>
                  <span className="mr-2">{item.price * item.quantity} baht</span>
                  <button onClick={() => removeFromBasket(item.id)} className="text-red-500">
                    Remove
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
        <button onClick={() => setIsOpen(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">
          Close
        </button>
      </div>
    </div>
  )
}

export default Basket
