// menu.js VERSI FINAL - My Track V2
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Ambil nama file html yang lagi dibuka. Misal: profil.html
  const currentPage = window.location.pathname.split("/").pop();

  // 2. Cek semua link di sidebar
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href'); // profil.html, ads.html, info.html

    // 3. Kalau cocok, kasih class 'active' ke <li> nya
    if (linkPage === currentPage) {
      link.parentElement.classList.add('active'); 
    }
  });

});
