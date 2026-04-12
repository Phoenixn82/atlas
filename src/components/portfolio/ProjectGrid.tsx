'use client'

import { useState } from 'react'
import { FilterBar } from './FilterBar'
import { ProjectCard } from './ProjectCard'
import { CaseStudyModal } from './CaseStudyModal'
import { PORTFOLIO_PROJECTS } from '@/lib/constants'
import type { Project } from '@/lib/constants'

type FilterTag = 'ALL' | 'WEB DESIGN' | 'SEO' | 'BUNDLES'

export function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('ALL')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filtered =
    activeFilter === 'ALL'
      ? [...PORTFOLIO_PROJECTS]
      : activeFilter === 'BUNDLES'
        ? PORTFOLIO_PROJECTS.filter(
            (p) =>
              (p.tags as readonly string[]).includes('WEB DESIGN') &&
              (p.tags as readonly string[]).includes('SEO')
          )
        : PORTFOLIO_PROJECTS.filter((p) =>
            (p.tags as readonly string[]).includes(activeFilter)
          )

  return (
    <>
      <FilterBar active={activeFilter} onChange={setActiveFilter} />

      <div className="grid grid-cols-12 gap-x-8 gap-y-16">
        {filtered.map((project) => (
          <div key={project.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <ProjectCard project={project as Project} onClick={setSelectedProject} />
          </div>
        ))}
      </div>

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
