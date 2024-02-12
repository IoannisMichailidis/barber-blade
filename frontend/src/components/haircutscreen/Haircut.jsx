import React from 'react'
import { Card } from 'react-bootstrap';

const Haircut = ({ haircut }) => {

  return (
    <Card className='my-3 p-3 rounded'  >
            <Card.Img src={haircut.image} variant='top' />
        <Card.Body>
            <Card.Title as='div' className='card-title'>
                <strong>{haircut.title}</strong>
            </Card.Title>
            <Card.Text>
              Price: {haircut.price} $
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Haircut