import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

// Função para controlar vídeos nos projetos
function initVideoHover() {
  const videos = document.querySelectorAll('.video-project');
  
  videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.play();
    });
    
    video.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0; // Reinicia o vídeo
    });
  });
}

initVideoHover();

// Função para fazer o gato fugir do mouse
function initKittyEscape() {
  const kitty = document.querySelector('.hero-kitty');
  if (!kitty) return;

  let isOnRight = true;
  let isCoolingDown = false;
  let hasTriggeredInHover = false;

  // Preparar canvas para detecção de pixel visível (não-transparente)
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  function prepareCanvas() {
    const nw = kitty.naturalWidth;
    const nh = kitty.naturalHeight;
    if (!nw || !nh) return;
    canvas.width = nw;
    canvas.height = nh;
    try {
      ctx.clearRect(0, 0, nw, nh);
      ctx.drawImage(kitty, 0, 0, nw, nh);
    } catch (e) {
      // Se houver qualquer problema, desabilita detecção por pixel
      console.warn('Falha ao preparar canvas do gatinho:', e);
    }
  }

  if (kitty.complete) {
    prepareCanvas();
  } else {
    kitty.addEventListener('load', prepareCanvas);
  }

  function toggleSideWithAnimation() {
    // evita múltiplos disparos em sequência
    if (isCoolingDown) return;
    isCoolingDown = true;

    // Alterna lado primeiro
    if (isOnRight) {
      kitty.style.right = 'auto';
      kitty.style.left = '20px';
      isOnRight = false;
    } else {
      kitty.style.left = 'auto';
      kitty.style.right = '20px';
      isOnRight = true;
    }

    // Aplica animação de surgimento de cima
    kitty.classList.add('enter-switch');
    setTimeout(() => {
      kitty.classList.remove('enter-switch');
    }, 520);

    // cooldown alinhado à duração da animação
    setTimeout(() => {
      isCoolingDown = false;
    }, 540);
  }

  // Só muda de lugar se o cursor estiver exatamente sobre um pixel visível da imagem
  kitty.addEventListener('mousemove', (ev) => {
    if (!ctx) return;
    // posição do cursor relativa ao elemento renderizado
    const rect = kitty.getBoundingClientRect();
    const xClient = ev.clientX - rect.left;
    const yClient = ev.clientY - rect.top;

    // mapear para coordenadas da imagem natural
    const xImg = Math.round(xClient * (kitty.naturalWidth / kitty.clientWidth));
    const yImg = Math.round(yClient * (kitty.naturalHeight / kitty.clientHeight));

    if (xImg < 0 || yImg < 0 || xImg >= kitty.naturalWidth || yImg >= kitty.naturalHeight) return;

    let alpha = 255; // fallback
    try {
      const pixel = ctx.getImageData(xImg, yImg, 1, 1).data;
      alpha = pixel[3];
    } catch (e) {
      // Se não conseguir ler, mantém comportamento padrão (não dispara aqui)
      return;
    }

    // Atualiza cursor: pointer apenas sobre pixel visível
    if (alpha > 200) {
      kitty.style.cursor = 'pointer';
      if (!hasTriggeredInHover) {
        hasTriggeredInHover = true;
        toggleSideWithAnimation();
      }
    } else {
      kitty.style.cursor = 'default';
    }
  });

  kitty.addEventListener('mouseleave', () => {
    hasTriggeredInHover = false;
    kitty.style.cursor = 'default';
  });
}

// Animação de entrada do gatinho ao carregar a página
function initKittyEnterOnLoad() {
  const kitty = document.querySelector('.hero-kitty');
  if (!kitty) return;
  // sincroniza com o título (delay ~500ms), mas inicia assim que possível
  kitty.classList.add('enter-onload');
  // remove a classe após concluir a animação
  setTimeout(() => {
    kitty.classList.remove('enter-onload');
  }, 900);
}

initKittyEnterOnLoad();

initKittyEscape();
