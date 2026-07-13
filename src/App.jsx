import React, { useState } from 'react'
import './index.css'
import { projects } from './data/projects'
import ProjectImage from '../components/ProjectImage'

function App() {
  const [lightboxMedia, setLightboxMedia] = useState(null)
  const [lightboxImages, setLightboxImages] = useState(null)  // ← Array de imágenes del carrusel
  const [currentImageIndex, setCurrentImageIndex] = useState(0)  // ← Índice actual

  const handleMediaClick = (media, index = 0) => {
    // Si es un array (carrusel), guardamos todas las imágenes
    if (Array.isArray(media)) {
      setLightboxImages(media)
      setCurrentImageIndex(index)
      setLightboxMedia(media[index])  // Mostramos la imagen actual
    } else {
      // Si es una sola imagen
      setLightboxImages(null)
      setCurrentImageIndex(0)
      setLightboxMedia(media)
    }
  }

  const handleCloseLightbox = () => {
    setLightboxMedia(null)
    setLightboxImages(null)
    setCurrentImageIndex(0)
  }

  const handlePrevImage = () => {
    if (lightboxImages && lightboxImages.length > 0) {
      const newIndex = currentImageIndex === 0 ? lightboxImages.length - 1 : currentImageIndex - 1
      setCurrentImageIndex(newIndex)
      setLightboxMedia(lightboxImages[newIndex])
    }
  }

  const handleNextImage = () => {
    if (lightboxImages && lightboxImages.length > 0) {
      const newIndex = currentImageIndex === lightboxImages.length - 1 ? 0 : currentImageIndex + 1
      setCurrentImageIndex(newIndex)
      setLightboxMedia(lightboxImages[newIndex])
    }
  }

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

        {projects.map((project) => (
          <section 
            key={project.id}
            id={`project-${project.id}`}
            className="project-section"
          >
            <div className="project-info">
              <div className="project-header">
                <h2 className="project-title">{project.title}</h2>
                {project.client && (
                  <span className="project-client">{project.client}</span>
                )}
              </div>
              <p className="project-meta">{project.category}</p>
              <p className="project-year">{project.year}</p>
              {project.description && (
                <p className="project-description">{project.description}</p>
              )}
            </div>
            
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

      {/* Lightbox en el espacio central CON NAVEGACIÓN */}
      {lightboxMedia && (
        <div className="center-lightbox" onClick={handleCloseLightbox}>
          <div className="center-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Botón cerrar - X minimalista */}
            <button className="center-lightbox-close" onClick={handleCloseLightbox}>
              ✕
            </button>

            {/* Flecha izquierda (solo si hay más de una imagen) */}
            {lightboxImages && lightboxImages.length > 1 && (
              <button className="lightbox-nav lightbox-prev" onClick={handlePrevImage}>
                ‹
              </button>
            )}

            {/* Media */}
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

            {/* Flecha derecha (solo si hay más de una imagen) */}
            {lightboxImages && lightboxImages.length > 1 && (
              <button className="lightbox-nav lightbox-next" onClick={handleNextImage}>
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App