import React from 'react'
import Header from './components/Header/Header'
import Links from './components/SubHeader/Links'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { ThemeProvider } from './components/context/ThemeContext'
import { NotificationProvider } from './components/context/NotificationContext'
import { SakuPilotProvider } from './components/context/SakupilotContext.jsx'
const App = () => {
  return (
    <div>
      <ThemeProvider>
        <NotificationProvider>
          <SakuPilotProvider>
            <Header />
            <Links />
            <main className="p-6">
              <Outlet />
            </main>
            <Footer />
          </SakuPilotProvider>
        </NotificationProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
