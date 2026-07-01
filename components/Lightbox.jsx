import React, { useState, useEffect } from 'react'

function Lightbox({ media, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Si media es un array, usamos el índice inicial
  const images = Array.isArray(media) ? media : [media]
  const currentMedia = images[currentIndex]

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Navegar con flechas del teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  // Cerrar al hacer clic fuera del contenido
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Detectar si es video
  const isVideo = (url) => {
    return url?.match(/\.(mp4|webm|ogg|mov)$/i)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="lightbox-overlay" onClick={handleOverlayClick}>
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={onClose}>✕</button>
        
        {/* Navegación */}
        {images.length > 1 && (
          <>
            <button className="lightbox-nav lightbox-prev" onClick={goToPrevious}>‹</button>
            <button className="lightbox-nav lightbox-next" onClick={goToNext}>›</button>
          </>
        )}
        
        {/* Media */}
        {isVideo(currentMedia) ? (
          <video 
            src={currentMedia}
            className="lightbox-media"
            controls
            autoPlay
            playsInline
          />
        ) : (
          <img 
            src={currentMedia} 
            alt={`Vista ampliada ${currentIndex + 1}`}
            className="lightbox-media"
          />
        )}

        {/* Indicadores */}
        {images.length > 1 && (
          <div className="lightbox-indicators">
            {images.map((_, index) => (
              <span 
                key={index}
                className={`lightbox-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Lightbox