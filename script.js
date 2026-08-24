// Função para virar cartões
function virarCartao(cardElement) {
  cardElement.classList.toggle('virado');
}

// Lógica do Quiz
function responderQuiz(btn, isCorrect) {
  const feedback = document.getElementById('quiz-feedback');
  feedback.classList.remove('hidden', 'correct', 'incorrect');

  if (isCorrect) {
    feedback.classList.add('correct');
    feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Correto! Apoiar quem precisa e acionar adultos responsáveis é sempre a melhor atitude.';
  } else {
    feedback.classList.add('incorrect');
    feedback.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Incorreto. O silêncio ou a omissão ajudam a perpetuar o problema. Tente novamente!';
  }
}

// Botão de voltar ao topo
document.getElementById('btn-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Envio da mensagem de escuta
document.getElementById('btn-enviar-escuta')?.addEventListener('click', () => {
  const mensagem = document.getElementById('mensagem-escuta').value;
  const feedback = document.getElementById('feedback-escuta');

  if (mensagem.trim() !== "") {
    feedback.classList.remove('hidden');
    document.getElementById('mensagem-escuta').value = "";
  } else {
    alert("Por favor, escreva uma mensagem antes de enviar.");
  }
});

// Alternar tema
document.getElementById('toggle-theme')?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// Canvas 3D de Fundo (Three.js)
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Geometria Central
  const coreGeometry = new THREE.IcosahedronGeometry(6, 2);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(coreMesh);

  // Partículas
  const particlesCount = 200;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.6,
    color: 0x00f2fe,
    transparent: true,
    opacity: 0.6
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Animação
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    coreMesh.rotation.y = elapsedTime * 0.15;
    particlesMesh.rotation.y = elapsedTime * 0.03;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});