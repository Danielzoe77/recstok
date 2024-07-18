document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('navMenu');
  const closeMenuButton = document.getElementById('close');
  const dropdownElements = document.querySelectorAll('.dropdown');

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  closeMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
  
  dropdownElements.forEach((dropdown) => {
    const dropdownButton = dropdown.querySelector('.dropdownbtn');
    const dropdownMenu = dropdown.querySelector('.menu');
    const dropdownIcon = dropdownButton.querySelector('i');

    dropdownButton.addEventListener('click', () => {
      dropdownMenu.classList.toggle('hidden');
      dropdownIcon.classList.toggle('rotate-180');
    });
  });

  document.addEventListener('click', (e) => {
    dropdownElements.forEach((dropdown) => {
      const dropdownMenu = dropdown.querySelector('.menu');
      const dropdownIcon = dropdown.querySelector('i');

      if (!dropdown.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add('hidden');
        dropdownIcon.classList.remove('rotate-180');
      }
    });
  });

  const fileInput = document.getElementById('photo');
  const previewImage = document.getElementById('previewImage');

  fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImage.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
});
