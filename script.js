const volumeBar = document.querySelector('.volume-bar');
let isDragging = false;
let currentVolume = 0.5; // Default volume level

// Volume control
volumeBar.addEventListener('mousedown', (e) => {
  isDragging = true;
  updateVolume(e);
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) updateVolume(e);
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

function updateVolume(e) {
 const rect = volumeBar.getBoundingClientRect();
  const position = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  setVolume(position);
}

function setVolume(level) {
  currentVolume = Math.max(0, Math.min(1, level));
  volumeBar.style.setProperty('--volume-level', `${currentVolume * 100}%`);
}

// Increment and Decrement Volume
const volumeUpButton = document.querySelector('.volume-up');
const volumeDownButton = document.querySelector('.volume-down');

volumeUpButton.addEventListener('click', () => {
  setVolume(currentVolume + 0.1);
});

volumeDownButton.addEventListener('click', () => {
  setVolume(currentVolume - 0.1);
});

// Play/Pause functionality
const audio = new Audio(); // Create a new audio object
document.querySelector('.fa-play-circle').addEventListener('click', function() {
  if (audio.paused) {
    audio.src = 'path_to_your_song.mp3'; // Set the source of the audio
    audio.play();
    this.classList.toggle('fa-play-circle');
    this.classList.toggle('fa-pause-circle');
  } else {
    audio.pause();
    this.classList.toggle('fa-play-circle');
    this.classList.toggle('fa-pause-circle');
  }
});

// Playlist functionality
const playlists = [
  { title: 'My Playlist #1', artist: 'Artist 1', img: 'https://picsum.photos/200', src: 'song1.mp3' },
  { title: 'My Playlist #2', artist: 'Artist 2', img: 'https://picsum.photos/201', src: 'song2.mp3' }
];

const playlistCards = document.querySelectorAll('.playlist-card');
playlistCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    const { title, artist, img, src } = playlists[index];
    document.querySelector('.song-info h4').textContent = title;
    document.querySelector('.song-info p').textContent = artist;
    document.querySelector('.song-info img').src = img;
    audio.src = src; // Set the audio source to the selected song
    audio.play(); // Play the selected song
  });
});

// Error handling for audio playback
audio.addEventListener('error', () => {
  console.error('Error loading audio');
});

// Add hover animations
playlistCards.forEach(card => {
  card.addEventListener('mouseover', () => {
    card.style.transform = 'translateY(-5px)';
  });

  card.addEventListener('mouseout', () => {
    card.style.transform = '';
  });
});