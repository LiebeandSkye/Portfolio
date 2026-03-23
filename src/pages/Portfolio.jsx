import React, { useState, useMemo } from 'react'
import MainLayout from './MainLayout'
import PortfolioHeader from '../components/PortfolioHead/PortfolioHeader'
import ProjectList from '../components/project/ProjectList'
import ProjectGrid from '../components/project/ProjectGrid'
import Projects from '../Data/Projects'
import SakuPilot from '../components/SakuPilot/SakuPilot'

const Portfolio = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState('list');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const allTags = useMemo(() => {
    const tags = new Set();
    Projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return Projects;
    return Projects.filter(p => p.tags.some(t => selectedTags.includes(t)));
  }, [selectedTags]);

  return (
    <MainLayout>

      <PortfolioHeader 
        allTags={allTags}
        selectedTags={selectedTags}
        onTagChange={(tag) =>
          setSelectedTags(prev =>
            prev.includes(tag)
              ? prev.filter(t => t !== tag)
              : [...prev, tag]
          )
        }
        onClearFilters={() => setSelectedTags([])}
        view={view}
        setView={setView} 
        onOpenChat={() => setIsChatOpen(true)}
      />

      <div className='mt-6'>
        {view === 'list' ? (
          <ProjectList projects={filteredProjects} />
        ) : (
          <ProjectGrid projects={filteredProjects} />
        )}
      </div>
        {/*for this u need to call outside ur root div*/}
        <SakuPilot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </MainLayout>
  )
}

export default Portfolio