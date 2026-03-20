import React from 'react'
import Info from '../components/Info'
import InfoMobile from '../components/InfoMobile'
const MainLayout = ({ children }) => {
    return (
        <div className="max-w-[1400px] mx-auto px-0 sm:px-8 lg:px-24 py-6">

            <div className="flex flex-col md:flex-row gap-6">

                {/* SIDEBAR (FIXED WIDTH - NEVER SHRINKS) */}
                <div className="w-full md:w-[280px] flex-shrink-0">
                    <Info />
                    <InfoMobile />
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 min-w-0">
                    {children}
                </div>

            </div>

        </div>
    )
}

export default MainLayout