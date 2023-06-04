const themeToggler = document.querySelector('#themeToggler');

const KEY = 'favTheme';

const favTheme = localStorage.getItem(KEY);

if (favTheme !== null) {
  const toggler = document.querySelector('#themeToggler');
  document.body.classList.add(favTheme);
  switch (favTheme) {
    case 'theme1':
      toggler.value = 0;
      break;
    case 'theme2':
      toggler.value = 1;
      break;
    case 'theme3':
      toggler.value = 2;
      break;
  }
}

// Toggle color themes
themeToggler.addEventListener('change', (event) => {
  const themeNumber = event.target.value;
  switch (themeNumber) {
    case '0':
      if (document.body.classList.contains('theme2')) {
        document.body.classList.remove('theme2');
      }
      if (document.body.classList.contains('theme3')) {
        document.body.classList.remove('theme3');
      }
      document.body.classList.add('theme1');
      localStorage.setItem(KEY, 'theme1');
      break;
    case '1':
      if (document.body.classList.contains('theme3')) {
        document.body.classList.remove('theme3');
      }
      if (document.body.classList.contains('theme1')) {
        document.body.classList.remove('theme1');
      }
      document.body.classList.add('theme2');
      localStorage.setItem(KEY, 'theme2');
      break;
    default:
      if (document.body.classList.contains('theme1')) {
        document.body.classList.remove('theme1');
      }
      if (document.body.classList.contains('theme2')) {
        document.body.classList.remove('theme2');
      }
      document.body.classList.add('theme3');
      localStorage.setItem(KEY, 'theme3');
  }
});
