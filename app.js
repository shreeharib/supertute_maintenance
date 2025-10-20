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
            await new Promise(resolve => setTimeout(resolve, 2000));
            showFormMessage('success', 'Thank you for your message! We\'ll get back to you within 24 hours.');
            form.reset();
            addRealTimeValidation();
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
    messageEl.textContent = message;
    
    // Insert message at the top of the form
    const form = document.getElementById('mainContactForm');
    form.insertBefore(messageEl, form.firstChild);
    
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
    const stockImages = document.querySelectorAll('img[src*="unsplash"], img[src*="images.unsplash"]');
    
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
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll([
        '.value-card',
        '.service-card',
        '.step-card',
        '.why-feature',
        '.cta-option'
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
        }
        
        .modal {
            background: white;
            border-radius: var(--radius-xl);
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            animation: modalSlideIn 0.3s ease;
        }
        
        .modal__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--space-24);
            border-bottom: 1px solid #f1f5f9;
        }
        
        .modal__title {
            margin: 0;
            font-size: var(--font-size-2xl);
            font-weight: var(--font-weight-bold);
        }
        
        .modal__close {
            background: none;
            border: none;
            font-size: var(--font-size-3xl);
            cursor: pointer;
            color: var(--color-text-secondary);
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-base);
            transition: all var(--duration-fast) var(--ease-standard);
        }
        
        .modal__close:hover {
            background: #f1f5f9;
            color: var(--color-text);
        }
        
        .modal__content {
            padding: var(--space-24);
        }
        
        .modal__actions {
            padding: var(--space-24);
            border-top: 1px solid #f1f5f9;
            display: flex;
            gap: var(--space-12);
            justify-content: flex-end;
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
        
        .form-group {
            margin-bottom: var(--space-16);
        }
        
        .form-label {
            display: block;
            margin-bottom: var(--space-6);
            font-weight: var(--font-weight-medium);
            color: var(--color-text);
        }
        
        .form-control {
            width: 100%;
            padding: var(--space-12);
            border: 2px solid #e2e8f0;
            border-radius: var(--radius-base);
            font-size: var(--font-size-base);
            transition: border-color var(--duration-fast) var(--ease-standard);
        }
        
        .form-control:focus {
            outline: none;
            border-color: var(--color-primary);
        }
        
        textarea.form-control {
            resize: vertical;
            min-height: 100px;
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
    modal.style.animation = 'modalSlideOut 0.3s ease';
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 300);
}

