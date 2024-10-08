function openTab(event, tabName) {
    // Hide all tab content
    let tabContent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active");
    }

    // Remove active class from all buttons
    let tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // Show the selected tab content and set the active button
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

function openLightbox(event, url) {
    event.preventDefault();
    document.getElementById('lightbox').style.display = 'block';
    document.getElementById('lightbox-video').src = url;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightbox-video').src = '';
}
