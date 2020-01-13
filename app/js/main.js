import scrollSmooth from './helpers/smooth-scroll.js';
import form from './modules/form.js';
import formAmount from './modules/form-amount.js';
import about from './modules/about.js';

function main () {
  scrollSmooth();
  form();
  formAmount();
  about();
}

main();