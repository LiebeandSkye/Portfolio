import React from 'react'
import Header from './components/Header/Header'
import Links from './components/SubHeader/Links'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { ThemeProvider } from './components/context/ThemeContext'
import { NotificationProvider } from './components/context/NotificationContext'
import { SakuPilotProvider } from './components/context/SakuPilotContext.jsx'

const App = () => {
  const location = useLocation();
  const isImmersiveChat = location.pathname.includes('/sakupilot');

  return (
    <div className={isImmersiveChat ? "h-screen overflow-hidden bg-(--light)" : ""}>
      <ThemeProvider>
        <NotificationProvider>
          <SakuPilotProvider>
            {!isImmersiveChat && <Header />}
            {!isImmersiveChat && <Links />}
            <main className={isImmersiveChat ? "h-full w-full" : "p-6"}>
              <Outlet />
            </main>
            {!isImmersiveChat && <Footer />}
          </SakuPilotProvider>
        </NotificationProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
