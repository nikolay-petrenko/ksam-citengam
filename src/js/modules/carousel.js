export default () => {
  const settings = {
    dots: true,
    appendArrows: '.carousel__navigation',
    appendDots: '.carousel__navigation',
    dotsClass: 'carousel__dots',
    responsive: [
      {
        breakpoint: 640,
        settings: {
          adaptiveHeight: true
        }
      }
    ]
  };

  const $carousel = $('.carousel__carousel').slick(settings);
};
