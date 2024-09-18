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
        <div className="w-[1200px] h-fit bg-white rounded-[20px] p-[30px] shadow-lg">
          <p className="textNameAbout flex justify-center text-2xl font-bold">BaanDin'BookStore - Harry Potter Promotion</p>
          <p className="textbuttonL mt-5 text-lg">Select your book:</p>
          {_.map(Books, (item, i) => (
            <div key={`menu${i}`} className="flex items-center justify-between mt-[5px] p-[12px] rounded-lg">
              <div className="texttitleAbout text-lg font-medium">
                {item.id}
                <span>.</span> {item.title}
              </div>
              <input
                type="number"
                min="0"
                className="w-[60px] h-[40px] text-gray-700 border border-gray-300 rounded-[5px] px-2
              transition-all duration-300  transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-400 focus:border-blue-400  outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
