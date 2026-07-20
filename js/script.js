/**
 * ============================================
 * مناسبتي - ملف الجافاسكريبت الرئيسي
 * جميع الوظائف: القائمة، العدادت، الفلترة، البحث، النموذج، وغيرها
 * ============================================
 */

// ===== 1. القائمة المتحركة (Hamburger Menu) =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // إغلاق القائمة عند الضغط على رابط
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== 2. تغيير لون الـ Navbar أثناء التمرير =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== 3. زر الرجوع للأعلى =====
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== 4. عدادات متحركة =====
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    return;
                }
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            };
            updateCounter();
        });
    }

    // ===== 5. تأثير ظهور العناصر أثناء التمرير (Intersection Observer) =====
    const fadeElements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .service-card-full, .event-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // تفعيل العدادات عند ظهورها
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const counterSection = document.querySelector('.counters');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }

    // ===== 6. الأسئلة الشائعة (FAQ) =====
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // إغلاق جميع الأسئلة المفتوحة
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // ===== 7. فلترة المناسبات والبحث الفوري =====
    const eventsData = [
        { id: 1, name: 'زفاف أحمد وليلى', type: 'زفاف', date: '2026-08-15', location: 'قصر الأفراح', description: 'حفل زفاف فاخر بحضور 300 ضيف', image: 'images/event1.jpg' },
        { id: 2, name: 'حفل تخرج الجامعة', type: 'تخرج', date: '2026-06-20', location: 'قاعة المؤتمرات', description: 'حفل تخرج دفعة 2026', image: 'images/event2.jpg' },
        { id: 3, name: 'مؤتمر التقنية 2026', type: 'مؤتمر', date: '2026-09-10', location: 'مركز المعارض', description: 'مؤتمر سنوي للتقنية والابتكار', image: 'images/event3.jpg' },
        { id: 4, name: 'عيد ميلاد سارة', type: 'عيد ميلاد', date: '2026-05-05', location: 'منزل العائلة', description: 'حفلة عيد ميلاد مفاجئة', image: 'images/event4.jpg' },
        { id: 5, name: 'اجتماع مجلس الإدارة', type: 'اجتماع', date: '2026-07-01', location: 'مقر الشركة', description: 'اجتماع سنوي لمجلس الإدارة', image: 'images/event5.jpg' },
        { id: 6, name: 'حفل خطوبة', type: 'خاص', date: '2026-04-12', location: 'فندق الريتز', description: 'حفل خطوبة عائلي مميز', image: 'images/event6.jpg' }
    ];

    const eventsGrid = document.getElementById('eventsGrid');
    let currentFilter = 'all';
    let currentSearch = '';

    function renderEvents() {
        if (!eventsGrid) return;

        let filtered = eventsData;

        // فلترة حسب النوع
        if (currentFilter !== 'all') {
            filtered = filtered.filter(event => event.type === currentFilter);
        }

        // فلترة حسب البحث
        if (currentSearch.trim() !== '') {
            const searchTerm = currentSearch.trim().toLowerCase();
            filtered = filtered.filter(event =>
                event.name.toLowerCase().includes(searchTerm) ||
                event.description.toLowerCase().includes(searchTerm) ||
                event.location.toLowerCase().includes(searchTerm)
            );
        }

        if (filtered.length === 0) {
            eventsGrid.innerHTML = `<p style="text-align:center;font-size:1.2rem;color:#999;grid-column:1/-1;">لا توجد مناسبات تطابق البحث</p>`;
            return;
        }

        eventsGrid.innerHTML = filtered.map(event => `
            <div class="event-card fade-in show">
                <img src="${event.image}" alt="${event.name}">
                <div class="event-info">
                    <h3>${event.name}</h3>
                    <div class="event-meta">
                        <span><i class="fas fa-calendar-alt"></i> ${event.date}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                    </div>
                    <p>${event.description}</p>
                    <a href="contact.html" class="btn-outline" style="font-size:0.9rem;padding:6px 20px;">التفاصيل</a>
                </div>
            </div>
        `).join('');
    }

    // أزرار الفلترة
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderEvents();
        });
    });

    // البحث الفوري
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value;
            renderEvents();
        });
    }

    // عرض المناسبات عند تحميل الصفحة
    if (eventsGrid) {
        renderEvents();
    }

    // ===== 8. التحقق من نموذج التواصل =====
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const eventType = document.getElementById('eventType').value;
            const eventDate = document.getElementById('eventDate').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value.trim();

            // التحقق من الحقول
            if (!name || !email || !phone || !eventType || !eventDate || !guests || !message) {
                formMessage.className = 'form-message error';
                formMessage.textContent = '❌ يرجى ملء جميع الحقول المطلوبة';
                formMessage.style.display = 'block';
                return;
            }

            // التحقق من البريد الإلكتروني
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.className = 'form-message error';
                formMessage.textContent = '❌ يرجى إدخال بريد إلكتروني صحيح';
                formMessage.style.display = 'block';
                return;
            }

            // التحقق من رقم الهاتف (أرقام فقط)
            const phoneRegex = /^[\d\s\-+()]+$/;
            if (!phoneRegex.test(phone)) {
                formMessage.className = 'form-message error';
                formMessage.textContent = '❌ يرجى إدخال رقم هاتف صحيح';
                formMessage.style.display = 'block';
                return;
            }

            // التحقق من عدد الحضور
            if (parseInt(guests) < 1) {
                formMessage.className = 'form-message error';
                formMessage.textContent = '❌ عدد الحضور يجب أن يكون 1 على الأقل';
                formMessage.style.display = 'block';
                return;
            }

            // رسالة نجاح
            formMessage.className = 'form-message success';
            formMessage.textContent = '✅ تم إرسال طلبك بنجاح! سنتواصل معك قريباً.';
            formMessage.style.display = 'block';

            // إعادة تعيين النموذج بعد 3 ثواني
            setTimeout(() => {
                contactForm.reset();
                formMessage.style.display = 'none';
            }, 3000);
        });
    }
});

// ===== 9. Smooth Scroll للروابط الداخلية =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

console.log('✅ مناسبتي - جميع الوظائف تعمل بنجاح!');