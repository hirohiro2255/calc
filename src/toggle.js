const themeToggler = document.querySelector('#themeToggler');

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
      break;
    case '1':
      if (document.body.classList.contains('theme3')) {
        document.body.classList.remove('theme3');
      }
      if (document.body.classList.contains('theme1')) {
        document.body.classList.remove('theme1');
      }
      document.body.classList.add('theme2');
      break;
    default:
      if (document.body.classList.contains('theme1')) {
        document.body.classList.remove('theme1');
      }
      if (document.body.classList.contains('theme2')) {
        document.body.classList.remove('theme2');
      }
      document.body.classList.add('theme3');
  }
});
