export interface Book {
  id: number
  title: string
  img: string
  price: number
}

export interface CartItem extends Book {
  quantity: number
}
