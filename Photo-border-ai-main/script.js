let processedImageURL = ''; // Store processed image globally
let originalImage = null; // Store original uploaded image

const fileInput = document.getElementById('file-input');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Event: Load Image
fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return alert("Please select an image file.");

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            originalImage = img;
            drawImage(img); // Draw the image initially
        };
    };
    reader.readAsDataURL(file);
});

// Event: Update Quality for Resize
document.getElementById('quality').addEventListener('input', function () {
    document.getElementById('quality-value').textContent = this.value;
    if (originalImage) drawImage(originalImage);
});

// Function: Draw Image with Resizing
function drawImage(img) {
    const maxWidth = 500; // Max width for resized image
    const scaleFactor = Math.min(1, maxWidth / img.width);

    canvas.width = img.width * scaleFactor;
    canvas.height = img.height * scaleFactor;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    updateImageURL();
}

// Function: Apply Border
function applyBorder() {
    if (!originalImage) return alert('Please upload an image first!');

    const borderWidth = parseInt(document.getElementById('borderWidth').value, 10);
    const borderColor = document.getElementById('borderColor').value;

    const newCanvas = document.createElement('canvas');
    const newCtx = newCanvas.getContext('2d');

    newCanvas.width = canvas.width + borderWidth * 2;
    newCanvas.height = canvas.height + borderWidth * 2;

    // Draw Border
    newCtx.fillStyle = borderColor;
    newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Draw Image
    newCtx.drawImage(canvas, borderWidth, borderWidth);

    // Update the canvas
    canvas.width = newCanvas.width;
    canvas.height = newCanvas.height;
    ctx.drawImage(newCanvas, 0, 0);

    updateImageURL();
}

// Function: Update Image URL
function updateImageURL() {
    const quality = document.getElementById('quality').value / 100;
    const format = document.getElementById('selector_extension').value;
    processedImageURL = canvas.toDataURL(`image/${format}`, quality);

    // Update file size
    const fileSize = Math.round((processedImageURL.length * 3) / 4 / 1024);
    document.getElementById('file-size').textContent = `Processed Image Size: ${fileSize} KB`;
}

// Function: Download Image
function downloadImage() {
    if (!processedImageURL) return alert('please select images');
    const link = document.createElement('a');
    link.href = processedImageURL;
    link.download = `future algorithm.${document.getElementById('selector_extension').value}`;
    link.click();
}
//yaha ush next button ka ek small function hai 
function goToNextPage() {

    window.location.href = 'multi.html';
  }