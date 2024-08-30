document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".activity .card");

  function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.9;

    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerBottom) {
        card.classList.add('show');
      } else {
        card.classList.remove('show');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();  // Initial check
});
