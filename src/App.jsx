import { Route, Routes } from 'react-router-dom'
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Movies from './pages/Movies'
import MoviesDetails from './pages/MovieDatails'

function App() {

  return (
    <>
      <div className='flex flex-col min-h-screen '>
        <Header />
        <main className='flex-grow'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<h1>Profile Page</h1>} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieName/:id/ticket" element={<MoviesDetails />} />
            <Route path='/profile' element={<Profile />} />
            <Route />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
