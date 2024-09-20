import _ from 'lodash'
import { Toaster } from 'sonner'
import classNames from 'classnames'
import React, { useState } from 'react'
import Basket from '../components/cart'
import { BookList } from '../components/book-list'

interface Book {
  id: number
  title: string
  img: string
  price: number
}

interface CartItem extends Book {
  quantity: number
}

export const HomePage = () => {
  //---------------------
  //   CONST
  //---------------------
  const Books: Book[] = [
    { id: 1, title: "Harry Potter and the Philosopher's Stone Vol.1 (1997)", price: 100, img: '/1.jpg' },
    { id: 2, title: 'Harry Potter and the Chamber of Secrets Vol.2 (1998)', price: 100, img: '/2.jpg' },
    { id: 3, title: 'Harry Potter and the Prisoner of Azkaban Vol.3 (1999)', price: 100, img: '/3.jpg' },
    { id: 4, title: 'Harry Potter and the Goblet of Fire Vol.4 (2000)', price: 100, img: '/4.jpg' },
    { id: 5, title: 'Harry Potter and the Order of the Phoenix Vol.5 (2003)', price: 100, img: '/5.jpg' },
    { id: 6, title: 'Harry Potter and the Half-Blood Prince Vol.6 (2005)', price: 100, img: '/6.jpg' },
    { id: 7, title: 'Harry Potter and the Deathly Hallows Vol.7 (2007)', price: 100, img: '/7.jpg' },
  ]

  //---------------------
  //   STATES
  //---------------------
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  //---------------------
  //   HANDLE
  //---------------------
  const AddToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingItem = _.find(prevCart, { id: book.id })
      if (existingItem) {
        return _.map(prevCart, (item) => (item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...book, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => {
      return _.filter(
        _.map(prevCart, (item) => (item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item)),
        (item) => item.quantity > 0
      )
    })
  }

  const calculateDiscount = (cart: CartItem[]): number => {
    const uniqueBooksCount = _.uniqBy(cart, 'id').length
    let discountPercentage = 0

    switch (uniqueBooksCount) {
      case 2:
        discountPercentage = 0.1
        break
      case 3:
        discountPercentage = 0.2
        break
      case 4:
        discountPercentage = 0.3
        break
      case 5:
        discountPercentage = 0.4
        break
      case 6:
        discountPercentage = 0.5
        break
      case 7:
        discountPercentage = 0.6
        break
      default:
        discountPercentage = 0
    }

    const totalPrice = _.reduce(cart, (sum, book) => sum + book.price * book.quantity, 0)
    return totalPrice * discountPercentage
  }

  const totalItems = _.sumBy(cart, 'quantity')
  const totalPrice = _.sumBy(cart, (item) => item.price * item.quantity)
  const discount = calculateDiscount(cart)
  const finalPrice = totalPrice - discount

  const clearCart = () => {
    setCart([])
  }

  //---------------------
  //   RENDER
  //---------------------
  return (
    <div className="relative min-h-screen w-full fade-in">
      <Toaster />
      <img src="/bg_1.jpg" alt="bg" className="fixed inset-0 w-full h-full object-cover opacity-60 z-0" />
      <div className="relative z-10 pt-[20px] px-4 pb-8">
        <h1 className="text-4xl font-bold mb-[6px] text-center text-gray-800">Baan Nai Din Bookstore</h1>
        <h2 className="text-2xl font-semibold mb-[16px] text-center text-gray-700">Harry Potter Promotion</h2>
        <div className="flex justify-center">
          <div className="rounded-[10px] bg-gray-600 bg-opacity-80 p-[20px] max-w-[1400px] w-full">
            <BookList data={Books} addToCart={AddToCart} />
            <Basket
              isOpen={isCartOpen}
              setIsOpen={setIsCartOpen}
              items={cart}
              removeFromCart={removeFromCart}
              totalPrice={totalPrice}
              discount={discount}
              finalPrice={finalPrice}
              clearCart={clearCart}
            />
            <button
              className={classNames(
                'fixed bottom-4 right-4 bg-orange-600 hover:bg-orange-900 transition-all duration-200 text-white p-4 rounded-full shadow-lg'
              )}
              onClick={() => setIsCartOpen(true)}
            >
              <i className="fa-solid fa-cart-shopping mr-[4px] text-[15px] flex justify-center"></i>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
