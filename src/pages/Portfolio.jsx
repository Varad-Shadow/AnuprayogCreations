import React, { useEffect } from 'react'

const PROJECTS = [
  { id: 1, title: 'E-Commerce Platform', category: 'Web App', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', height: 'h-[400px]' },
  { id: 2, title: 'Fintech Dashboard', category: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1618477247222-ac60c6470cf5?auto=format&fit=crop&w=800&q=80', height: 'h-[300px]' },
  { id: 3, title: 'Smart Home Hub', category: 'Mobile App', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', height: 'h-[500px]' },
  { id: 4, title: 'Logistics System', category: 'Desktop App', img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80', height: 'h-[350px]' },
  { id: 5, title: 'Healthcare Analytics', category: 'Data Management', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80', height: 'h-[450px]' },
  { id: 6, title: 'Learning Management', category: 'Web App', img: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=800&q=80', height: 'h-[380px]' },
]

export default function Portfolio() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="section-tag mb-6 inline-block">Our Work</span>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-slate-900 tracking-tight">
            Selected <span className="text-indigo-600">Projects</span>
          </h1>
          <p className="mt-6 text-slate-600 text-xl max-w-2xl mx-auto font-normal">
            A showcase of our finest work across mobile, web, desktop and data engineering.
          </p>
        </div>

        {/* Masonry Grid via CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className={`relative w-full rounded-3xl overflow-hidden break-inside-avoid group shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-slate-100 border border-white/60 ${project.height}`}
            >
              <img 
                src={project.img} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' }}
              />
              
              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-indigo-300 font-bold tracking-wider text-sm uppercase mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-white font-bold text-2xl mb-4">{project.title}</h3>
                  <button className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full font-semibold transition-colors text-sm border border-white/20">
                    View Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
