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
