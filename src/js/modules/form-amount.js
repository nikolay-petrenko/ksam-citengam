export default () => {
  $(document).ready(() => {
    const $fakeButtons = $('.form__set-amount');
    $fakeButtons.click(function () {
      const $this = $(this);
      $fakeButtons.not($this).removeClass('active');
      $this.addClass('active');
    });
  });
};
