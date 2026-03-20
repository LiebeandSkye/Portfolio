import React from 'react'
import Kry_Rithisak from '../../assets/Kry_Rithisak.jpg'
import Burger from '../ui/Burger'
const Navigation = () => {
    return (
        <div className='flex items-center gap-2 ml-3 md:ml-0'>
            <div className='w-9 h-9 rounded-full overflow-hidden'>
                <img src={Kry_Rithisak} alt="" className="w-full h-full object-cover" />
            </div>
            <Burger />
        </div>
    )
}

export default Navigation
