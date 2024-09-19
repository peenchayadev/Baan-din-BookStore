import _ from 'lodash'
import React from 'react'
import { BookItem } from './book-item'

interface Book {
  id: number
  img: string
  title: string
  price: number
}

interface BookListProps {
  data: Book[]
  addToCart: Function
}

export const BookList = (props: BookListProps) => {
  const Books = _.map(props.data, (item) => ({ id: item.id, name: item.title, price: item.price, img: item.img }))
  //---------------------
  //   RENDER
  //---------------------
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px]">
      {_.map(Books, (item) => (
        <BookItem key={item.id} data={{ id: item.id, title: item.name, price: item.price, img: item.img }} addToCart={props.addToCart} />
      ))}
    </div>
  )
}
