(function() {
  let copyrightYear = document.querySelector('.footer__copyright-text-year');
  let d = new Date();
  let y = d.getFullYear();
  copyrightYear.textContent = y;
})();