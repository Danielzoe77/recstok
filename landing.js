document.addEventListener("DOMContentLoaded", function() {
  let ul = document.querySelector('[x-ref="logos"]');
  ul.insertAdjacentHTML('afterend', ul.outerHTML);
  ul.nextSibling.setAttribute('aria-hidden', 'true');
});