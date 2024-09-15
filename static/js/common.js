
function scrollToFooter() {
    const footer = document.querySelector('footer');
    footer.scrollIntoView({ behavior: 'smooth' });
  }
  

  function submitForm(event) {
    event.preventDefault(); // Предотвратите стандартное поведение отправки формы
  
    const form = event.target;
    const formData = new FormData(form);
  
    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Покажите toast при успешной отправке формы
          showToast('Заявка успешно отправлена!');
          form.reset(); // Очистите поля формы после успешной отправки
        } else {
          throw new Error(`Ошибка: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error(error);
        showToast('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.', 'danger');
      });
  }

  function showToast(message, type = 'success') {
    const toast = new bootstrap.Toast(document.getElementById('formToast'));
    const toastBody = document.getElementById('formToastBody');
  
    toastBody.textContent = message;
    toast.show();
  }

  