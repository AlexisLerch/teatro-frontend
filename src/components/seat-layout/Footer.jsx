import React from 'react'

const Footer = () => {

    const isSelected = false;

  return (
    <>
        {isSelected ? (
            <div className='bg-black py-3 px-6 flex items-center justify-between z-10'>
                <p className='text-base font-medium text-white'>2 Selected</p>
                <button className='bg-white cursor-pointer text-black px-6 py-2 rounded-lg font-semibold'>Proceed</button>
            </div>
        ) : (
            <div className='flex flex-col items-center bg-black'>
            <p className='text-xs font-bold text-purple-600 tracking-wider'>
                SCREEN THIS WAY
            </p>
            <div className='flex gap-2 text-xs mt-3'>
                <div className='flex items-center gap-1'>
                    <div className='w-3 h-3 border rounded-[4px] bg-white'></div>
                    <p className='text-white'>Avialable</p>
                    <div className='flex items-center gap-1'>
                        <div className=' w-3 h-3 bg-gray-200 border rounded-[4px] flex items-center justify-center'>
                            <small className='-mt-1'>x</small>
                        </div>
                        <p className='text-white'>Occupied</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <div className='w-3 h-3 bg-purple-600 rounded-[4px]'></div>
                        <p className='text-white'>Selected</p>
                    </div>
                </div>
            </div>
        </div>
        )}
    </>
  )
}

export default Footer