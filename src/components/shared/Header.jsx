import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mainLogo from '../../assets/symbolic-icon.png'
import { FaBars, FaTimes } from "react-icons/fa"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="w-full bg-[#0a0a0a] text-white sticky top-0 z-50 shadow-lg border-b border-gray-800">
      {/* Top Navbar */}
      <div className="px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center py-4 relative">
          
          {/* Left: Logo */}
        <button onClick={() => navigate('/')}>
            <img 
                src={mainLogo} 
                alt="Teatro Colón Logo" 
                className="h-12 w-12 object-contain cursor-pointer" 
            />
          </button>

          {/* Center: Theater Name */}
          <h1 className="
            text-xl
            sm:text-2xl 
            md:text-3xl 
            lg:text-4xl 
            font-extrabold 
            tracking-wide 
            text-center 
            w-full
            uppercase
            text-gray-100
            drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]
          ">
            Teatro
          </h1>

          {/* Right: Sign In (Desktop only) */}
          <div className="hidden md:block absolute right-0">
            <button 
              onClick={() => navigate('/profile')}
              className="bg-gradient-to-r from-gray-700 to-gray-900 border border-gray-600 cursor-pointer text-white px-5 py-2 rounded text-sm font-medium hover:from-gray-600 hover:to-gray-800 transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white text-2xl absolute right-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Bottom Navbar (Desktop) */}
      <div className="hidden md:block bg-[#0d0d0d] border-t border-gray-800 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2 text-gray-400">
          <nav className="flex items-center space-x-8 font-medium text-lg">
            {["Cartelera", "Obras", "Eventos", "Clásicos", "Ballet", "Conciertos"].map((item) => (
              <span 
                key={item} 
                className="cursor-pointer hover:text-gray-100 transition-colors"
              >
                {item}
              </span>
            ))}
          </nav>

          <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-2 rounded text-sm font-medium hover:from-emerald-500 hover:to-emerald-600 transition-all shadow-md">
            Comprar Ticket
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-gray-800 px-6 pb-4 animate-fadeIn">
          <nav className="flex flex-col space-y-4 mt-3 text-gray-300 font-medium text-lg">
            {["Cartelera", "Obras", "Eventos", "Clásicos", "Ballet", "Conciertos"].map((item) => (
              <span 
                key={item} 
                className="cursor-pointer hover:text-gray-100 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </span>
            ))}
            <button 
              onClick={() => {
                setMenuOpen(false)
                navigate('/profile')
              }} 
              className="bg-gradient-to-r from-gray-700 to-gray-900 border border-gray-600 cursor-pointer text-white px-4 py-2 rounded text-sm font-medium hover:from-gray-600 hover:to-gray-800 transition-colors shadow-md"
            >
              Iniciar Sesión
            </button>
            <button 
              onClick={() => setMenuOpen(false)} 
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 w-full cursor-pointer text-white px-4 py-2 rounded text-sm font-medium hover:from-emerald-500 hover:to-emerald-600 transition-all mt-3 shadow-md"
            >
              Comprar Ticket
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
