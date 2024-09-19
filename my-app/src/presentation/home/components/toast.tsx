import classNames from 'classnames'
import React from 'react'

interface ToastProps {
  title?: string
  label?: string
  icon?: string
  onClose?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const Toast = ({ title, label, icon = 'fa-solid fa-check text-green-500', onClose }: ToastProps) => {
  //---------------------
  // RENDER
  //---------------------
  return (
    <div className={classNames('min-h-[56px] p-4 rounded-md flex items-center gap-x-3 w-[896px] bg-orange-800 text-white')}>
      <i className={classNames(icon)}></i>
      <div className="flex flex-col w-[95%]">
        {title && <p className="w-full titleS">{title}</p>}
        {label && <p className="w-full bodyM">{label}</p>}
      </div>
      <i className={classNames('far fa-times text-white cursor-pointer')} onClick={(e) => onClose && onClose(e)}></i>
    </div>
  )
}
