import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import mainLogo from '../../assets/symbolic-icon.png'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className='bg-[#2b2b2b] text-gray-400 text-sm'>
        <div className='border-t border-gray-600 w-full' />
            <div className='flex flex-col items-center py-6'>
                <img src={mainLogo} alt="w-28 mb-4" />
            
            <div className='flex space-x-4 mb-4'>
                <FaFacebookF className='w-8 h-8 p-2 rounded-full bg-gray-700 text-white cursor-pointer'/>
                <FaXTwitter className='w-8 h-8 p-2 rounded-full bg-gray-700 text-white cursor-pointer'/>
                <FaInstagram className='w-8 h-8 p-2 rounded-full bg-gray-700 text-white cursor-pointer'/>
            </div>

            <p className='text-center text-xs px-4 max-w-4xl'>Copyright &copy; 2025. All rights reserved <br /> </p>
            <small>Terms of Use | Privacy Policy</small>
        </div>
    </footer>
  )
}

export default Footer