document.addEventListener('DOMContentLoaded', function() {
    // Carrusel
    const carruselInner = document.querySelector('.carrusel-inner');
    const slides = document.querySelectorAll('.slide');
    const productLinks = document.querySelectorAll('.product-link');
    const btnPrev = document.querySelector('.prev');
    const btnNext = document.querySelector('.next');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarrusel() {
        carruselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        slides.forEach((slide, index) => {
            const link = slide.querySelector('.product-link');
            if (index === currentIndex) {
                slide.setAttribute('tabindex', '0');
                slide.setAttribute('aria-hidden', 'false');
                link.setAttribute('tabindex', '0');
                link.setAttribute('aria-hidden', 'false');
            } else {
                slide.setAttribute('tabindex', '-1');
                slide.setAttribute('aria-hidden', 'true');
                link.setAttribute('tabindex', '-1');
                link.setAttribute('aria-hidden', 'true');
            }
        });
    }

    btnPrev.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarrusel();
    });

    btnNext.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarrusel();
    });

    document.addEventListener('keydown', function(e) {
        const activeSlide = document.querySelector('.slide[tabindex="0"]');
        
        if (activeSlide && activeSlide === document.activeElement) {
            if (e.key === 'ArrowRight') {
                btnNext.click();
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                btnPrev.click();
                e.preventDefault();
            }
        }
    });

    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Producto seleccionado. En un sitio real esto llevaría a la página del producto.');
        });
    });

    // Formulario
    const form = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!emailInput.validity.valid) {
            if (emailInput.validity.valueMissing) {
                emailError.textContent = 'Por favor, introduce tu email';
            } else if (emailInput.validity.typeMismatch) {
                emailError.textContent = 'Por favor, introduce un email válido';
            }
            emailInput.focus();
        } else {
            emailError.textContent = '';
            alert('¡Gracias por suscribirte!');
            form.reset();
        }
    });

    updateCarrusel();
});