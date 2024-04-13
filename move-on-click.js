// Get the box element
var box = document.getElementById("mobile-box");
var mobileText = document.querySelector(".mobile");
var desktopText = document.querySelector(".desktop");

// Variable to track if the box is being dragged
var isDragging = false;

// Variables to store the initial position of the mouse pointer and the box
var initialMouseX, initialMouseY, initialBoxX, initialBoxY;

// Function to handle mouse down event
function handleMouseDown(event) {
    // Prevent default behavior (e.g., text selection)
    event.preventDefault();

    // Get the initial position of the mouse pointer
    initialMouseX = event.clientX;
    initialMouseY = event.clientY;

    // Get the initial position of the box
    var boxRect = box.getBoundingClientRect();
    initialBoxX = boxRect.left;
    initialBoxY = boxRect.top;

    // Set isDragging to true
    isDragging = true;

    // Add event listeners for mouse move and mouse up events
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
}

// Function to handle mouse move event
function handleMouseMove(event) {
    // If the box is being dragged
    if (isDragging) {
        // Calculate the new position of the box based on the initial position of the mouse pointer and the box
        var deltaX = event.clientX - initialMouseX;
        var deltaY = event.clientY - initialMouseY;
        var newBoxX = initialBoxX + deltaX;
        var newBoxY = initialBoxY + deltaY;

        // Ensure the box remains within the viewport boundaries
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;

        newBoxX = Math.max(0, Math.min(viewportWidth - box.offsetWidth, newBoxX));
        newBoxY = Math.max(0, Math.min(viewportHeight - box.offsetHeight, newBoxY));

        // Update the position of the box
        box.style.left = newBoxX + "px";
        box.style.top = newBoxY + "px";
    }
}

// Function to handle mouse up event
function handleMouseUp(event) {
    // Reset isDragging to false
    isDragging = false;

    // Remove event listeners for mouse move and mouse up events
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
}

// Check if the device supports touch events
var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

function handleTouchDown(event) {
    event.preventDefault();
    box.id = "hidden";
}

// Add event listeners based on device support
if (supportsTouch) {
    desktopText.style.display = "none";
    box.addEventListener("touchstart", handleTouchDown);
} else {
    mobileText.style.display = "none";
    box.addEventListener("mousedown", handleMouseDown);
}
