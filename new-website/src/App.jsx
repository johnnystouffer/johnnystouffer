import './App.css'

// pages
import Home from './pages/Home.jsx'
import Blogs from './pages/Blogs.jsx'
import Blog from './pages/Blog.jsx'
import Experience from './pages/Experience.jsx'
import Ratings from './pages/Ratings.jsx'

// components
import NavBar from './components/Navbar.jsx'
import Radio from './components/Radio.jsx'
import Background, { BACKGROUNDS } from './components/Background.jsx'
import Loader from './components/Loader.jsx'

import hero from './assets/hero.png'
import music from './assets/music.jpg'

import useKeyboardNav from './utils/useKeyboardNav.js'
import useImagesReady from './utils/useImagesReady.js'

const BACKGROUND_SRCS = Object.values(BACKGROUNDS)

import { Routes, Route } from 'react-router-dom'

function App() {
  useKeyboardNav()
  const { loaded, total, ready } = useImagesReady(BACKGROUND_SRCS)

  return (
    <>
      <Loader loaded={loaded} total={total} done={ready} />
      {ready && (
        <>
          <Background />
          <NavBar>
            {/* Actual Radio for a later update */}
            {/* <Radio
              image={music}
              alt=""
              title="Kayokyoku"
              artist="Taeko Onuki"
            /> */}
          </NavBar>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/blog/:slug" element={<Blog />} />
              <Route path="/ratings" element={<Ratings />} />
            </Routes>
          </div>
        </>
      )}
    </>
  )
}

export default App

