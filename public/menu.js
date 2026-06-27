// menu.js V=1 - MESIN SWIPE KIRI KANAN
const PAGES = ['profil.html', 'map.html', 'chat.html', 'nft.html', 'market.html', 'tour.html', 'link.html'];

let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
  let currentPage = window.location.pathname.split("/").pop();
  let currentIndex = PAGES.indexOf(currentPage);

  if (currentIndex === -1) return; // Kalo bukan halaman menu, diem

  if (touchendX < touchstartX - 50) { // SWIPE KIRI = NEXT
    let nextIndex = (currentIndex + 1) % PAGES.length;
    window.location.href = PAGES[nextIndex];
  }
  if (touchendX > touchstartX + 50) { // SWIPE KANAN = BACK
    let prevIndex = (currentIndex - 1 + PAGES.length) % PAGES.length;
    window.location.href = PAGES[prevIndex];
  }
}

document.addEventListener('touchstart', e => { touchstartX = e.changedTouches[0].screenX });
document.addEventListener('touchend', e => { touchendX = e.changedTouches[0].screenX; handleGesture(); });
