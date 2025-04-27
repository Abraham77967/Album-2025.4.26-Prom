# Prom Night Memories Gallery

An elegant photo gallery website designed specifically for prom photos. Simply open the index.html file in a browser - no server required!

## How to Use

1. **Add Your Prom Photos**:
   - Place all your prom night photos in the `photos` folder
   - Open `script.js` and update the `photoFiles` array with your photo filenames

   ```javascript
   const photoFiles = [
       'prom-photo1.jpg',
       'prom-photo2.jpg',
       'group-photo.jpg',
       // Add all your prom photos here
   ];
   ```

2. **Set Up Download Link**:
   - Upload all prom photos to Google Drive in a shared folder
   - Make sure to set the folder's sharing to "Anyone with the link can view"
   - Get the folder ID from the sharing link (it's the part after `/folders/` in the URL)
   - Open `index.html` and replace `YOUR_FOLDER_ID` in the download button link:

   ```html
   <a href="https://drive.google.com/drive/folders/YOUR_FOLDER_ID" target="_blank" class="download-btn">
   ```

3. **View the Gallery**:
   - Simply double-click on the `index.html` file to open it in your default web browser
   - No server setup needed!
   - Share the folder containing these files with friends to let them view the gallery on their computers

## Features

- Elegant design with gold and dark theme perfect for prom photos
- Simple photo navigation with arrow buttons
- Thumbnail gallery for quick access to specific photos
- Keyboard navigation (left/right arrow keys)
- Mobile-responsive design looks great on all devices
- Direct download link to all photos via Google Drive

## Customization

You can easily customize the gallery:

- Change the title in `index.html` to your specific prom event (e.g., "Lincoln High Prom 2023")
- Modify colors in `styles.css` to match your prom theme
- Adjust the subtitle text in `index.html` to personalize your gallery 