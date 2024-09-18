import _ from 'lodash'
import React from 'react'

export const HomePage = () => {
  //---------------------
  //   CONST
  //---------------------
  const Books = [
    { id: 1, title: "Harry Potter and the Philosopher's Stone", price: 100 },
    { id: 2, title: 'Harry Potter and the Chamber of Secrets', price: 100 },
    { id: 3, title: 'Harry Potter and the Prisoner of Azkaban', price: 100 },
    { id: 4, title: 'Harry Potter and the Goblet of Fire', price: 100 },
    { id: 5, title: 'Harry Potter and the Order of the Phoenix', price: 100 },
    { id: 6, title: 'Harry Potter and the Half-Blood Prince', price: 100 },
    { id: 7, title: 'Harry Potter and the Deathly Hallows', price: 100 },
  ]

  //---------------------
  //   RENDER
  //---------------------
  return (
    <div className="relative w-screen h-screen fade-in">
      <img src="/bg_1.jpg" alt="bg" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1200px] h-[600px] bg-white rounded-[20px] p-[30px]">
          <p className="textNameAbout flex justify-center">BaanDin'BookStore-Harry Potter Promotion</p>
          <p className="textbuttonL">Select your book:</p>
          {_.map(Books, (item, i) => (
            <div key={`menu${i}`}>{item.tile}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
