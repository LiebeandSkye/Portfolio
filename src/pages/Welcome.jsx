import React from 'react'
import MainLayout from './MainLayout'
import TechStacks from '../components/ui/TechStacks'
import Pinned from '../components/project/Pinned'
import PersonalisedGraph from '../components/ui/ContributionChart'
import { useLanguage } from '../components/context/LanguageContext'
import { NavLink } from 'react-router-dom'

const Welcome = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className='flex flex-col gap-8'>

        <div className='border border-(--border-light) w-full py-4 px-4 sm:px-6'>
          <p className='text-xs'>
            Kry-Rithisak<span className='text-(--text-gray)'> / </span>README<span className='text-(--text-gray)'>.md</span>
          </p>

          <h1 className='text-center w-full border-b border-(--border-light) py-4 text-2xl md:text-3xl font-semibold'>
            {t('bio')?.title}
          </h1>

          <p className='py-4 font-semibold text-base md:text-lg'>
            {t('bio')?.description}
          </p>

          <NavLink to="/contact">
            <button className='bg-(--sucess) text-white font-semibold py-1 px-3 rounded-md my-2 cursor-pointer'>
              {t('links')?.contact}
            </button>
          </NavLink>

          <h2 className='w-full border-b border-(--border-light) py-2 text-xl md:text-2xl font-semibold'>
            {t('bio')?.techStack}
          </h2>

          <TechStacks />

          <p className='py-8 text-sm'>{t('inspiration')}</p>
        </div>

        <Pinned />
        <PersonalisedGraph />

      </div>
    </MainLayout>
  )
}

export default Welcome
