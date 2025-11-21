import React from 'react'
import mainLogo from '../../assets/symbolic-icon.png'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Header = ({showData}) => {
    console.log(showData)
    const navigate = useNavigate();
  return (
    <>
        <div className='border border-gray-200 shadow-sm bg-black'>
            {/* Top Bar */}
            <div className='flex items-center justify-between py-4 px-6'>
                {/* Logo */}
                <img onClick={() => navigate("/")}
                src={mainLogo} alt="logo" 
                className='h-10 md:h-12 object-contain cursor-pointer'/>

                <div className='text-center'>
                    <h2 className='font-bold text-lg md:text-xl text-white'>
                        {showData?.show?.movie?.title}
                    </h2>
                    <p className='text-xs text-gray-500 font-semibold'>
                        {dayjs(showData?.date,"DD-MM-YYYY").format("D MMMM YYYY")}
                        {showData?.startTime} at {showData?.show?.theater?.name + ", " + showData?.show?.theater?.city + ", " + showData?.show?.theater?.state}
                    </p>
                </div>

                <button className='bg-gray-900 text-white text-sm px-4 py-2 cursor-pointer rounded'>
                    Sign in
                </button>
            </div>
        </div>

        {/* Horarios */}
        <div className='bg-black pt-4'>
            <div className='mx-auto px-6 pb-4 flex items-center gap-4 max-w-7xl'>
                <div className=' text-sm text-gray-700'>
                    <p className='text-xs text-gray-500 font-medium'>
                        {dayjs(showData?.date,"DD-MM-YYYY").format("ddd")}
                    </p>
                    <p className='text-sm font-semibold text-gray-700'>
                        {dayjs(showData?.date,"DD-MM-YYYY").format("DD MMMM")}
                    </p>
                </div>
                <button className={`border cursor-pointer rounded-[14px] px-8 py-3 text-sm border-gray-900 font-medium bg-gray-200 text-black`}>
                    {showData?.show?.startTime}
                    <p className='text-[10px] text-gray-500 -mt-1'>{showData?.show?.audioType}</p>
                </button>
            </div>
        </div>
        <hr className='my-2 border-gray-300 max-w-7xl mx-auto' />
    </>
  )
}

export default Header