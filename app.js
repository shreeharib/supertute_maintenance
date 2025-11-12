// Custom Cursor Implementation with Trails
function initCustomCursor() {
    const outerCircle = document.createElement('div');
    const trail1 = document.createElement('div');
    const trail2 = document.createElement('div');
    
    outerCircle.id = 'custom-cursor-outer';
    outerCircle.style.cssText = `
        position: fixed;
        width: 32px;
        height: 32px;
        background: rgba(220, 38, 38, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        display: none;
        opacity: 1;
        transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
    `;
    
    trail1.id = 'custom-cursor-trail-1';
    trail1.style.cssText = `
        position: fixed;
        width: 22px;
        height: 22px;
        background: rgba(220, 38, 38, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        display: none;
        opacity: 0.7;
    `;
    
    trail2.id = 'custom-cursor-trail-2';
    trail2.style.cssText = `
        position: fixed;
        width: 12px;
        height: 12px;
        background: rgba(220, 38, 38, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9996;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
        display: none;
        opacity: 0.5;
    `;
    
    document.body.appendChild(outerCircle);
    document.body.appendChild(trail1);
    document.body.appendChild(trail2);
    
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let trail1X = 0;
    let trail1Y = 0;
    let trail2X = 0;
    let trail2Y = 0;
    let isMoving = false;
    let animationFrameId = null;
    
    function animateOuterCircle() {
        if (!isMoving) return;
        
        outerX += (mouseX - outerX) * 0.09;
        outerY += (mouseY - outerY) * 0.09;
        trail1X += (outerX - trail1X) * 0.07;
        trail1Y += (outerY - trail1Y) * 0.07;
        trail2X += (trail1X - trail2X) * 0.05;
        trail2Y += (trail1Y - trail2Y) * 0.05;
        
        outerCircle.style.left = outerX + 'px';
        outerCircle.style.top = outerY + 'px';
        trail1.style.left = trail1X + 'px';
        trail1.style.top = trail1Y + 'px';
        trail2.style.left = trail2X + 'px';
        trail2.style.top = trail2Y + 'px';
        
        animationFrameId = requestAnimationFrame(animateOuterCircle);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isMoving) {
            outerCircle.style.display = 'block';
            trail1.style.display = 'block';
            trail2.style.display = 'block';
            isMoving = true;
            animateOuterCircle();
        }
    });
    
    document.addEventListener('mouseleave', () => {
        outerCircle.style.display = 'none';
        trail1.style.display = 'none';
        trail2.style.display = 'none';
        isMoving = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
    
    const interactiveSelectors = [
        'a', 'button', '.btn', '[role="button"]', 'input', 
        'select', 'textarea', '.nav__link', '.service'
    ];
    
    const interactiveElements = document.querySelectorAll(interactiveSelectors.join(', '));
    
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            outerCircle.style.width = '34px';
            outerCircle.style.height = '34px';
            outerCircle.style.background = 'rgba(6, 6, 6, 1)';
            trail1.style.background = 'rgba(6, 6, 6, 0.5)';
            trail2.style.background = 'rgba(6, 6, 6, 0.3)';
        });
        
        el.addEventListener('mouseleave', () => {
            outerCircle.style.width = '32px';
            outerCircle.style.height = '32px';
            outerCircle.style.background = 'rgba(220, 38, 38, 0.6)';
            trail1.style.background = 'rgba(220, 38, 38, 0.4)';
            trail2.style.background = 'rgba(220, 38, 38, 0.3)';
        });
    });
    
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';
    
    const style = document.createElement('style');
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);
}


// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Contact Form Handler
function initMainContactForm() {
    const form = document.getElementById('mainContactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');
        
        if (!fullName || !email || !service || !message) {
            showFormMessage('error', 'Please fill in all required fields.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('error', 'Please enter a valid email address.');
            return;
        }
        
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Sending Message...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Create a custom success message modal instead of alert
            const modalContent = `
                <p style="font-size: 1rem; color: #333; line-height: 1.6;">
                    Thank you for your message, ${fullName}! We've received it and will get back to you within 24 hours.
                </p>
            `;
            const modal = createModal('Message Sent!', modalContent);
            // Hide the default action buttons
            if (modal.querySelector('.modal__actions')) {
                modal.querySelector('.modal__actions').style.display = 'none';
            }

            form.reset();
            addRealTimeValidation(); // Re-apply validation styles to cleared form
        } catch (error) {
            showFormMessage('error', 'Sorry, there was an error sending your message. Please try again.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showFormMessage(type, message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-success, .form-error');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = type === 'success' ? 'form-success' : 'form-error';
    // Basic styling for the message
    messageEl.style.cssText = `
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1.5rem;
        font-weight: 500;
        border: 2px solid;
    `;
    
    if (type === 'success') {
        messageEl.style.background = '#f0fdf4';
        messageEl.style.color = '#15803d';
        messageEl.style.borderColor = '#86efac';
    } else {
        messageEl.style.background = '#fef2f2';
        messageEl.style.color = '#b91c1c';
        messageEl.style.borderColor = '#fca5a5';
    }
    
    messageEl.textContent = message;
    
    // Insert message at the top of the form
    const form = document.getElementById('mainContactForm');
    if (form) {
        form.insertBefore(messageEl, form.firstChild);
    }
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
    
    // Scroll message into view
    messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Apply black and white filter to stock images
function applyImageFilters() {
    // Apply grayscale filter to all Unsplash images
    const stockImages = document.querySelectorAll('img[src*="unsplash"], img[src*="images.unsplash"], img[src*="freepik.com"]');
    
    stockImages.forEach(img => {
        img.style.filter = 'grayscale(100%) contrast(1.1)';
        img.style.transition = 'filter 250ms ease';
        
        img.addEventListener('mouseenter', () => {
            img.style.filter = 'grayscale(100%) contrast(1.2)';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.filter = 'grayscale(100%) contrast(1.1)';
        });
    });
    
    const generatedIcons = document.querySelectorAll('img[src*="user-gen-media-assets"], img[src*="pplx-res.cloudinary.com"]');
    
    generatedIcons.forEach(img => {
        img.style.filter = 'none';
    });
}

// Scroll Animations for Cards
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing after it's visible
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll([
        '.about__card',
        '.step',
        '.service',
        '.project'
    ].join(','));

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Button Ripple Effect and Actions
function initButtonActions() {
    const ctaButtons = document.querySelectorAll('.btn');

    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Prevent ripple if it's a link to another page
            if (button.tagName === 'A' && button.getAttribute('href') && button.getAttribute('href').startsWith('/')) {
                return;
            }

            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (button.contains(ripple)) {
                    button.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    addRippleAnimation();
}

function addRippleAnimation() {
    if (document.getElementById('ripple-animation')) return;
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Modal functionality
function createModal(title, content, actions = []) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal__header">
                <h3 class="modal__title">${title}</h3>
                <button class="modal__close" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal__content">
                ${content}
            </div>
            <div class="modal__actions">
                ${actions.map(action => `<button class="btn ${action.class}" onclick="${action.onclick}">${action.text}</button>`).join('')}
                <button class="btn btn--outline" onclick="closeModal(this)">Cancel</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            backdrop-filter: blur(4px);
            opacity: 0;
            animation: modalFadeIn 0.3s ease forwards;
        }
        
        .modal {
            background: white;
            border-radius: 4px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: modalSlideIn 0.3s ease;
            border: 2px solid #000;
        }
        
        .modal__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 2px solid #000;
        }
        
        .modal__title {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 700;
            text-transform: uppercase;
        }
        
        .modal__close {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        
        .modal__close:hover {
            background: #f5f5f5;
            color: #000;
        }
        
        .modal__content {
            padding: 1.5rem;
        }
        
        .modal__actions {
            padding: 1.5rem;
            border-top: 2px solid #f5f5f5;
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
            background: #f9f9f9;
        }

        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.9) translateY(-20px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;
    
    if (!document.querySelector('#modal-styles')) {
        modalStyles.id = 'modal-styles';
        document.head.appendChild(modalStyles);
    }
    
    document.body.appendChild(modal);
    
    // Close modal when clicking overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.querySelector('.modal__close'));
        }
    });
    
    return modal;
}

function closeModal(closeBtn) {
    const modal = closeBtn.closest('.modal-overlay');
    if (!modal) return;
    modal.style.animation = 'modalFadeOut 0.3s ease forwards';
    const modalBox = modal.querySelector('.modal');
    if (modalBox) {
        modalBox.style.animation = 'modalSlideOut 0.3s ease forwards';
    }
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 300);
}

// Add modal slide out animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes modalFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes modalSlideOut {
        from {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        to {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
        }
    }
`;
document.head.appendChild(slideOutStyle);

function showBookingSeminarModal() {
    const content = `
        <p style="margin-bottom: 1.25rem; color: #333; line-height: 1.6;">
            Ready to experience our revolutionary teaching method? Book a seminar session and see the Supertute difference firsthand.
        </p>
        <form id="bookingForm">
            <div class="form__group">
                <input type="text" id="bookingName" name="bookingName" class="form__input" placeholder="Full Name *" required>
            </div>
            <div class="form__group">
                <input type="email" id="bookingEmail" name="bookingEmail" class="form__input" placeholder="Email Address *" required>
            </div>
            <div class="form__group">
                <input type="tel" id="bookingPhone" name="bookingPhone" class="form__input" placeholder="Phone Number">
            </div>
            <div class="form__group">
                <select id="topic" name="topic" class="form__input" required>
                    <option value="">Topic of Interest *</option>
                    <option value="web-fundamentals">Web Development Fundamentals</option>
                    <option value="programming-basics">Programming Basics</option>
                    <option value="problem-solving">Problem Solving with Code</option>
                    <option value="career-transition">Career Transition to Tech</option>
                    <option value="custom">Custom Topic</option>
                </select>
            </div>
        </form>
    `;
    
    const actions = [
        {
            text: 'Book Seminar',
            class: 'btn--primary',
            onclick: 'submitBooking(this)'
        }
    ];
    
    createModal('Book a Seminar', content, actions);
}

function showConsultationModal() {
    const content = `
        <p style="margin-bottom: 1.25rem; color: #333; line-height: 1.6;">
            Let's discuss your learning goals and how Supertute can help you achieve them. Schedule a personalized consultation with our team.
        </p>
        <form id="consultationForm">
            <div class="form__group">
                <input type="text" id="consultName" name="consultName" class="form__input" placeholder="Full Name *" required>
            </div>
            <div class="form__group">
                <input type="email" id="consultEmail" name="consultEmail" class="form__input" placeholder="Email Address *" required>
            </div>
            <div class="form__group">
                <input type="tel" id="consultPhone" name="consultPhone" class="form__input" placeholder="Phone Number">
            </div>
            <div class="form__group">
                <select id="background" name="background" class="form__input" required>
                    <option value="">What's your current situation? *</option>
                    <option value="student">Student</option>
                    <option value="professional">Working Professional</option>
                    <option value="career-changer">Career Changer</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </form>
    `;
    
    const actions = [
        {
            text: 'Schedule Consultation',
            class: 'btn--primary',
            onclick: 'submitConsultation(this)'
        }
    ];
    
    createModal('Schedule Consultation', content, actions);
}

function showMethodologyModal() {
    const content = `
        <div style="margin-bottom: 1.25rem;">
            <p style="color: #333; line-height: 1.6; margin-bottom: 1.25rem;">
                Our revolutionary 4-step learning process ensures deep understanding and practical application of computer science concepts.
            </p>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="background: #f5f5f5; padding: 1rem; border: 2px solid #000;">
                    <h4 style="color: #DC2626; margin-bottom: 0.5rem; font-size: 1.1rem; text-transform: uppercase;">1. Learn</h4>
                    <p style="margin: 0; color: #333;">Grasp core concepts through clear, engaging instruction with real-world examples.</p>
                </div>
                <div style="background: #f5f5f5; padding: 1rem; border: 2px solid #000;">
                    <h4 style="color: #DC2626; margin-bottom: 0.5rem; font-size: 1.1rem; text-transform: uppercase;">2. Build</h4>
                    <p style="margin: 0; color: #333;">Apply knowledge immediately through hands-on, practical projects.</p>
                </div>
                <div style="background: #f5f5f5; padding: 1rem; border: 2px solid #000;">
                    <h4 style="color: #DC2626; margin-bottom: 0.5rem; font-size: 1.1rem; text-transform: uppercase;">3. Discuss</h4>
                    <p style="margin: 0; color: #333;">Engage in meaningful conversations and get real-time feedback.</p>
                </div>
                <div style="background: #f5f5f5; padding: 1rem; border: 2px solid #000;">
                    <h4 style="color: #DC2626; margin-bottom: 0.5rem; font-size: 1.1rem; text-transform: uppercase;">4. Apply</h4>
                    <p style="margin: 0; color: #333;">Build real projects that demonstrate mastery and create portfolio pieces.</p>
                </div>
            </div>
        </div>
    `;
    
    const actions = [
        {
            text: 'Experience It Yourself',
            class: 'btn--primary',
            onclick: 'closeModal(this); showBookingSeminarModal();'
        }
    ];
    
    createModal('Our 4-Step Approach', content, actions);
}

// Form Submission Handlers
function submitBooking(btn) {
    const modal = btn.closest('.modal');
    if (!modal) return;
    const form = modal.querySelector('#bookingForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const bookingName = formData.get('bookingName');
    const bookingEmail = formData.get('bookingEmail');
    const topic = formData.get('topic');
    
    let existingError = form.querySelector('.form-error-msg');
    if (existingError) existingError.remove();

    if (!bookingName || !bookingEmail || !topic) {
        // Simple validation alert (can be replaced with a more robust message)
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Please fill in all required fields.';
        errorMsg.style.color = '#b91c1c';
        errorMsg.style.marginTop = '1rem';
        errorMsg.className = 'form-error-msg';
        form.appendChild(errorMsg);
        return;
    }
    
    // Simulate success
    const modalContent = modal.querySelector('.modal__content');
    const modalActions = modal.querySelector('.modal__actions');
    if (modalContent) {
        modalContent.innerHTML = `
            <p style="font-size: 1rem; color: #333; line-height: 1.6;">
                Thank you, ${bookingName}! Your seminar on "${topic}" is booked. We'll contact you at ${bookingEmail} within 24 hours to confirm details.
            </p>
        `;
    }
    // Hide the action buttons
    if (modalActions) {
        modalActions.style.display = 'none';
    }
}

function submitConsultation(btn) {
    const modal = btn.closest('.modal');
    if (!modal) return;
    const form = modal.querySelector('#consultationForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const consultName = formData.get('consultName');
    const consultEmail = formData.get('consultEmail');
    const background = formData.get('background');

    let existingError = form.querySelector('.form-error-msg');
    if (existingError) existingError.remove();

    if (!consultName || !consultEmail || !background) {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Please fill in all required fields.';
        errorMsg.style.color = '#b91c1c';
        errorMsg.style.marginTop = '1rem';
        errorMsg.className = 'form-error-msg';
        form.appendChild(errorMsg);
        return;
    }
    
    // Simulate success
    const modalContent = modal.querySelector('.modal__content');
    const modalActions = modal.querySelector('.modal__actions');
    if (modalContent) {
        modalContent.innerHTML = `
            <p style="font-size: 1rem; color: #333; line-height: 1.6;">
                Thanks, ${consultName}! Your consultation is scheduled. We'll reach out at ${consultEmail} soon to discuss your goals as a ${background}.
            </p>
        `;
    }
    // Hide the action buttons
    if (modalActions) {
        modalActions.style.display = 'none';
    }
}



// Utility Functions
function scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function addRealTimeValidation() {
    const form = document.getElementById('mainContactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            // Remove error on input
            if (input.classList.contains('form-input--error')) {
                input.classList.remove('form-input--error');
                input.style.borderColor = '#000'; // Reset border color
            }
        });
    });
}

function validateField(field) {
    const isRequired = field.hasAttribute('required');
    /* NOTE: There appears to be a small typo in your original file.
       It said 'field.Vvalue.trim()'. I am correcting it to 'field.value.trim()'.
    */
    const isEmpty = !field.value.trim();
    
    if (isRequired && isEmpty) {
        field.style.borderColor = '#DC2626'; // Red
        field.classList.add('form-input--error');
        return false;
    }
    
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            field.style.borderColor = '#DC2626'; // Red
            field.classList.add('form-input--error');
            return false;
        }
    }
    
    field.style.borderColor = '#000'; // Back to black
    field.classList.remove('form-input--error');
    return true;
}

// --- NEW: 3D Testimonial Slider (Auto-scroll version) ---
function initTestimonialSlider() {
    const sliderContainer = document.querySelector('.testimonial-carousel-container');
    if (!sliderContainer) return; 
    
    const slides = Array.from(sliderContainer.querySelectorAll('.testimonial-slider .testimonial-card--video'));
    if (slides.length === 0) return;

    let activeIndex = 0; 
    if(slides.length > 1) {
        activeIndex = 1; 
    }
    let slideInterval;

    function createIframe(slide) {
        const wrapper = slide.querySelector('.video-wrapper');
        const data = slide.querySelector('.video-data');
        if (!wrapper || !data || wrapper.querySelector('iframe')) {
            return; // Already has an iframe or no data
        }
        
        // Create the iframe
        const iframe = document.createElement('iframe');
        iframe.src = data.dataset.src; // Includes autoplay=1
        iframe.title = "Testimonial Video";
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay";
        iframe.allowFullscreen = true;
        
        // Clear the wrapper (removes img and play button) and add iframe
        wrapper.innerHTML = ''; 
        wrapper.appendChild(iframe);
    }

    function createThumbnail(slide) {
        const wrapper = slide.querySelector('.video-wrapper');
        const data = slide.querySelector('.video-data');
        if (!wrapper || !data || wrapper.querySelector('.video-thumbnail')) {
            return; // Already has a thumbnail or no data
        }

        // Restore the thumbnail and play button
        wrapper.innerHTML = `
            <img src="${data.dataset.thumbnail}" alt="Video Thumbnail" class="video-thumbnail">
            <div class="play-button-overlay"></div>
        `;
    }

    function updateSlider() {
        const totalSlides = slides.length;
        if (totalSlides === 0) return;

        slides.forEach((slide, i) => {
            // Clear all classes
            slide.classList.remove('slide-active', 'slide-prev-1', 'slide-next-1', 'slide-hidden');
            
            const prevIndex = (activeIndex - 1 + totalSlides) % totalSlides;
            const nextIndex = (activeIndex + 1) % totalSlides;

            if (i === activeIndex) {
                slide.classList.add('slide-active');
                // This is the active slide, load the video
                createIframe(slide);
            } else if (i === prevIndex) {
                slide.classList.add('slide-prev-1');
                // This is an inactive slide, load the thumbnail
                createThumbnail(slide);
            } else if (i === nextIndex) {
                slide.classList.add('slide-next-1');
                // This is an inactive slide, load the thumbnail
                createThumbnail(slide);
            } else {
                slide.classList.add('slide-hidden');
                // This is an inactive slide, load the thumbnail
                createThumbnail(slide);
            }
        });
    }

    function slideNext() {
        activeIndex = (activeIndex + 1) % slides.length;
        updateSlider();
    }

    // Add hover-to-pause functionality
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(slideNext, 4500); // Resume auto-scroll
    });

    // Set initial state
    updateSlider();
    // Start auto-scrolling
    slideInterval = setInterval(slideNext, 4500); // Scroll every 4.5 seconds
}


// Initialize all functionality on page load
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initMobileNav();
    initMainContactForm();
    initScrollAnimations();
    initButtonActions();
    applyImageFilters();
    addRealTimeValidation();
    initTestimonialSlider(); // This now calls the new 3D slider function
});