import _ from 'lodash'
import { Book, CartItem } from '@/domain/book.domain'
// const calculateDiscount = (cart: CartItem[], setPrice: number) => {
//   const uniqueBooksCount = _.uniqBy(cart, 'id').length
//   const discounts: number[] = [0, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
//   const discountPercentage = discounts[uniqueBooksCount]

//   return Math.floor(setPrice * discountPercentage)
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

export const calculatePrice = (cart: CartItem[], books: Book[]) => {
  let totalPrice = 0
  let totalDiscount = 0
  let remainingBooks = _.cloneDeep(cart)

  const getBookPrice = (bookId: number, quantity: number) => {
    const bookData = _.find(books, { id: bookId })
    return bookData ? bookData.price * quantity : 0
  }

  const calculateDiscount = (cart: CartItem[], setPrice: number) => {
    const uniqueBooksCount = _.uniqBy(cart, 'id').length
    const discounts: number[] = [0, 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
    const discountPercentage = discounts[uniqueBooksCount]

    return Math.floor(setPrice * discountPercentage)
  }

  while (_.sumBy(remainingBooks, 'quantity') > 0) {
    const uniqueBooks = _.filter(remainingBooks, (item) => item.quantity > 0)
    const uniqueCount = uniqueBooks.length

    if (uniqueCount > 1) {
      const setPrice = _.sumBy(uniqueBooks, (book) => getBookPrice(book.id, 1))
      totalPrice += setPrice

      const setDiscount = calculateDiscount(cart, setPrice)
      totalDiscount += setDiscount

      remainingBooks = _.map(remainingBooks, (book) => ({
        ...book,
        quantity: Math.max(0, book.quantity - 1),
      }))
    } else {
      const remainingPrice = _.sumBy(remainingBooks, (book) => getBookPrice(book.id, book.quantity))
      totalPrice += remainingPrice
      break
    }
  }
  const finalPrice = Math.floor(totalPrice - totalDiscount)
  const totalItems = _.sumBy(cart, 'quantity')

  return {
    totalItems,
    totalPrice,
    discountAmount: totalDiscount,
    finalPrice,
  }
}
