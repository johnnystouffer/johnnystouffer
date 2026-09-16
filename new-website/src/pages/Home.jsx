import React from 'react'
import { Link } from 'react-router-dom'

import './css/Home.css'

export default function Home() {
    return (
        <div className="home-container">
            <h1>John Stouffer</h1>   
            <h3 className="subtitle-short">SWE I @ RTX</h3>
            <h3 className="subtitle-short">Prev @ Tesla</h3>
            <h3 className="subtitle-long"> Software Engineer @ RTX</h3>
            <h3 className="subtitle-long"> Previous Intern @ Tesla</h3>
            <p>Hello! Welcome to my website!</p>
        </div>
    );
}