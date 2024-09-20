import React from 'react'
import classNames from 'classnames'

interface PrimaryButtonProps {
  title: string
  icon?: string
  disabled?: boolean | (() => boolean)
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const PrimaryButton = ({ icon, title, disabled, onClick }: PrimaryButtonProps) => {
  //---------------------
  //  RENDER
  //---------------------
  return (
    <button
      disabled={disabled as boolean}
      onClick={(e) => onClick(e)}
      className={classNames(
        ' w-full rounded-[6px] h-[34px] py-[8px] px-[12px] flex justify-center items-center labelM text-light-4 transition-all duration-500 gap-x-[8px]',
        {
          'bg-orange-800 cursor-pointer hover:hover:bg-orange-950': !disabled,
          'bg-slate-500 cursor-not-allowed': disabled,
        }
      )}
    >
      {icon && <i className={classNames(icon, 'text-white')}></i>}
      <div className="text-white">{title}</div>
    </button>
  )
}
