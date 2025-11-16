import React from 'react'
import { tabs } from '../utils/constants'
import { IoIosLogOut, IoMdAdd } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import BookingHistory from '../components/profile/BookingHistory';

const Profile = () => {

    const [activeTab, setActiveTab] = React.useState("Profile");

  return (
    <>
        <div className='bg-gray-900'>
            <div className='max-w-7xl mx-auto flex flex-wrap gap-6 py-2 text-sm font-medium'>
            {
                tabs.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-1 cursor-pointer ${activeTab === tab ? 'border-b-2 border-b-red-600 text-red-600' : 'text-gray-600 hover:text-red-600'}`}>
                        {tab}
                    </button>
                ))
            }
            </div>
        </div>

        <div className='min-h-screen py-10 px-4 bg-black'> 
            <div className='max-w-6xl mx-auto'>
                {
                    activeTab === "Profile" && (
                        <>
                            <div className='bg-gradient-to-r from-gray-800 to-[#f74565] rounded-t-md px-6 py-6 flex items-center gap-6 text-white'>
                                <div className='relative w-20 h-20 border-4 border-white rounded-full flex items-center justify-center bg-white text-gray-600'>
                                    <IoMdAdd size={24} />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-2xl font-bold'>Hi, Alexis</h2>
                                    <small className='underline cursor-pointer'>
                                        <IoIosLogOut size={20} className='inline' /> Logout
                                    </small>
                                </div>
                            </div>

                            <div className='bg-gray-900 px-6 py-6 rounded-b-md'>
                                <h3 className='text-lg font-semibold mb-4 text-white'>Account Details</h3>
                                <div className='mb-3 flex items-center justify-between'>
                                    <p className='text-sm font-normal text-white'>Email Address</p>
                                    <div className='flex items-center gap-2 text-white'>
                                        <span>ejemplo123@example.com</span>
                                        <span className='text-green-600 text-xs bg-green100'>Verified</span>
                                    </div>
                                    <FiEdit className='text-pink-500 cursor-pointer'/>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p className='text-white'>Mobile number</p>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-white'>+1 234 567 8901</span>
                                        <span className='text-green-600 text-xs bg-green100'>Verified</span>
                                    </div>
                                    <FiEdit className='text-pink-500 cursor-pointer'/>
                                </div>
                            </div>

                            <div className='bg-gray-900 p-6 mt-4 rounded-md'>
                                <h3 className='text-lg text-white font-semibold mb-4'>Personal Details</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div >
                                        <label className='text-sm font-normal text-white'>Name</label>
                                        <input type="text" value="Alexis" readOnly className='w-full mt-1 border border-gray-200 text-white rounded-lg px-3 py-2'/>
                                    </div>
                                    <div >
                                        <label className='text-sm font-normal text-white'>Cumpleaños</label>
                                        <input type="date" value="Alexis" readOnly className='w-full mt-1 border border-gray-200 text-white rounded-lg px-3 py-2'/>
                                    </div>
                                    <div >
                                        <label className='text-sm font-normal text-white'>Name</label>
                                        <input type="text" value="Alexis" readOnly className='w-full mt-1 border border-gray-200 text-white rounded-lg px-3 py-2'/>
                                    </div>
                                    <div >
                                        <label className='text-sm font-normal text-white'>Name</label>
                                        <input type="text" value="Alexis" readOnly className='w-full mt-1 border border-gray-200 text-white rounded-lg px-3 py-2'/>
                                    </div>
                                </div>
                            </div>

                        </>
                    )}

                    {activeTab === "Your Orders" &&  <BookingHistory />}
            </div>
        </div>
    </>
  )
}

export default Profile