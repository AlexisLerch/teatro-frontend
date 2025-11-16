import React from 'react'
import { ordersData } from '../../utils/constants'
import { MdChair } from 'react-icons/md'

const BookingHistory = () => {
  return (
    <>
        <div className='px-6 rounded-md'>
            <h3 className='text-xl font-semibold mb-4'>
                Tus Reservas
            </h3>
            {
                ordersData.map((order) => (
                    <>
                        <div key={order.id} className='bg-gray-900 p-5 rounded-md mb-2 overflow-hidden'>
                            <div
                            className='flex items-start gap-10'>
                                <img src={order.poster} alt="" className='w-30 h-40 object-cover rounded'/>
                                <div className='h-40 border-l border-gray-700 border-dashed'></div>
                                <div className='flex items-start justify-between w-full'>
                                    <div className='flex-1'>
                                        <p className='font-normal text-lg text-white'>{order.title}</p>
                                        <p className='text-sm mt-2 font-semibold text-white'>{order.format}</p>
                                        <p className='text-white text-sm font-semibold mt-2'>{order.datetime} - {order.cinema}</p>
                                        <small className='text-white mt-1'>Quantity: {order.quantity}</small>
                                        <p className='text-md text-white font-semibold mt-2'>
                                            <MdChair className='inline items-center mr-2' size={24} />
                                            {order.seats}
                                        </p>
                                    </div>
                                    <p className='text-white'>M-Ticket</p>
                                </div>
                            </div>
                            <div className='p-4 text-right text-white'>
                                <p className='text-xs text-white'>Ticket: {order.ticket.toFixed(2)} + Convenience Fees: ${order.fee.toFixed(2)}</p>
                                <p className='text-xl font-bold'>${order.total.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className='p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-8'>
                            <div>
                                <p className='font-semibold text-white'>Booking Date & Time</p>
                                <p className=' text-white'>{order.bookingTime}</p>
                            </div>
                             <div>
                                <p className='font-semibold text-white'>Payment Method</p>
                                <p className=' text-white'>{order.paymentMethod}</p>
                            </div>
                             <div>
                                <p className='font-semibold text-white'>Booking ID</p>
                                <p className=' text-white'>{order.id}</p>
                            </div>
                        </div>
                    </>
                ))
            }
        </div>
    </>
  )
}

export default BookingHistory