const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    console.log(`Nome: ${name.value}, E-mail: ${email.value}, Mensagem: ${message.value}`);

   
    name.value = "";
    email.value = "";
    message.value = "";

   
    Swal.fire({
        title: "Mensagem enviada!",
        text: "Entraremos em contato em breve.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#008CBA"
    });
});

$(document).ready(function(){
    $('#menu ul').slicknav();
});

