const slider = document.getElementById('mainSlider');
const videos = document.querySelectorAll('.main-video');
const soundButtons = document.querySelectorAll('.sound-control');
let startX = 0;
let currentIndex = 0;

function updateVideos() {
    videos.forEach((video, index) => {
        if (index === currentIndex) {
            video.play(); 
        } else {
            video.pause(); 
            video.currentTime = 0; 
            video.muted = true; 
        }
    });
    document.querySelectorAll('.soundIcon').forEach(icon => icon.textContent = '🔇');
}

window.addEventListener('load', updateVideos);

slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });

slider.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < 2) currentIndex++;
        else if (diff < 0 && currentIndex > 0) currentIndex--;     
        slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
        updateVideos(); 
    }
});

soundButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const video = videos[index];
        const icon = btn.querySelector('.soundIcon');
        if (video.muted) {
            video.muted = false;
            icon.textContent = '🔊';
        } else {
            video.muted = true;
            icon.textContent = '🔇';
        }
    });
});