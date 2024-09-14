
function scrollToFooter() {
    const footer = document.querySelector('footer');
    footer.scrollIntoView({ behavior: 'smooth' });
  }
  
  function get_consult() {
    // Создание и отображение модального окна
    var modalElement = document.getElementById('popupModal');
    var myModal = new bootstrap.Modal(modalElement);
    myModal.show();
}
