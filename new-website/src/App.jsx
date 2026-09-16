import './App.css'

// pages
import Home from './pages/Home.jsx'
import Blogs from './pages/Blogs.jsx'
import Experience from './pages/Experience.jsx'
import Connect from './pages/Connect.jsx'
import Ratings from './pages/Ratings.jsx'

// components
import NavBar from './components/Navbar.jsx'
import Radio from './components/Radio.jsx'

import hero from './assets/hero.png'


import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </div>

      <Radio
        image={hero}
        alt=""
        title="Now Playing"
        description="Some description"
      />
    </>
  )
}

export default App

