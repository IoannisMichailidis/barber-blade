import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// Components
import GalleryItem from '../components/galleryscreen/GalleryItem';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import GalleryPaginate from '../components/galleryscreen/GalleryPaginate';
// Slices
import { useGetGalleryQuery } from '../slices/galleryApiSlice';

const GalleryScreen = () => {
  const { pageNumber } = useParams();

  // API Slice
  const { data, isLoading, error} = useGetGalleryQuery({pageNumber});

  return (
    <>
        { isLoading ? (
        <Loader/>
        ) : error ? (
        <Message variant='danger'>
            Something went wrong! {error.data?.message || error.error}
        </Message>
        ) : (
        <>
            <Row>
                <h1 className='text-center py-3 mb-4'>Gallery</h1>
            </Row>

            <Row>
                {data.results.map((galleryItem) => (
                    <Col key={galleryItem.id} sm={12} md={6} lg={4} xl={3}>
                        <GalleryItem galleryItem={galleryItem} />
                    </Col>
                ))}
            </Row>
            <GalleryPaginate
                pages={data.pages}
                page={data.page}
            />
      </>
    ) }

  </>
  )
}

export default GalleryScreen;