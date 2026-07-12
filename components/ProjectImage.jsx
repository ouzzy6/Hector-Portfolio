import React, { useState, useEffect } from 'react'

function ProjectImage({ images, type, aspect = 'landscape', size = 'full', title, text, columns = 2, onMediaClick }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Si no hay imágenes, mostrar placeholder
  if (!images || images.length === 0) {
    return (
      <div className="project-image-placeholder">
        {title}
      </div>
    )
  }

  // Determinar la clase según el aspecto
  const aspectClass = aspect === 'square' ? 'project-image-square' : aspect === 'portrait' ? 'project-image-portrait' : 'project-image-landscape'
  const sizeClass = size === 'small' ? 'project-image-small' : 'project-image-full'

  // Función para detectar si es video por extensión
  const isVideo = (url) => {
    return url?.match(/\.(mp4|webm|ogg|mov)$/i)
  }

  // Renderizar un solo archivo (imagen o video) con clic
  const renderMedia = (url, alt, index) => {
    const handleClick = () => {
      if (onMediaClick) {
        // Si es carrusel, pasamos todas las imágenes y el índice actual
        if (type === 'carousel') {
          onMediaClick(images, index)
        } else {
          onMediaClick([url], 0)
        }
      }
    }

    if (isVideo(url)) {
      return (
        <video 
          src={url}
          className="project-image"
          autoPlay
          muted
          loop
          playsInline
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        />
      )
    }
    return (
      <img 
        src={url} 
        alt={alt}
        className="project-image"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
    )
  }

  // Renderizar texto con formato (respeta saltos de línea y espacios)
  const renderText = (text) => {
    if (!text) return null
    
    const lines = text.split('\n')
    
    return (
      <div className="project-text">
        {lines.map((line, index) => {
          const displayLine = line === '' ? '\u00A0' : line
          return (
            <div 
              key={index} 
              className="project-text-line"
              dangerouslySetInnerHTML={{ 
                __html: displayLine.replace(/ /g, '&nbsp;') 
              }}
            />
          )
        })}
      </div>
    )
  }

  // Si es tipo 'single', mostrar un solo archivo
  if (type === 'single') {
    return (
      <div className={`project-image-container ${aspectClass} ${sizeClass}`}>
        {renderMedia(images[0], title, 0)}
      </div>
    )
  }

  // Si es tipo 'single-with-text', mostrar imagen + texto lado a lado
  if (type === 'single-with-text') {
    return (
      <div className={`project-image-with-text ${sizeClass}`}>
        <div className={`project-image-container ${aspectClass}`}>
          {renderMedia(images[0], title, 0)}
        </div>
        <div className="project-text-container">
          {renderText(text)}
        </div>
      </div>
    )
  }

  // Si es tipo 'grid', mostrar cuadrícula de imágenes/videos
  if (type === 'grid') {
    return (
      <div className={`project-grid ${sizeClass}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {images.map((url, index) => (
          <div key={index} className={`project-grid-item ${aspectClass}`}>
            {renderMedia(url, `${title} - ${index + 1}`, index)}
          </div>
        ))}
      </div>
    )
  }

  // Si es tipo 'carousel', mostrar carrusel automático (SIN INDICADORES)
  if (type === 'carousel') {
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
      }, 600)

      return () => clearInterval(interval)
    }, [images.length])

    return (
      <div className={`project-image-container ${aspectClass} ${sizeClass}`}>
        {renderMedia(images[currentIndex], `${title} - ${currentIndex + 1}`, currentIndex)}
      </div>
    )
  }

  // Fallback
  return (
    <div className="project-image-placeholder">
      {title}
    </div>
  )
}

export default ProjectImage