/* ========================================
   PROYECTO IA EDUCATIVA - COLEGIO LOS PORTALES
   JavaScript Principal
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVEGACIÓN MÓVIL
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Animar las líneas del menú hamburguesa
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = nav.classList.contains('active') 
                    ? index === 1 ? 'scaleX(0)' : `rotate(${index === 0 ? '45deg' : '-45deg'}) translateY(${index === 0 ? '7px' : '-7px'})`
                    : 'none';
            });
        });
        
        // Cerrar menú al hacer click en un enlace
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }
    
    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ========================================
    // TABS FUNCTIONALITY
    // ========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.tab;
            
            // Remover active de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Agregar active al seleccionado
            this.classList.add('active');
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // ========================================
    // ACORDEÓN
    // ========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Cerrar todos los acordeones (comportamiento exclusivo)
            accordionHeaders.forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.classList.remove('active');
            });
            
            // Si no estaba activo, abrirlo
            if (!isActive) {
                this.classList.add('active');
                content.classList.add('active');
            }
        });
    });
    
    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Ejecutar al cargar
    
    // ========================================
    // CONTADOR ANIMADO
    // ========================================
    const counters = document.querySelectorAll('.kpi-value[data-count]');
    let counterStarted = false;
    
    const animateCounters = function() {
        if (counterStarted) return;
        
        const firstCounter = counters[0];
        if (!firstCounter) return;
        
        const counterTop = firstCounter.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (counterTop < windowHeight - 100) {
            counterStarted = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                const suffix = counter.dataset.suffix || '';
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    animateCounters();
    
    // ========================================
    // SMOOTH SCROLL PARA ENLACES INTERNOS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // MARCAR ENLACE ACTIVO EN NAVEGACIÓN
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ========================================
    // EFECTO PARALLAX EN HERO
    // ========================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }
    
    // ========================================
    // TOOLTIP SIMPLE
    // ========================================
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            const tooltipText = this.dataset.tooltip;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--color-gray-900);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.875rem;
                z-index: 1000;
                white-space: nowrap;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.2s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + window.scrollY + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
    
    // ========================================
    // PRINT FUNCTION
    // ========================================
    const printBtns = document.querySelectorAll('.btn-print');
    
    printBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    });
    
    // ========================================
    // ANIMACIÓN DE ENTRADA PARA CARDS
    // ========================================
    const cards = document.querySelectorAll('.card, .policy-card, .timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });
    
    // ========================================
    // YEAR ACTUAL EN FOOTER
    // ========================================
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    console.log('✅ Proyecto IA Educativa - Colegio Los Portales cargado correctamente');
});
