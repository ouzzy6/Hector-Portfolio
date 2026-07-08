import React, { useState } from 'react'
import './index.css'
import { projects } from './data/projects'
import ProjectImage from '../components/ProjectImage'

function App() {
  const [lightboxMedia, setLightboxMedia] = useState(null)

  const handleMediaClick = (media, index = 0) => {
    // Guardamos la URL de la imagen/video (no el array)
    const url = Array.isArray(media) ? media[index] : media
    setLightboxMedia(url)
  }

  const handleCloseLightbox = () => {
    setLightboxMedia(null)
  }

  // Detectar si es video
  const isVideo = (url) => {
    return url?.match(/\.(mp4|webm|ogg|mov)$/i)
  }

  return (
    <div className="app-layout">
      {/* Sidebar fijo a la izquierda */}
      <aside className="sidebar">
        <div className="sidebar-content">
          <div>
            <nav className="work-nav">
              <span className="nav-link work-label">Work</span>
              {projects.map((project) => (
                <a 
                  key={project.id}
                  href={`#project-${project.id}`}
                  className="nav-link project-link"
                >
                  {project.title}
                </a>
              ))}
            </nav>
          </div>

          <div className="sidebar-footer">
            <p>©2026 HÉCTOR LAPLAZA.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </aside>

      {/* Contenido principal a la derecha */}
      <main className="main-content">
        {/* Introducción personal */}
        <section id="intro" className="intro-section">
          <p className="intro-text">
            I'm Héctor, a graphic & digital designer based in Barcelona, focused on art direction, 
            visual systems and campaign content for fashion, culture and music.
          </p>
          <p className="intro-text">
            I work across design, image-making and motion to create campaigns, digital content 
            and visual universes with a distinctive voice. <br />
            My approach combines concept, aesthetics 
            and functionality to craft visuals that communicate, connect and build identity.
          </p>
        </section>

        {/* Proyectos */}
        {projects.map((project) => (
          <section 
            key={project.id}
            id={`project-${project.id}`}
            className="project-section"
          >
            {/* Información del proyecto */}
            <div className="project-info">
              {/* Título y cliente en la misma fila */}
              <div className="project-header">
                <h2 className="project-title">{project.title}</h2>
                {project.client && (
                  <span className="project-client">{project.client}</span>
                )}
              </div>
              {/* Categoría */}
              <p className="project-meta">{project.category}</p>
              {/* Año debajo de categoría */}
              <p className="project-year">{project.year}</p>
              {/* Descripción del proyecto */}
              {project.description && (
                <p className="project-description">{project.description}</p>
              )}
            </div>
            
            {/* Bloques de imágenes */}
            {project.imageBlocks && project.imageBlocks.map((block, index) => (
              <ProjectImage 
                key={index}
                images={block.images} 
                type={block.type}
                aspect={block.aspect}
                size={block.size}
                columns={block.columns}
                text={block.text}
                title={project.title}
                onMediaClick={handleMediaClick}
              />
            ))}
          </section>
        ))}
      </main>

      {/* Lightbox en el espacio central (sin overlay y sin botón cerrar) */}
      {lightboxMedia && (
        <div className="center-lightbox" onClick={handleCloseLightbox}>
          <div className="center-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {isVideo(lightboxMedia) ? (
              <video 
                src={lightboxMedia}
                className="center-lightbox-media"
                controls
                autoPlay
                playsInline
              />
            ) : (
              <img 
                src={lightboxMedia} 
                alt="Vista ampliada"
                className="center-lightbox-media"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App