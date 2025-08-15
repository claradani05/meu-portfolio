const telefone = '5583993916589';

function enviarWhatsApp() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    const texto = `Olá! Meu nome é ${nome}.
Meu e-mail é ${email}.
    
${mensagem}`;

    const msgformatada = encodeURIComponent(texto);
    const url = `https://wa.me/${telefone}?text=${msgformatada}`;
    window.open(url, '_blank');
}