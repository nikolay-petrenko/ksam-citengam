export default () => {
  const $prices = $(`.previous-price, .current-price, .half-price`);
  const $currencies = $(`.currency`);
  const CurrencyMap = {
    руб: `₽`,
    грн: `₴`
  };
  
  $prices.each(function () {
    const $this = $(this);
    const initValue = $this.text();
    if (initValue.length > 3) {
      $this.text(`${initValue[0]} ${initValue.slice(1)}`);
    }
  });
  
  $currencies.each(function () {
    const $this = $(this);
    const initValue = $this.text();
    $this.text(CurrencyMap[initValue]);
  });
};