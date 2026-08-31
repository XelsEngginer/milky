// Inisialisasi efek background hati mengambang otomatis
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("heartsContainer");
    const heartCount = 15;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        
        heart.style.left = Math.random() * 100 + "%";
        heart.style.animationDuration = (Math.random() * 4 + 4) + "s";
        heart.style.animationDelay = (Math.random() * 3) + "s";
        
        const scale = Math.random() * 0.6 + 0.7;
        heart.style.transform = `rotate(45deg) scale(${scale})`;

        container.appendChild(heart);
    }
});

// Fungsi saat tombol "Buka Kado" ditekan di awal
function bukaKado() {
    const landingCard = document.getElementById("landingCard");
    const mainCard = document.getElementById("mainCard");

    landingCard.style.transition = "all 0.5s ease";
    landingCard.style.transform = "scale(0)";
    setTimeout(() => {
        landingCard.style.display = "none";
        mainCard.style.display = "block";
    }, 500);
}

let tahap = 0;

function lari() {
    const btnNo = document.getElementById("btnNo");
    if (!btnNo) return;

    // Pastikan tombol selalu fixed dan punya z-index tertinggi agar tidak tertutup apapun
    btnNo.style.position = "fixed";
    btnNo.style.zIndex = "99999";

    const padding = 40;
    const maxX = window.innerWidth - btnNo.offsetWidth - padding;
    const maxY = window.innerHeight - btnNo.offsetHeight - padding;

    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);

    btnNo.style.left = randomX + "px";
    btnNo.style.top = randomY + "px";
}

function jawabIya() {
    const teks = document.getElementById("teksPertanyaan");
    const btnGroup = document.getElementById("btnGroup");
    const btnNo = document.getElementById("btnNo");
    
    if (btnNo) {
        btnNo.style.transition = "all 0.3s ease";
        btnNo.style.transform = "scale(0)";
        setTimeout(() => btnNo.remove(), 300);
    }

    if (tahap === 0) {
        teks.innerHTML = "Masaaa beneran sayang? Coba buktikan dulu dengan senyuman tercantikmu dong! 🤨❤️";
        btnGroup.innerHTML = `
            <button class="btn btn-yes" onclick="jawabIya()">Beneran kok, sumpah! 🥰</button>
            <button class="btn btn-no" id="btnNo" onmouseover="lari()" ontouchstart="lari()" onclick="lari()">Nggak wlee 😛</button>
        `;
        tahap = 1;
    } else if (tahap === 1) {
        teks.innerHTML = "Yaudah kalau beneran sayang, janji ya gak bakal ninggalin dan bikin aku sedih lagi? 🥺✨";
        btnGroup.innerHTML = `
            <button class="btn btn-yes" onclick="jawabIya()">Janji selamanya! 🤞🤍</button>
            <button class="btn btn-no" id="btnNo" onmouseover="lari()" ontouchstart="lari()" onclick="lari()">Nggak wlee 😛</button>
        `;
        tahap = 2;
    } else {
        const mainCard = document.getElementById("mainCard");
        const galleryContainer = document.getElementById("galleryContainer");

        mainCard.style.transition = "all 0.5s ease";
        mainCard.style.transform = "scale(0)";
        setTimeout(() => {
            mainCard.style.display = "none";
            galleryContainer.style.display = "block";
        }, 500);

        triggerConfettiHearts();
    }
}

// Fungsi untuk pindah ke halaman voice note dengan efek getar layar & berubah jadi hitam pekat
function nextToVoiceNote() {
    const galleryContainer = document.getElementById("galleryContainer");
    const voiceContainer = document.getElementById("voiceContainer");
    const audioNoteku = document.getElementById("audioNoteku");

    // 1. Berikan efek layar bergetar ke seluruh body
    document.body.classList.add("shake-effect");

    // 2. Transisi galeri mengecil
    galleryContainer.style.transition = "all 0.5s ease";
    galleryContainer.style.transform = "scale(0)";
    
    setTimeout(() => {
        galleryContainer.style.display = "none";
        
        // 3. Ubah background layar secara bertahap jadi hitam pekat (fade to dark)
        document.body.classList.add("dark-fade-mode");
        document.body.classList.remove("shake-effect");

        // 4. Munculkan halaman voice note / audio
        voiceContainer.style.display = "block";

        // Putar file rekaman suara secara otomatis
        if (audioNoteku) {
            audioNoteku.play().catch(error => {
                console.log("Autoplay dicegah browser, silakan klik tombol Play manual.", error);
            });
        }
    }, 500);
}

function triggerConfettiHearts() {
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const burstHeart = document.createElement("div");
            burstHeart.innerHTML = "💖";
            burstHeart.style.position = "fixed";
            burstHeart.style.left = Math.random() * window.innerWidth + "px";
            burstHeart.style.top = window.innerHeight + "px";
            burstHeart.style.fontSize = (Math.random() * 20 + 15) + "px";
            burstHeart.style.transition = "all 1.5s ease-out";
            burstHeart.style.zIndex = "99999";
            burstHeart.style.pointerEvents = "none";
            
            document.body.appendChild(burstHeart);
            
            setTimeout(() => {
                burstHeart.style.transform = `translateY(-${Math.random() * 400 + 200}px) scale(1.5)`;
                burstHeart.style.opacity = "0";
            }, 50);

            setTimeout(() => {
                burstHeart.remove();
            }, 1500);
        }, i * 50);
    }
}