import React from 'react'
import Header from '../components/seat-layout/Header'
import dayjs from 'dayjs'
import { FaInfoCircle } from 'react-icons/fa'
// import {  groupSeatsByType } from '../utils'

const Checkout = () => {

    const shows = {
        _id: "1",
        date: "12-10-2025",
        startTime: "10:00",
        movie: {
            title: "Mission: Impossible - The Final Reckoning",
            certification: "UA16+",
            languages: "English",
            format: "2D",
            posterUrl: "https://upload.wikimedia.org/wikipedia/en/3/30/Mission_Impossible_The_Final_Reckoning_poster.jpg",
        },
        theatre: {
            name: "PVR",
            city: "Kolkata",
            state: "West Bengal",
        },
    }

    const selectedSeats = [
        { type: "PREMIUM", seatNumber: "B5", price: 250 },
        { type: "EXECUTIVE", seatNumber: "C6", price: 250 },
    ]

    // const user = {
    //     name: "John Doe",
    //     phone: "1234567890",
    //     email: "0Sj8j@example.com",
    // }

    // const {base, tax, total } = calculateTotalPrice(selectedSeats)

  return (
    <div className='min-h-screen w-full bg-black'>
        <Header type="checkout" />

        <div className='max-w-6xl mx-auto px-4 py-6'>
            <div className='flex flex-col lg:flex-row gap-6'>
                <div className='flex-1 space-y-4'>
                    <div className='flex gap-4'>
                        <img src={shows.movie.posterUrl} alt="movie" className='w-[60px] h-[90px] rounded object-cover'/>
                        <div className=''>
                            <h3 className='font-semibold text-lg text-white'>{shows.movie.title}</h3>
                            <p className='text-sm text-gray-600'>
                                {shows.movie.certification} | {shows.movie.languages} | {shows.movie.format}
                            </p>
                            <p className='text-sm text-gray-600'>
                                {shows.theatre.name}, {shows.theatre.city}, {shows.theatre.state}
                            </p>
                        </div>
                    </div>
                    <div className='border border-gray-200 rounded-[24px] px-6 py-5'>
                        <p className='text-md font-medium border-b pb-5 text-gray-200'>
                            {dayjs(shows.date,"DD-MM-YYYY").format("D MMMM YYYY").split(" ").join(", ")} at {shows.startTime}
                        </p>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-md mt-2 font-semibold text-white'>{selectedSeats.length} Tickect</p>
                                <div className='text-sm text-gray-500'>
                                    <span className='font-medium'>
                                        {
                                            selectedSeats.map((seat) => (
                                                <p className='font-medium'>
                                                   {seat.type} - {seat.seatNumber}
                                                </p>
                                            ))
                                        }
                                    </span>
                                </div>
                            </div>
                            <p className='text-md font-semibold mt-2 text-white'>
                                <span className='text-gray-300'>$</span>
                                123
                            </p>
                        </div>
                    </div>

                    <div className='bg-black rounded-[24px] border-gray-200 text-yellow-800 text-sm px-6 py-5 tracking-wide'>
                        <span className='font-medium flex items-center gap-2'>
                            <FaInfoCircle size={24} /> No cancellation or refunded avilable after payment.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout