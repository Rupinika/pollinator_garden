document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate button on submit
            const button = this.querySelector('button');
            const originalText = button.innerHTML;
            button.innerHTML = 'Message Sent!';
            button.style.backgroundColor = 'var(--leaf-green)';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                button.innerHTML = originalText;
                button.style.backgroundColor = 'var(--forest-green)';
            }, 3000);
        });
    }

    // Filter functionality
    const bloomTimeFilter = document.getElementById('bloom-time');
    const sunRequirementsFilter = document.getElementById('sun-requirements');
    const heightFilter = document.getElementById('height');
    const plantCards = document.querySelectorAll('.plant-card');

    function filterPlants() {
        const bloomTime = bloomTimeFilter.value;
        const sunRequirements = sunRequirementsFilter.value;
        const height = heightFilter.value;

        plantCards.forEach(card => {
            const cardBloom = card.dataset.bloom;
            const cardSun = card.dataset.sun;
            const cardHeight = card.dataset.height;

            const bloomMatch = bloomTime === 'all' || cardBloom === bloomTime;
            const sunMatch = sunRequirements === 'all' || cardSun === sunRequirements;
            const heightMatch = height === 'all' || cardHeight === height;

            if (bloomMatch && sunMatch && heightMatch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Add event listeners to filters
    bloomTimeFilter.addEventListener('change', filterPlants);
    sunRequirementsFilter.addEventListener('change', filterPlants);
    heightFilter.addEventListener('change', filterPlants);

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe plant cards
    plantCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Observe benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Add scroll-based parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });

    // Add animation class when elements come into view
    const animateIn = document.querySelectorAll('.animate-in');
    animateIn.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
}); 