import React from 'react'
import { Card } from 'react-bootstrap';

const GalleryItem = ({ galleryItem }) => {

  return (
    <Card className='my-3 p-3 rounded'  >
            <Card.Img src={galleryItem.image} variant='top' />
    </Card>
  )
}

export default GalleryItem