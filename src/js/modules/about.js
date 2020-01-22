export default () => {
  const BREAKPOINT = 1023;

  const $buttons = $('.about__show');
  const $items = $('.about__item');
  const $descriptions = $('.about__description');

  const setDescriptionsHeight = () => {
    $items.removeClass('show');
    if ($(window).outerWidth() <= 1023) {
      $descriptions.hide();
    } else {
      $descriptions.show();
    }
  };

  setDescriptionsHeight();

  $(window).resize(setDescriptionsHeight);

  $items.click(function () {
    if ($(window).outerWidth() > BREAKPOINT) {
      return;
    }

    const $currentItem = $(this);
    const $currentDescription = $currentItem.find('.about__description');

    $items.not($currentItem).removeClass('show');
    $descriptions.not($currentDescription).fadeOut();
    $currentItem.toggleClass('show');
    $currentDescription.fadeToggle();
  });
};
