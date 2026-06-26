function bukaMenu() {
  let pilihan = prompt(`Pilih Menu:
1. Dashboard Chart 📈
2. Galery NFT
3. Promo Ads 🔥
4. Tour n Travel
5. Google Map
6. Media Sosial
7. News
8. My World

Ketik 1-8`);

  // Routing sesuai pilihan
  if (pilihan === "1") {
    window.location.href = "dashboard.html"; 
  } 
  else if (pilihan === "2") {
    window.location.href = "nft-gallery.html";
  }
  else if (pilihan === "3") {
    window.location.href = "promo-ads.html";
  }
  else if (pilihan === "4") {
    window.location.href = "tour-travel.html";
  }
  else if (pilihan === "5") {
    window.location.href = "google-map.html";
  }
  else if (pilihan === "6") {
    window.location.href = "sosmed.html";
  }
  else if (pilihan === "7") {
    window.location.href = "news.html";
  }
  else if (pilihan === "8") {
    window.location.href = "my-world.html";
  }
  else if (pilihan === null) {
    // User pencet BATAL
    console.log("Menu dibatalkan");
  }
  else {
    alert("Ketik 1-8 ya bang 😅");
    bukaMenu(); // Balik lagi ke menu kalo salah ketik
  }
}

// Panggil pas tombol hamburger lu diklik
document.querySelector(".hamburger").addEventListener("click", bukaMenu);
