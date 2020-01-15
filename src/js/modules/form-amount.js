export default () => {
  $(document).ready(() => {
    const $fakeButtons = $(`.form__set-amount`);
    $fakeButtons.click(() => $fakeButtons.toggleClass(`active`));
  });
};