// Add modal slide out animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
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
        <p style="margin-bottom: var(--space-20); color: var(--color-text-secondary); line-height: var(--line-height-relaxed);">
            Ready to experience our revolutionary teaching method? Book a seminar session and see the Supertute difference firsthand.
        </p>
        <form id="bookingForm">
            <div class="form-group">
                <label class="form-label" for="bookingName">Full Name *</label>
                <input type="text" id="bookingName" name="bookingName" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="bookingEmail">Email Address *</label>
                <input type="email" id="bookingEmail" name="bookingEmail" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="bookingPhone">Phone Number *</label>
                <input type="tel" id="bookingPhone" name="bookingPhone" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="topic">Topic of Interest</label>
                <select id="topic" name="topic" class="form-control">
                    <option value="">What would you like to learn about?</option>
                    <option value="web-fundamentals">Web Development Fundamentals</option>
                    <option value="programming-basics">Programming Basics</option>
                    <option value="problem-solving">Problem Solving with Code</option>
                    <option value="career-transition">Career Transition to Tech</option>
                    <option value="custom">Custom Topic</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label" for="groupSize">Group Size</label>
                <select id="groupSize" name="groupSize" class="form-control">
                    <option value="">Select group size...</option>
                    <option value="individual">Individual (1 person)</option>
                    <option value="small">Small Group (2-5 people)</option>
                    <option value="medium">Medium Group (6-10 people)</option>
                    <option value="large">Large Group (10+ people)</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label" for="message">Additional Details</label>
                <textarea id="message" name="message" class="form-control" placeholder="Tell us about your specific needs or goals..."></textarea>
            </div>
        </form>
    `;
    
    const actions = [
        {
            text: 'Book Seminar',
            class: 'btn--primary',
            onclick: 'submitBooking()'
        }
    ];
    
    createModal('Book a Seminar', content, actions);
}

function showConsultationModal() {
    const content = `
        <p style="margin-bottom: var(--space-20); color: var(--color-text-secondary); line-height: var(--line-height-relaxed);">
            Let's discuss your learning goals and how Supertute can help you achieve them. Schedule a personalized consultation with our team.
        </p>
        <form id="consultationForm">
            <div class="form-group">
                <label class="form-label" for="consultName">Full Name *</label>
                <input type="text" id="consultName" name="consultName" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="consultEmail">Email Address *</label>
                <input type="email" id="consultEmail" name="consultEmail" class="form-control" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="consultPhone">Phone Number</label>
                <input type="tel" id="consultPhone" name="consultPhone" class="form-control">
            </div>
            <div class="form-group">
                <label class="form-label" for="preferredTime">Preferred Time</label>
                <select id="preferredTime" name="preferredTime" class="form-control">
                    <option value="">When works best for you?</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 8 PM)</option>
                    <option value="anytime">Anytime</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label" for="background">Current Background</label>
                <select id="background" name="background" class="form-control">
                    <option value="">What's your current situation?</option>
                    <option value="student">Student</option>
                    <option value="professional">Working Professional</option>
                    <option value="career-changer">Career Changer</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label" for="goals">Learning Goals</label>
                <textarea id="goals" name="goals" class="form-control" placeholder="What do you hope to achieve with computer science education?"></textarea>
            </div>
        </form>
        <div style="background: var(--color-bg-1); padding: var(--space-16); border-radius: var(--radius-base); margin-top: var(--space-16);">
            <h4 style="margin-bottom: var(--space-8); color: var(--color-text);">Contact Information:</h4>
            <p style="margin-bottom: var(--space-4); color: var(--color-text-secondary);">📧 hello@supertute.com</p>
            <p style="margin-bottom: var(--space-4); color: var(--color-text-secondary);">📞 +91 638 325 8871</p>
            <p style="margin: 0; color: var(--color-text-secondary);">📞 +91 944 380 3623</p>
        </div>
    `;
    
    const actions = [
        {
            text: 'Schedule Consultation',
            class: 'btn--primary',
            onclick: 'submitConsultation()'
        }
    ];
    
    createModal('Schedule Consultation', content, actions);
}

function showMethodologyModal() {
    const content = `
        <div style="margin-bottom: var(--space-20);">
            <p style="color: var(--color-text-secondary); line-height: var(--line-height-relaxed); margin-bottom: var(--space-20);">
                Our revolutionary 4-step learning process ensures deep understanding and practical application of computer science concepts.
            </p>
            <div style="display: grid; gap: var(--space-16);">
                <div style="background: var(--color-bg-1); padding: var(--space-16); border-radius: var(--radius-lg);">
                    <h4 style="color: var(--color-primary); margin-bottom: var(--space-8);">1. Learn</h4>
                    <p style="margin: 0; color: var(--color-text-secondary);">Grasp core concepts through clear, engaging instruction with real-world examples.</p>
                </div>
                <div style="background: var(--color-bg-2); padding: var(--space-16); border-radius: var(--radius-lg);">
                    <h4 style="color: var(--color-primary); margin-bottom: var(--space-8);">2. Quiz</h4>
                    <p style="margin: 0; color: var(--color-text-secondary);">Test understanding with interactive assessments that reinforce learning.</p>
                </div>
                <div style="background: var(--color-bg-3); padding: var(--space-16); border-radius: var(--radius-lg);">
                    <h4 style="color: var(--color-primary); margin-bottom: var(--space-8);">3. Discuss</h4>
                    <p style="margin: 0; color: var(--color-text-secondary);">Engage in meaningful conversations about practical applications and use cases.</p>
                </div>
                <div style="background: var(--color-bg-4); padding: var(--space-16); border-radius: var(--radius-lg);">
                    <h4 style="color: var(--color-primary); margin-bottom: var(--space-8);">4. Apply</h4>
                    <p style="margin: 0; color: var(--color-text-secondary);">Build real projects that demonstrate mastery and create portfolio pieces.</p>
                </div>
            </div>
            <div style="background: var(--color-bg-5); padding: var(--space-16); border-radius: var(--radius-lg); margin-top: var(--space-16);">
                <p style="margin: 0; color: var(--color-text); font-weight: var(--font-weight-medium); text-align: center;">
                    💡 This approach ensures that every concept clicks and every skill becomes immediately applicable.
                </p>
            </div>
        </div>
    `;
    
    const actions = [
        {
            text: 'Experience It Yourself',
            class: 'btn--primary',
            onclick: 'showBookingSeminarModal(); closeModal(this);'
        }
    ];
    
    createModal('Our Revolutionary Method', content, actions);
}

// Form Submission Handlers
function submitBooking() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    const bookingName = formData.get('bookingName');
    const bookingEmail = formData.get('bookingEmail');
    const bookingPhone = formData.get('bookingPhone');
    
    if (!bookingName || !bookingEmail || !bookingPhone) {
        alert('Please fill in all required fields.');
        return;
    }
    
    alert('Seminar booked successfully! We\'ll contact you within 24 hours to confirm details.');
}

function submitConsultation() {
    const form = document.getElementById('consultationForm');
    const formData = new FormData(form);
    const consultName = formData.get('consultName');
    const consultEmail = formData.get('consultEmail');
    
    if (!consultName || !consultEmail) {
        alert('Please fill in all required fields.');
        return;
    }
    
    alert('Consultation scheduled! We\'ll reach out soon to confirm the time and discuss your learning goals.');
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
            input.classList.remove('error');
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                input.style.borderColor = emailRegex.test(input.value) ? '#10b981' : '#ef4444';
            }
        });
    });
}

function validateField(field) {
    const isRequired = field.hasAttribute('required');
    const isEmpty = !field.value.trim();
    
    if (isRequired && isEmpty) {
        field.style.borderColor = '#ef4444';
        return false;
    }
    
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    field.style.borderColor = '#10b981';
    return true;
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
});