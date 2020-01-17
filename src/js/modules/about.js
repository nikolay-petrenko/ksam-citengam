export default () => {
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

  $buttons.click(function () {
    const $this = $(this);
    const $currentItem = $this.parents('.about__item');
    const $currentDescription = $currentItem.find('.about__description');

    $items.not($currentItem).removeClass('show');
    $descriptions.not($currentDescription).fadeOut();
    $currentItem.toggleClass('show');
    $currentDescription.fadeToggle();
  });
};
