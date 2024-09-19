import { createContext } from 'react'
import { makeAutoObservable } from 'mobx'

export interface ToastMetaData {
  title?: string
  label?: string
  icon?: string
  type?: 'success'
}

export class ToastContext {
  metaData?: ToastMetaData
  isOpen: boolean

  constructor() {
    this.isOpen = false
    makeAutoObservable(this)
  }

  //-------------------
  // ACTION
  //-------------------
  onOpen(options: ToastMetaData) {
    let icon = options.icon
    if (options.type) icon = this.iconSelectorByType(options.type)

    this.metaData = { ...options, icon: icon }
    this.isOpen = true

    setTimeout(() => {
      this.isOpen = false
    }, 3000)
  }

  onClose() {
    this.isOpen = false
  }

  iconSelectorByType(type: any) {
    switch (type) {
      case 'success':
        return 'fa-solid fa-check text-[20px] text-green-2'
    }
  }
}
export const toastContext = createContext(new ToastContext())
