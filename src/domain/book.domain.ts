export interface Book {
  id: number
  title: string
  img: string
  price: number
}

export interface CartItem extends Book {
  quantity: number
}

 export interface CartItem {
    id: number
    title: string
    price: number
    quantity: number
  }