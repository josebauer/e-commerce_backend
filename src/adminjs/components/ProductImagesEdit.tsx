import React, { useState, useEffect } from 'react'
import { EditPropertyProps } from 'adminjs'
import { Box, Label, DropZone, DropZoneItem } from '@adminjs/design-system'

const ProductImagesEdit: React.FC<EditPropertyProps> = (props) => {
  const { record, onChange, property } = props

  const [existingImages, setExistingImages] = useState<string[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])

  useEffect(() => {
    const value = record.params['productImages']
    if (value) {
      const initial = Array.isArray(value) ? value : [value]
      const urls = initial.filter((val) => typeof val === 'string')
      setExistingImages(urls)
    }
  }, [record.params])

  const handleRemoveImage = (url: string) => {
    const updated = existingImages.filter((img) => img !== url)
    setExistingImages(updated)

    onChange('productImages', updated)
  }

  const handleUploadChange = (files: File[]) => {
    setNewFiles(files)

    onChange('uploadImages', files)
  }

  return (
    <Box style={{ marginBottom: '1rem' }}>
      <Label>Imagens do Produto</Label>
      <DropZone 
        onChange={handleUploadChange} 
        multiple 
        mimeTypes={["image/jpeg", "image/png", "image/webp"]} 
      />
      <Box display="flex" flexDirection="column" flexWrap="wrap" gap="lg" mb="lg" syles={{ flexDirection: 'column' }}>
        {existingImages.map((url, index) => (
          <DropZoneItem
            key={index}
            src={`/${url}`}
            filename={url.split('/').pop() || `image-${index}`}
            removable={true}
            progress={100}
            status="uploaded"
            onRemoveClick={() => handleRemoveImage(url)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ProductImagesEdit
