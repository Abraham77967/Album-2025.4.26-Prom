document.addEventListener('DOMContentLoaded', () => {
    // Configuration - REPLACE WITH YOUR ACTUAL PHOTO FILE NAMES
    const photoFiles = [
        // Prom photos
        'DSC06110.webp',
        'DSC06121.webp',
        'DSC06122.webp',
        'DSC06123.webp',
        'DSC06125.webp',
        'DSC06127.webp',
        'DSC06129.webp',
        'DSC06130.webp',
        'DSC06131.webp',
        'DSC06132.webp',
        'DSC06135.webp',
        'DSC06139.webp',
        'DSC06140.webp',
        'DSC06143.webp',
        'DSC06147.webp',
        'DSC06154.webp',
        'DSC06159.webp',
        'DSC06160.webp',
        'DSC06165.webp',
        'DSC06169.webp',
        'DSC06171.webp',
        'DSC06174.webp',
        'DSC06178.webp',
        'DSC06179.webp',
        'DSC06186.webp',
        'DSC06191.webp',
        'DSC06195.webp',
        'DSC06198.webp',
        'DSC06209.webp',
        'DSC06214.webp',
        'DSC06217.webp',
        'DSC06218.webp',
        'DSC06220.webp',
        'DSC06222.webp',
        'DSC06225.webp',
        'DSC06231.webp',
        'DSC06240.webp',
        'DSC06241.webp',
        'DSC06245.webp',
        'DSC06248.webp',
        'DSC06258.webp',
        'DSC06264.webp',
        'DSC06268.webp',
        'DSC06272.webp',
        'DSC06279.webp',
        'DSC06282.webp',
        'DSC06283.webp',
        'DSC06286.webp',
        'DSC06297.webp',
        'DSC06305.webp',
        'P1005453.webp',
        'P1005465.webp',
        'P1005466.webp',
        'P1005475.webp',
        'P1005478.webp',
        'P1005483.webp',
        'P1005487.webp'
    ];
    
    // Music player configuration - REPLACE WITH YOUR ACTUAL SONG FILES
    const songList = [
        { file: 'music/Mona Lisa Spider-Man Across the Spider-Verse.mp3', title: 'Mona Lisa' },
        { file: 'music/her.mp3', title: 'Her' },
        { file: 'music/Something Stupid From Better Call Saul.mp3', title: 'Something Stupid' }
    ];
    
    // DOM Elements
    const mainImage = document.getElementById('main-image');
    const currentIndexEl = document.getElementById('current-index');
    const totalImagesEl = document.getElementById('total-images');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const thumbnailsContainer = document.getElementById('thumbnails');
    
    // Music Player Elements
    const audioElement = document.getElementById('music-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextSongBtn = document.getElementById('next-song-btn');
    const songNameElement = document.querySelector('.song-name');
    
    // State variables
    let currentIndex = 0;
    let currentSongIndex = -1;
    const totalImages = photoFiles.length;
    let isAnimating = false; // Prevent multiple transitions at once
    let isPlaying = false;
    
    // Touch variables
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Initialize the gallery
    function initGallery() {
        // Update the counter
        totalImagesEl.textContent = totalImages;
        updateCurrentImage();
        
        // Create thumbnails
        createThumbnails();
        
        // Add event listeners to navigation buttons
        prevBtn.addEventListener('click', showPreviousImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyNavigation);

        // Add touch event listeners for swipe functionality
        mainImage.addEventListener('touchstart', handleTouchStart, false);
        mainImage.addEventListener('touchend', handleTouchEnd, false);

        // Prevent default behavior for touch movement on gallery to stop page scrolling during swipe
        mainImage.addEventListener('touchmove', function(e) {
            // If we're in the gallery view, prevent scrolling
            if (!isAnimating) {
                e.preventDefault();
            }
        }, { passive: false });

        // Initialize music player
        initMusicPlayer();

        // Add gallery entrance animation
        animateGalleryEntrance();
    }
    
    // Initialize the music player
    function initMusicPlayer() {
        // Set up event listeners for music controls
        playPauseBtn.addEventListener('click', togglePlayPause);
        nextSongBtn.addEventListener('click', playRandomSong);
        
        // Set up audio element event listeners
        audioElement.addEventListener('ended', playRandomSong);
        
        // Preload a random song
        playRandomSong(false);
    }
    
    // Toggle play/pause
    function togglePlayPause() {
        if (currentSongIndex === -1) {
            playRandomSong(true);
            return;
        }
        
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioElement.play();
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    }
    
    // Play a random song
    function playRandomSong(shouldPlay = true) {
        // Get a new random index that's different from the current one
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songList.length);
        } while (songList.length > 1 && newIndex === currentSongIndex);
        
        currentSongIndex = newIndex;
        
        // Update the song source and display
        const currentSong = songList[currentSongIndex];
        audioElement.src = currentSong.file;
        songNameElement.textContent = currentSong.title;
        
        // If shouldPlay is true, start playing
        if (shouldPlay) {
            audioElement.play().then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(err => {
                console.error('Error playing audio:', err);
                songNameElement.textContent = 'Error loading song';
            });
        }
    }
    
    // Update the main image with animation
    function updateCurrentImage() {
        if (photoFiles.length === 0) {
            mainImage.src = 'photos/placeholder.jpg';
            currentIndexEl.textContent = '0';
            return;
        }
        
        // Add fade out animation
        mainImage.classList.add('fade-out');
        
        // Wait for fade out to complete before changing the source
        setTimeout(() => {
            const imagePath = `photos/${photoFiles[currentIndex]}`;
            mainImage.src = imagePath;
            currentIndexEl.textContent = currentIndex + 1;
            
            // Update active thumbnail
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach((thumb, index) => {
                if (index === currentIndex) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
            
            // Add fade in animation
            mainImage.classList.remove('fade-out');
            mainImage.classList.add('fade-in');
            
            // Remove fade-in class after animation completes
            setTimeout(() => {
                mainImage.classList.remove('fade-in');
                isAnimating = false;
            }, 400);
        }, 300);
    }
    
    // Create thumbnail images with staggered animation
    function createThumbnails() {
        photoFiles.forEach((photo, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = `photos/${photo}`;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.classList.add('thumbnail');
            
            // Initially hide thumbnails for animation
            thumbnail.style.opacity = '0';
            thumbnail.style.transform = 'translateY(20px)';
            
            if (index === currentIndex) {
                thumbnail.classList.add('active');
            }
            
            thumbnail.addEventListener('click', () => {
                if (isAnimating || currentIndex === index) return;
                isAnimating = true;
                currentIndex = index;
                updateCurrentImage();
            });
            
            thumbnailsContainer.appendChild(thumbnail);
            
            // Staggered appearance of thumbnails
            setTimeout(() => {
                thumbnail.style.transition = 'all 0.5s ease';
                thumbnail.style.opacity = '1';
                thumbnail.style.transform = 'translateY(0)';
            }, 50 * index);
        });
    }
    
    // Animate gallery entrance
    function animateGalleryEntrance() {
        const header = document.querySelector('header');
        const musicPlayer = document.querySelector('.music-player');
        const galleryContainer = document.querySelector('.gallery-container');
        const downloadContainer = document.querySelector('.download-container');
        
        // Set initial states
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        musicPlayer.style.opacity = '0';
        musicPlayer.style.transform = 'translateY(-20px)';
        galleryContainer.style.opacity = '0';
        downloadContainer.style.opacity = '0';
        
        // Animate header
        setTimeout(() => {
            header.style.transition = 'all 0.8s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 300);
        
        // Animate music player
        setTimeout(() => {
            musicPlayer.style.transition = 'all 0.8s ease';
            musicPlayer.style.opacity = '1';
            musicPlayer.style.transform = 'translateY(0)';
        }, 500);
        
        // Animate gallery
        setTimeout(() => {
            galleryContainer.style.transition = 'all 0.8s ease';
            galleryContainer.style.opacity = '1';
        }, 700);
        
        // Animate download button
        setTimeout(() => {
            downloadContainer.style.transition = 'all 0.8s ease';
            downloadContainer.style.opacity = '1';
        }, 1200);
    }
    
    // Show the previous image
    function showPreviousImage() {
        if (photoFiles.length === 0 || isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCurrentImage();
    }
    
    // Show the next image
    function showNextImage() {
        if (photoFiles.length === 0 || isAnimating) return;
        isAnimating = true;
        currentIndex = (currentIndex + 1) % totalImages;
        updateCurrentImage();
    }
    
    // Handle keyboard navigation
    function handleKeyNavigation(e) {
        if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === ' ' || e.key === 'Space') {
            // Space bar for toggling music play/pause
            togglePlayPause();
            e.preventDefault(); // Prevent page scrolling
        }
    }
    
    // Handle touch start event
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    // Handle touch end event
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    // Handle swipe gesture
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        
        if (touchEndX - touchStartX > swipeThreshold) {
            // Right swipe - show previous image
            showPreviousImage();
        } else if (touchStartX - touchEndX > swipeThreshold) {
            // Left swipe - show next image
            showNextImage();
        }
    }
    
    // Initialize the gallery when the page loads
    initGallery();
}); 