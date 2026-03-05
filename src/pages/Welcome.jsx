import React from 'react'
import Info from '../components/Info'
import TechStacks from '../components/ui/TechStacks'
import Pinned from '../components/project/Pinned'
import PersonalisedGraph from '../components/ui/ContributionChart'
import { useLanguage } from '../components/Header/Lang/LanguageContext'
import { NavLink } from 'react-router-dom'
const Welcome = () => {
  const { t } = useLanguage();
  return (
    <div>
      <div className='px-24 py-6 flex gap-5'>
        <Info/>
        <div className='flex flex-col gap-8'>
          <div className='border border-(--border-light) w-full h-fit py-4 px-6'>
            <p className='text-xs'>Kry-Rithisak<span className='text-(--text-gray)'> / </span>README<span className='text-(--text-gray)'>.md</span></p>
            <h1 className='text-center w-full border-b border-(--border-light) py-4 text-3xl font-semibold'>{t('bio')?.title}</h1>
            <p className='py-4 font-semibold text-lg'>{t('bio')?.description}</p>
            <NavLink to="/contact"><button className='bg-(--sucess) text-white font-semibold py-1 px-3 rounded-md my-2 cursor-pointer'>{t('links')?.contact}</button></NavLink>
            <h1 className='w-full border-b border-(--border-light) py-2 text-2xl font-semibold'>{t('bio')?.techStack}</h1>
            <TechStacks />
            <p className='py-8 text-sm'>{t('inspiration')}</p>
          </div>
          <Pinned />
          <PersonalisedGraph />
        </div>
      </div>
    </div>
  )
}

export default Welcome
