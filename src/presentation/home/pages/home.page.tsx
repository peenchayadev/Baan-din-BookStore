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
  //
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

  // const calculateDiscount = (cart: CartItem[]): number => {
  //   const uniqueBooksCount = _.uniqBy(cart, 'id').length
  //   const discounts: number[] = [0, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
  //   const discountPercentage = discounts[uniqueBooksCount]

  //   return discountPercentage
  // }

  // const duplicateBooksPrice = _.sumBy(
  //   _.filter(cart, (item) => item.quantity > 1),
  //   (item) => item.price * item.quantity
  // )
  // const totalItems = _.sumBy(cart, 'quantity')
  // const totalPrice = _.sumBy(cart, (item) => item.price * item.quantity)

  // const discount = calculateDiscount(cart)
  // const discountAmount = duplicateBooksPrice * discount
  // const finalPrice = totalPrice - discountAmount

  const calculatePrice = (cart: CartItem[], books: Book[]) => {
    let totalPrice = 0
    let totalDiscount = 0
    let remainingBooks = _.cloneDeep(cart)

    const getBookPrice = (bookId: number, quantity: number) => {
      const bookData = _.find(books, { id: bookId })
      return bookData ? bookData.price * quantity : 0
    }

    // ฟังก์ชันย่อยสำหรับคำนวณส่วนลดจากจำนวนเล่มที่ไม่ซ้ำกัน
    const calculateDiscount = (uniqueCount: number, setPrice: number) => {
      const discountPercentage = (uniqueCount - 1) * 0.1 // ส่วนลด 10% ต่อเล่มที่ไม่ซ้ำ
      return Math.floor(setPrice * discountPercentage)
    }

    // วนลูปคำนวณราคาจาก remainingBooks จนกว่า quantity ของทุกเล่มจะเป็น 0
    // ex.1
    // ภาค 1 3 เล่ม
    // ภาค 2 3 เล่ม
    while (_.sumBy(remainingBooks, 'quantity') > 0) {
      const uniqueBooks = _.filter(remainingBooks, (item) => item.quantity > 0)
      console.log(uniqueBooks) // = obj ที่เหลือในตะกร้า 3 ตัว
      const uniqueCount = uniqueBooks.length
      console.log(uniqueCount) // จำนวนที่เหลือเหลือในตะกร้า = 3

      if (uniqueCount > 1) {
        // คำนวณราคารวมของหนังสือที่ไม่ซ้ำกัน
        const setPrice = _.sumBy(uniqueBooks, (book) => getBookPrice(book.id, 1))
        //มีแค่ id ของแต่ละเล่ม อย่างละ 1 เล่ม * 100 = 200
        console.log(setPrice)
        totalPrice += setPrice //รอบที่ 1 ได้ 200
        console.log(totalPrice)

        // คำนวณส่วนลดและเพิ่มใน totalDiscount
        const setDiscount = calculateDiscount(uniqueCount, setPrice) //10%
        console.log(setDiscount)
        totalDiscount += setDiscount //รอบแรก 20 บาท
        console.log(totalDiscount)

        // ลดจำนวนหนังสือลงทีละ 1 ใน remainingBooks
        remainingBooks = _.map(remainingBooks, (book) => ({
          ...book,
          quantity: Math.max(0, book.quantity - 1),
        }))
        console.log(remainingBooks)
      } else {
        // คำนวณราคาในกรณีเหลือหนังสือเล่มเดียวหรือซ้ำ
        const remainingPrice = _.sumBy(remainingBooks, (book) => getBookPrice(book.id, book.quantity))
        totalPrice += remainingPrice
        break
      }
    }

    // คำนวณราคาสุทธิหลังหักส่วนลด
    const finalPrice = Math.floor(totalPrice - totalDiscount)
    const totalItems = _.sumBy(cart, 'quantity')

    return {
      totalItems,
      totalPrice,
      discountAmount: totalDiscount,
      finalPrice,
    }
  }

  const { totalItems, totalPrice, discountAmount, finalPrice } = calculatePrice(cart, Books)

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
              discount={discountAmount}
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
