import styled from 'styled-components';

export const Carousel = styled.div`
  margin-top: 5rem;

  .title-main {
    margin-bottom: 2.5rem;
  }
  .slick-slide > div {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
  }
`;

export const ItemCarousel = styled.div`
  box-shadow: 0 0 1rem var(--ddd-color);
  border: 1px solid var(--ddd-color);
`;

export const ItemHeader = styled.div`
  position: relative;

  .img-carousel {
  }
`;

export const ItemBody = styled.div`
  padding: 1rem;

  .item-title {
    font-size: 1.3rem;
    margin-bottom: 5px;
  }

  .item-box {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
  }

  .item-label {
    font-weight: 500;
    padding-right: 1rem;
  }
`;
