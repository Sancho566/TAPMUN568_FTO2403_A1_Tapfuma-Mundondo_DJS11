import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarouselContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 50px 0;
  background-color: ${({ theme }) => theme.carouselBackground || '#f5f5f5'};
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const ShowCard = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.cardBackground || '#fff'};
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  h3 {
    margin: 10px 0;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.text || '#333'};
  }
`;

const ShowCarousel = ({ shows, onCardClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {shows.map((show) => (
          <ShowCard key={show.id} onClick={() => onCardClick(show.id)}>
            <img src={show.image} alt={show.title} />
            <h3>{show.title}</h3>
          </ShowCard>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default ShowCarousel;
