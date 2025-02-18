document.getElementById('newsLetter').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.api_key = '19uJKv888MMk'; // Agrega la clave API si es necesario

    const messageDiv = document.getElementById('newsletter-web-message');
    const submitButton = document.querySelector('.newsletter-web-button');

    messageDiv.innerHTML = '';

    if (!data.email) {
        messageDiv.innerHTML = `<p class="newsletter-web-error">Por favor, ingresa tu correo.</p>`;
        return;
    }

    submitButton.classList.add('loading');

    try {
        const response = await fetch('https://smtp.blackbelt.cl/dilacon-newsletter.php', {
            method: 'POST',
            mode: 'cors', // Agrega esta línea
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            messageDiv.innerHTML = `<p class="newsletter-web-success">${result.msg}</p>`;
            form.reset();
        } else {
            messageDiv.innerHTML = `<p class="newsletter-web-error">${result.error}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = `<p class="newsletter-web-error">Error al registrar tu correo.</p>`;
    } finally {
        submitButton.classList.remove('loading');
    }
});
