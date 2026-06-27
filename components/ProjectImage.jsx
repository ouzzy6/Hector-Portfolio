import React, { useState, useEffect } from 'react'

function ProjectImage({ images, type, aspect = 'landscape', title }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // 🔍 DEBUG - Verifica qué está recibiendo el componente
  console.log('🔍 DEBUG ProjectImage:', { 
    title, 
    type, 
    aspect, 
    imagesCount: images?.length || 0,
    firstImage: images?.[0] || 'sin imagen'
  })
  
  // Si no hay imágenes, mostrar placeholder
  if (!images || images.length === 0) {
    return (
      <div className="project-image-placeholder">
        {title}
      </div>
    )
  }

  // Determinar la clase según el aspecto
  const aspectClass = aspect === 'square' ? 'project-image-square' : 'project-image-landscape'
  
  // 🔍 DEBUG - Verifica qué clase se está aplicando
  console.log('🔍 DEBUG Clase aplicada:', { 
    title, 
    aspect, 
    aspectClass,
    isSquare: aspect === 'square'
  })

  // Si es tipo 'single', mostrar una imagen fija
  if (type === 'single') {
    return (
      <div className={`project-image-container ${aspectClass}`}>
        <img 
          src={images[0]} 
          alt={title}
          className="project-image"
        />
      </div>
    )
  }

  // Si es tipo 'carousel', mostrar carrusel automático
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
      <div className={`project-image-container ${aspectClass}`}>
        <img 
          src={images[currentIndex]} 
          alt={`${title} - ${currentIndex + 1}`}
          className="project-image"
        />
        <div className="image-indicators">
          {images.map((_, index) => (
            <span 
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
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