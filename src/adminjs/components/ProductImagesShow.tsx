import React from 'react'
import { ShowPropertyProps } from 'adminjs'
import { Label } from '@adminjs/design-system'

const ProductImagesShow: React.FC<ShowPropertyProps> = ({ record, property }) => {
  const images = record?.params?.[property.path] || [];
  const imageUrls = Array.isArray(images) ? images : [images]

  return (
    <>
      <Label style={{ color: "#4D4D4D" }}>Imagens do produto</Label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        {imageUrls.map((url: string, index: number) => (
          <img
            key={index}
            src={`/${url}`}
            alt={`Product ${index}`}
            style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }}
          />
        ))}
      </div>
    </>
  )
}

export default ProductImagesShow