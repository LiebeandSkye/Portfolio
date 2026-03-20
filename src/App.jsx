import React from 'react'
import Header from './components/Header/Header'
import Links from './components/SubHeader/Links'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { ThemeProvider } from './components/context/ThemeContext'
import { NotificationProvider } from './components/context/NotificationContext'
import SakuPilot from './components/SakuPilot/SakuPilot'
const App = () => {
  return (
    <div>
      <ThemeProvider>
        <NotificationProvider>
          <Header />
          <Links />
          <main className="p-6">
            <Outlet />
          </main>
          <Footer />
        </NotificationProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
