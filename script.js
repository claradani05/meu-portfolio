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



const formularioComentarios = document.getElementById('formulario-comentarios');
const listaComentarios = document.getElementById('lista-comentarios');

let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

function exibirComentarios() {
    listaComentarios.innerHTML = '';
    comentarios.forEach(comentario => {
        const divComentario = document.createElement('div');
        divComentario.classList.add('comentario');
        divComentario.dataset.id = comentario.id;

        divComentario.innerHTML = `
            <p>${comentario.texto}</p>
            <div class="acoes-comentario">
                <button class="botao-like">👍 ${comentario.likes}</button>
                <button class="botao-remover">Remover</button>
            </div>
        `;
        listaComentarios.appendChild(divComentario);
    });
}

formularioComentarios.addEventListener('submit', (e) => {
    e.preventDefault();
    const novoComentarioTexto = document.getElementById('novo-comentario-texto').value;

    if (novoComentarioTexto.trim() === '') return;

    const novoComentario = {
        id: Date.now(),
        texto: novoComentarioTexto,
        likes: 0
    };

    comentarios.push(novoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    document.getElementById('novo-comentario-texto').value = '';
    exibirComentarios();
});

listaComentarios.addEventListener('click', (e) => {
    if (e.target.classList.contains('botao-like')) {
        const id = e.target.closest('.comentario').dataset.id;
        const comentario = comentarios.find(c => c.id == id);
        if (comentario) {
            comentario.likes++;
            localStorage.setItem('comentarios', JSON.stringify(comentarios));
            exibirComentarios();
        }
    }

    if (e.target.classList.contains('botao-remover')) {
        const id = e.target.closest('.comentario').dataset.id;
        comentarios = comentarios.filter(c => c.id != id);
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
        exibirComentarios();
    }
});

exibirComentarios();