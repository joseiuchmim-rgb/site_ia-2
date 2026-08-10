// --- 1. Acessibilidade (Alternância de Tema & Ajuste de Fonte) ---
const btnContrast = document.getElementById('btn-contrast');
const btnFontInc = document.getElementById('btn-font-increase');
const btnFontDec = document.getElementById('btn-font-decrease');

btnContrast.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const icon = btnContrast.querySelector('i');
  if (document.body.classList.contains('light-mode')) {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
});

let fontScale = 1;
btnFontInc.addEventListener('click', () => {
  if (fontScale < 1.25) {
    fontScale += 0.05;
    document.documentElement.style.setProperty('--font-base', `${fontScale}rem`);
  }
});

btnFontDec.addEventListener('click', () => {
  if (fontScale > 0.85) {
    fontScale -= 0.05;
    document.documentElement.style.setProperty('--font-base', `${fontScale}rem`);
  }
});

// --- 2. Controle do Carrossel de Temas ---
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function updateCarousel() {
  const card = document.querySelector('.card-tech');
  if (!card) return;
  const cardWidth = card.offsetWidth + 20; // inclui o gap
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  const totalCards = document.querySelectorAll('.card-tech').length;
  const visibleCards = window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3;
  if (currentIndex < totalCards - visibleCards) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);

// --- 3. Portal de Escuta ---
const frasesAcolhedoras = [
  "Sua voz importa. Obrigado por ter a coragem de expressar o que sente.",
  "Buscar colocar sentimentos para fora é o primeiro passo para o bem-estar.",
  "Você não está sozinho(a). Existem pessoas e canais preparados para te acolher."
];

function enviarDesabafo(event) {
  event.preventDefault();
  const texto = document.getElementById('desabafo').value;
  if (texto.trim() === '') return;

  const respostaBox = document.getElementById('resposta-acolhimento');
  const fraseElemento = document.getElementById('frase-motivacional');

  const fraseSorteada = frasesAcolhedoras[Math.floor(Math.random() * frasesAcolhedoras.length)];
  fraseElemento.textContent = `"${fraseSorteada}"`;

  respostaBox.classList.remove('hidden');
  document.getElementById('desabafo').value = '';
}

// --- 4. Quiz Interativo ---
const perguntasQuiz = [
  {
    pergunta: "1. Mandar mensagens ofensivas ou divulgar fotos sem permissão na internet é:",
    opcoes: ["Uma brincadeira comum", "Cyberbullying e crime cibernético", "Estratégia de comunicação"],
    correta: 1
  },
  {
    pergunta: "2. Como agir caso veja alguém sendo excluído ou ridicularizado na escola?",
    opcoes: ["Ignorar para não virar o próximo alvo", "Acolher a pessoa e avisar um adulto responsável", "Filmar a cena com o celular"],
    correta: 1
  },
  {
    pergunta: "3. Qual destas práticas garante melhor segurança para suas redes digitais?",
    opcoes: ["Usar a mesma senha curta em tudo", "Autenticação em duas etapas e senhas complexas", "Anotar senhas na bio do perfil"],
    correta: 1
  },
  {
    pergunta: "4. A valorização da diversidade no ambiente escolar promove:",
    opcoes: ["Empatia, respeito e ambiente de paz", "Competição excessiva entre alunos", "Segregação dos estudantes"],
    correta: 0
  },
  {
    pergunta: "5. Se uma colega relatar situação de assédio ou violência, qual a melhor atitude?",
    opcoes: ["Julgar e pedir provas imediatamente", "Escutar com empatia e orientar buscar apoio profissional/Ligue 180", "Contar para toda a turma"],
    correta: 1
  }
];

function carregarQuiz() {
  const container = document.getElementById('questoes-container');
  container.innerHTML = '';

  perguntasQuiz.forEach((q, index) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'questao-item';
    
    let html = `<p><strong>${q.pergunta}</strong></p><div class="opcoes-list">`;
    q.opcoes.forEach((opcao, i) => {
      html += `
        <label>
          <input type="radio" name="questao-${index}" value="${i}">
          ${opcao}
        </label>
      `;
    });
    html += `</div>`;
    qDiv.innerHTML = html;
    container.appendChild(qDiv);
  });
}

function calcularResultadoQuiz() {
  let acertos = 0;

  perguntasQuiz.forEach((q, index) => {
    const selecionada = document.querySelector(`input[name="questao-${index}"]:checked`);
    if (selecionada && parseInt(selecionada.value) === q.correta) {
      acertos++;
    }
  });

  const resultadoBox = document.getElementById('resultado-quiz');
  resultadoBox.classList.remove('hidden');
  resultadoBox.innerHTML = `
    <div class="feedback-card" style="margin-top: 20px;">
      <h3>Resultado da Avaliação</h3>
      <p>Você acertou <strong>${acertos}</strong> de <strong>${perguntasQuiz.length}</strong> questões.</p>
      <p style="margin-top:10px; color: var(--accent-cyan);">${acertos >= 4 ? "Parabéns! Você tem um ótimo entendimento sobre empatia e segurança!" : "Bom esforço! Continue explorando os recursos do portal para aprender mais."}</p>
    </div>
  `;
}

// --- 5. Voltar ao Topo ---
function voltarAoTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', carregarQuiz);