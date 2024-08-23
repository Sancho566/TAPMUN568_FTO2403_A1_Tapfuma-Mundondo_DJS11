import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

// Styled components for Carousel
const CarouselContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const ShowCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ShowImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ShowTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

// Carousel settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

const ShowCarousel = ({ shows }) => {
  return (
    <CarouselContainer>
      <Slider {...settings}>
        {shows.map((show) => (
          <ShowCard key={show.id}>
            <ShowImage src={show.image} alt={show.title} />
            <ShowTitle>{show.title}</ShowTitle>
          </ShowCard>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default ShowCarousel;
