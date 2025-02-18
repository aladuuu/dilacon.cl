document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    formData.append('zone', document.getElementById('zone').innerText);
    const data = Object.fromEntries(formData.entries());
    data.api_key = '19uJKv888MMk'; // Agrega la clave API si es necesario

    const messageDiv = document.getElementById('formulario-web-message');
    const submitButton = document.querySelector('.formulario-web-button');

    messageDiv.innerHTML = '';

    if (!data.name || !data.lastname || !data.email || !data.phone) {
        messageDiv.innerHTML = `<p class="formulario-web-error">Por favor, complete todos los campos requeridos.</p>`;
        return;
    }

    if (data.phone.length < 9) {
        messageDiv.innerHTML = `<p class="formulario-web-error">El número de teléfono debe tener al menos 9 caracteres.</p>`;
        return;
    }

    submitButton.classList.add('loading');

    try {
        const response = await fetch('https://smtp.blackbelt.cl/dilacon.php', {
            method: 'POST',
            mode: 'cors', // Agrega esta línea
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            messageDiv.innerHTML = `<p class="formulario-web-success">${result.msg}</p>`;
            form.reset();
        } else {
            messageDiv.innerHTML = `<p class="formulario-web-error">${result.error}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = `<p class="formulario-web-error">Error al enviar el formulario.</p>`;
    } finally {
        submitButton.classList.remove('loading');
    }
});
