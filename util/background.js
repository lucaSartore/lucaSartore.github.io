const bg = document.getElementById('background');

document.addEventListener('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    bg.style.backgroundPosition = `${x}px ${y}px`;
});