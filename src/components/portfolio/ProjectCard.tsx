'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/constants'

interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.15 }}
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative aspect-[4/3] mb-5 overflow-hidden"
        style={{
          backgroundColor: 'var(--atlas-gray-100)',
          border: '2px solid var(--atlas-black)',
        }}
      >
        <div className="absolute inset-0 flex items-end p-4">
          <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--atlas-gray-300)' }}>
            {project.industry}
          </span>
        </div>
        <div
          className="absolute inset-0 transition-interactive"
          style={{
            border: '4px solid var(--atlas-red)',
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: 'var(--atlas-gray-500)' }}>
            {project.tags.join(' · ')}
          </p>
          <h2 className="text-lg font-bold uppercase tracking-tight transition-interactive" style={{ color: hovered ? 'var(--atlas-red)' : 'var(--atlas-black)' }}>
            {project.name}
          </h2>
          <p className="text-sm font-mono mt-2" style={{ color: 'var(--atlas-gray-500)' }}>
            {project.result}
          </p>
        </div>
        <span className="text-xl mt-1 flex-shrink-0 transition-interactive" style={{ color: hovered ? 'var(--atlas-red)' : 'var(--atlas-black)' }}>→</span>
      </div>
    </motion.article>
  )
}
