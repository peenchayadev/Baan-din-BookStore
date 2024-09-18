import _ from 'lodash'
import React from 'react'

export const HomePage = () => {
  //---------------------
  //   CONST
  //---------------------
  const Books = [
    { title: "Harry Potter and the Philosopher's Stone" },
    { title: 'Harry Potter and the Chamber of Secrets' },
    { title: 'Harry Potter and the Prisoner of Azkaban' },
    { title: 'Harry Potter and the Goblet of Fire' },
    { title: 'Harry Potter and the Order of the Phoenix' },
    { title: 'Harry Potter and the Half-Blood Prince' },
    { title: 'Harry Potter and the Deathly Hallows' },
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
            <div key={`menu${i}`}>{Books}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
