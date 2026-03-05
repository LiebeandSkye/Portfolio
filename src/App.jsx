import React from 'react'
import Header from './components/Header/Header'
import Links from './components/SubHeader/Links'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
const App = () => {
  return (
    <div>
      <Header />
      <Links />
      <main className="p-6">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  )
}

export default App
