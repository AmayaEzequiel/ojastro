// Módulo de manejo del layout
(function() {
  'use strict';

  // Elementos del DOM
  const elements = {
    btnMobile: document.querySelector('.mobile-menu-btn'),
    mobileNav: document.getElementById('mobileMenu'),
    megaMenu: document.getElementById('megaMenuCatalog'),
    btnModelosDesktop: document.getElementById('btn-modelos'),
    btnVerTodos: document.getElementById('btn-ver-todos'),
    gridModelos: document.getElementById('grid-modelos')
  };

  // Utilidades
  const utils = {
    isDesktop: () => window.innerWidth >= 1024,
    closeAllMenus: () => {
      elements.mobileNav?.classList.remove('is-open');
      elements.megaMenu?.classList.remove('is-active', 'is-active-mobile');
      const svg = elements.btnMobile?.querySelector('svg');
      if (svg) {
        svg.innerHTML = '<path d="M3 6h18M3 12h18M3 18h18"></path>';
      }
    },
    updateMobileIcon: (isOpen) => {
      const svg = elements.btnMobile?.querySelector('svg');
      if (svg) {
        svg.innerHTML = isOpen 
          ? '<path d="M18 6L6 18M6 6l12 12"></path>'
          : '<path d="M3 6h18M3 12h18M3 18h18"></path>';
      }
    }
  };

  // Manejadores de eventos
  const handlers = {
    mobileMenu: () => {
      if (!elements.btnMobile) return;
      
      const isOpen = elements.mobileNav?.classList.toggle('is-open');
      
      if (!utils.isDesktop()) {
        elements.megaMenu?.classList.toggle('is-active-mobile', isOpen);
        elements.megaMenu?.classList.remove('is-active');
      }
      
      utils.updateMobileIcon(isOpen);
    },
    
    desktopModelos: (e) => {
      if (utils.isDesktop() && elements.btnModelosDesktop) {
        e.preventDefault();
        e.stopPropagation();
        elements.megaMenu?.classList.toggle('is-active');
      }
    },
    
    viewAllModels: () => {
      if (elements.btnVerTodos && elements.gridModelos) {
        const isExpanded = elements.gridModelos.classList.toggle('show-all');
        elements.btnVerTodos.textContent = isExpanded ? 'Ver menos' : 'Ver todos';
      }
    },
    
    closeOnClickOutside: (e) => {
      if (utils.isDesktop() && elements.megaMenu?.classList.contains('is-active')) {
        if (!e.target.closest('.main-header')) {
          elements.megaMenu.classList.remove('is-active');
        }
      }
    },
    
    closeOnLinkClick: (e) => {
      if (e.target.closest('.mobile-link') || e.target.closest('.model-card')) {
        utils.closeAllMenus();
      }
    },
    
    handleResize: () => {
      if (utils.isDesktop()) {
        elements.mobileNav?.classList.remove('is-open');
        elements.megaMenu?.classList.remove('is-active-mobile');
        utils.updateMobileIcon(false);
      } else {
        elements.megaMenu?.classList.remove('is-active');
      }
    }
  };

  // Inicializar eventos
  function init() {
    // Eventos de UI
    elements.btnMobile?.addEventListener('click', handlers.mobileMenu);
    elements.btnModelosDesktop?.addEventListener('click', handlers.desktopModelos);
    elements.btnVerTodos?.addEventListener('click', handlers.viewAllModels);
    
    // Eventos globales
    document.addEventListener('click', handlers.closeOnClickOutside);
    document.addEventListener('click', handlers.closeOnLinkClick);
    window.addEventListener('resize', handlers.handleResize);
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();