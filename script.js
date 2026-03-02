// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header-wrapper');
    
    // Variables for scroll hide/show functionality
    let lastScrollTop = 0;
    let scrollThreshold = 50;
    let isHeaderHidden = false;
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header hide/show on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determine scroll direction
        if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
            // Scrolling DOWN - hide header
            if (!isHeaderHidden) {
                header.classList.add('hide');
                isHeaderHidden = true;
            }
        } else {
            // Scrolling UP - show header
            if (isHeaderHidden) {
                header.classList.remove('hide');
                isHeaderHidden = false;
            }
        }
        
        // Update background opacity based on scroll position
        const hangingHeader = document.querySelector('.hanging-header');
        if (currentScroll > 100) {
            hangingHeader.style.background = 'rgba(255, 255, 255, 0.98)';
            hangingHeader.style.boxShadow = '0 10px 40px rgba(0, 48, 135, 0.2)';
        } else {
            hangingHeader.style.background = 'rgba(255, 255, 255, 0.92)';
            hangingHeader.style.boxShadow = '0 10px 30px rgba(0, 48, 135, 0.15)';
        }
        
        lastScrollTop = currentScroll;
    });
    
    // Show header when mouse moves near top of page
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 100 && isHeaderHidden) {
            header.classList.remove('hide');
            isHeaderHidden = false;
        }
    });
    
    // Set active state based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }
    
    // Intersection Observer for About section animation
    const aboutContent = document.querySelector('.about-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateX(30px)';
        observer.observe(aboutContent);
    }
    
    // Intersection Observer for Cards animation
    const cards = document.querySelectorAll('.card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        cardObserver.observe(card);
    });
    
    // Handle window resize to reset mobile menu
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Track button clicks
    const aboutBtn = document.querySelector('.about-btn');
    if (aboutBtn) {
        aboutBtn.addEventListener('click', function(e) {
            console.log('Navigating to About Us page');
        });
    }
});
// Add these functions to your existing script.js file

// Programs and Events Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality for program cards
    const modal = document.getElementById('eventModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = document.querySelector('.close-modal');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    
    // Event data (in a real application, this would come from a database)
    const eventData = {
        1: {
            title: 'Divine Shift Conference',
            date: 'June 15, 2024',
            time: '9:00 AM - 5:00 PM',
            location: 'Main Sanctuary',
            image: 'event1.jpg',
            description: 'The Divine Shift Conference is a prophetic gathering designed to catalyze supernatural transitions in your life. This power-packed event features dynamic worship, revelatory teaching, and prophetic ministry that will shift your perspective and position you for your next level of glory.',
            details: [
                'Morning Session: The Power of Perspective',
                'Afternoon Session: Navigating Transitions',
                'Evening Session: Supernatural Encounters',
                'Prophetic Ministry Available',
                'Communion Service'
            ],
            speaker: 'Pastor Michael Thompson',
            registration: 'Free Admission'
        },
        2: {
            title: 'Kingdom Leadership Academy',
            date: 'June 22, 2024',
            time: '10:00 AM - 2:00 PM',
            location: 'Fellowship Hall',
            image: 'event2.jpg',
            description: 'The Kingdom Leadership Academy is an intensive training program for emerging leaders. Learn practical leadership principles from a Kingdom perspective and discover how to influence your sphere of impact with grace and wisdom.',
            details: [
                'Module 1: Leadership Foundations',
                'Module 2: Building Effective Teams',
                'Module 3: Strategic Vision Planning',
                'Interactive Workshops',
                'Certificate of Completion'
            ],
            speaker: 'Dr. Sarah Williams',
            registration: '$25 (Includes Materials)'
        },
        3: {
            title: 'Youth Explosion 2024',
            date: 'June 29, 2024',
            time: '4:00 PM - 9:00 PM',
            location: 'Youth Center',
            image: 'event3.jpg',
            description: 'Youth Explosion is the premier event for young people who want to encounter God in a real and powerful way. Featuring high-energy worship, relevant teaching, and life-changing ministry, this night will ignite your passion for God and purpose.',
            details: [
                'Pre-Event: Games & Fellowship (4:00 PM)',
                'Worship Experience (5:00 PM)',
                'Message: "Your Kingdom Purpose"',
                'Altar Ministry',
                'After-Party with Refreshments'
            ],
            speaker: 'Pastor David Johnson',
            registration: 'Free (Ages 13-25)'
        }
    };
    
    // Open modal with event details
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event');
            const event = eventData[eventId];
            
            if (event) {
                displayEventModal(event);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Display event details in modal
    function displayEventModal(event) {
        const detailsList = event.details.map(detail => `<li>${detail}</li>`).join('');
        
        modalBody.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="modal-event-image" onerror="this.src='https://via.placeholder.com/600x300/003087/D4AF37?text=${encodeURIComponent(event.title)}'">
            <h3 class="modal-event-title">${event.title}</h3>
            <div class="modal-event-date">📅 ${event.date} | ${event.time}</div>
            <div class="modal-event-location">📍 ${event.location}</div>
            <p class="modal-event-description">${event.description}</p>
            <div class="modal-event-details">
                <h4>Event Details</h4>
                <ul>
                    ${detailsList}
                </ul>
                <p><strong>Speaker:</strong> ${event.speaker}</p>
                <p><strong>Registration:</strong> ${event.registration}</p>
            </div>
            <div class="modal-event-cta">
                <button onclick="window.location.href='contact.html'">Register for This Event</button>
            </div>
        `;
    }
    
    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Intersection Observer for program cards animation
    const programCards = document.querySelectorAll('.program-card');
    
    const programObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    programCards.forEach(card => {
        programObserver.observe(card);
    });
});
// Events Page Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const eventCards = document.querySelectorAll('.event-card');
    const searchInput = document.querySelector('.search-input');
    
    // Filter by category
    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter cards
                eventCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            eventCards.forEach(card => {
                const title = card.querySelector('.event-card-title').textContent.toLowerCase();
                const description = card.querySelector('.event-card-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
    
    // Generate calendar days (simplified example)
    const calendarDays = document.querySelector('.calendar-days');
    if (calendarDays) {
        const daysInMonth = 30;
        let daysHTML = '';
        
        // Add empty cells for days before month starts (June 2024 starts on Saturday)
        for (let i = 0; i < 5; i++) {
            daysHTML += '<div class="calendar-day empty"></div>';
        }
        
        // Add actual days
        for (let i = 1; i <= daysInMonth; i++) {
            const hasEvent = [15, 22, 29].includes(i); // Days with events
            daysHTML += `<div class="calendar-day ${hasEvent ? 'has-event' : ''}">${i}</div>`;
        }
        
        calendarDays.innerHTML = daysHTML;
    }
});
// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Open clicked one if it wasn't open
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Quick Prayer Modal
    const quickPrayerBtn = document.getElementById('quickPrayerBtn');
    const prayerModal = document.getElementById('prayerModal');
    const closePrayerModal = document.getElementById('closePrayerModal');
    
    if (quickPrayerBtn) {
        quickPrayerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prayerModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closePrayerModal) {
        closePrayerModal.addEventListener('click', () => {
            prayerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Quick Prayer Form
    const quickPrayerForm = document.getElementById('quickPrayerForm');
    if (quickPrayerForm) {
        quickPrayerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your prayer request. Our prayer team will pray with you.');
            prayerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out! We\'ll get back to you within 24 hours.');
            contactForm.reset();
        });
    }
    
    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
// ========== MINISTRIES PAGE MODAL FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    // Get all ministry buttons and modals
    const ministryButtons = document.querySelectorAll('.ministry-learn-more');
    const modals = {
        mercy: document.getElementById('mercyModal'),
        kings: document.getElementById('kingsModal'),
        queens: document.getElementById('queensModal'),
        shine: document.getElementById('shineModal'),
        sunday: document.getElementById('sundayModal')
    };
    
    // Close buttons for each modal
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open modal when clicking Learn More button
    ministryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const ministry = button.getAttribute('data-ministry');
            
            // Close any open modals first
            Object.values(modals).forEach(modal => {
                if (modal) modal.style.display = 'none';
            });
            
            // Open selected modal
            if (modals[ministry]) {
                modals[ministry].style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modals when clicking X
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            Object.values(modals).forEach(modal => {
                if (modal) {
                    modal.style.display = 'none';
                }
            });
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        Object.values(modals).forEach(modal => {
            if (modal && event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            Object.values(modals).forEach(modal => {
                if (modal && modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    // Join Ministry buttons
    const joinButtons = document.querySelectorAll('.join-ministry-btn');
    joinButtons.forEach(button => {
        button.addEventListener('click', () => {
            const ministry = button.getAttribute('data-ministry') || 'unknown';
            
            let ministryName = '';
            if (ministry === 'mercy') ministryName = 'Mercy';
            else if (ministry === 'kings') ministryName = 'Kings';
            else if (ministry === 'queens') ministryName = 'Queens';
            else if (ministry === 'shine') ministryName = 'SHINE Youth';
            else if (ministry === 'sunday') ministryName = 'Sunday School';
            else ministryName = ministry;
            
            alert(`✨ Thank you for your interest in joining the ${ministryName} Ministry! ✨\n\nSomeone from our team will contact you soon with more information.`);
            
            // Optional: Close the modal after joining
            const currentModal = button.closest('.ministry-modal');
            if (currentModal) {
                currentModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
});
/// ========== ELEGANT EVENT POPUP ==========
document.addEventListener('DOMContentLoaded', function() {
    initElegantEventPopup();
});

function initElegantEventPopup() {
    // COMPLETE 2026 EVENTS CALENDAR
    const events = [
        // JANUARY 2026
        { date: '2026-01-17', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        
        // FEBRUARY 2026
        { date: '2026-02-21', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        
        // MARCH 2026
        { date: '2026-03-01', title: 'Child Dedication', poster: 'child-dedication.jpg' },
        { date: '2026-03-21', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        { date: '2026-03-27', title: 'Prayer Kesha', poster: 'prayer-kesha.jpg' },
        
        // APRIL 2026
        { date: '2026-04-03', title: 'Good Friday Service', poster: 'good-friday.jpg' },
        { date: '2026-04-06', title: 'Easter Monday Service', poster: 'easter.jpg' },
        { date: '2026-04-18', title: 'SHINE XP | Mum Zaum Birthday', poster: 'shine-xp.jpg' },
        
        // MAY 2026
        { date: '2026-05-07', title: 'Logos Conference', poster: 'logos-conference.jpg', endDate: '2026-05-09' },
        { date: '2026-05-16', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        
        // JUNE 2026
        { date: '2026-06-06', title: 'Baptism Service', poster: 'baptism.jpg' },
        { date: '2026-06-20', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        { date: '2026-06-26', title: 'Prayer Kesha', poster: 'prayer-kesha.jpg' },
        
        // JULY 2026
        { date: '2026-07-18', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        
        // AUGUST 2026
        { date: '2026-08-06', title: 'Purpose Conference', poster: 'purpose-conference.jpg', endDate: '2026-08-08' },
        { date: '2026-08-15', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        
        // SEPTEMBER 2026
        { date: '2026-09-06', title: 'Child Dedication', poster: 'child-dedication.jpg' },
        { date: '2026-09-19', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        { date: '2026-09-25', title: 'Prayer Kesha', poster: 'prayer-kesha.jpg' },
        
        // OCTOBER 2026
        { date: '2026-10-17', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        
        // NOVEMBER 2026
        { date: '2026-11-01', title: 'Father\'s Birthday Celebration', poster: 'fathers-day.jpg' },
        { date: '2026-11-21', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        
        // DECEMBER 2026
        { date: '2026-12-03', title: 'Power Conference', poster: 'power-conference.jpg', endDate: '2026-12-05' },
        { date: '2026-12-10', title: 'Book Launch', poster: 'book-launch.jpg' },
        { date: '2026-12-12', title: 'Home Cell Final', poster: 'home-cell.jpg' },
        { date: '2026-12-19', title: 'SHINE XP', poster: 'shine-xp.jpg' },
        { date: '2026-12-31', title: '2027 Crossover Kesha', poster: 'crossover.jpg' }
    ];

    // Get popup elements
    const popup = document.getElementById('eventPopup');
    const popupTitle = document.getElementById('popupTitleElegant');
    const popupDate = document.getElementById('popupDateElegant');
    const popupBg = document.getElementById('popupBgImage');
    
    let popupInterval;
    let popupTimeout;
    let isVisible = false;
    
    // Find the very next upcoming event
    function getNextEvent() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcomingEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today;
        });
        
        upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        if (upcomingEvents.length > 0) {
            return upcomingEvents[0];
        }
        return events[0];
    }
    
    // Format date for display
    function formatEventDate(event) {
        const startDate = new Date(event.date);
        
        if (event.endDate) {
            const endDate = new Date(event.endDate);
            if (startDate.getMonth() === endDate.getMonth()) {
                return `${startDate.toLocaleDateString('en-US', { month: 'long' })} ${startDate.getDate()} - ${endDate.getDate()}, ${startDate.getFullYear()}`;
            } else {
                return `${startDate.toLocaleDateString('en-US', { month: 'short' })} ${startDate.getDate()} - ${endDate.toLocaleDateString('en-US', { month: 'short' })} ${endDate.getDate()}, ${startDate.getFullYear()}`;
            }
        }
        return startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    
    // Update popup content
    function updatePopupContent(event) {
        popupTitle.textContent = event.title;
        popupDate.textContent = formatEventDate(event);
        
        // Set background image
        if (event.poster) {
            popupBg.style.backgroundImage = `url('${event.poster}')`;
            popupBg.onerror = function() {
                // Fallback to gradient if image fails
                this.style.backgroundImage = 'linear-gradient(135deg, #003087, #1a4b9f)';
            };
        } else {
            popupBg.style.backgroundImage = 'linear-gradient(135deg, #003087, #1a4b9f)';
        }
    }
    
    // Show popup
    function showPopup() {
        if (!popup) return;
        
        const nextEvent = getNextEvent();
        if (nextEvent) {
            updatePopupContent(nextEvent);
        }
        
        popup.classList.remove('hide');
        popup.classList.add('show');
        isVisible = true;
        
        if (popupTimeout) clearTimeout(popupTimeout);
        popupTimeout = setTimeout(() => {
            hidePopup();
        }, 10000); // 8 seconds display time
    }
    
    // Hide popup
    function hidePopup() {
        if (!popup) return;
        popup.classList.remove('show');
        popup.classList.add('hide');
        isVisible = false;
    }
    
    // Start popup cycle
    function startPopupCycle() {
        if (popupInterval) clearInterval(popupInterval);
        
        // First appearance after 40 seconds
        setTimeout(() => {
            showPopup();
        }, 40000); // 40 seconds
        
        // Then repeat every 3 minutes
        popupInterval = setInterval(() => {
            if (!isVisible) {
                showPopup();
            }
        }, 180000); // 3 minutes
    }
    
    // Global close function
    window.closeElegantPopup = function() {
        hidePopup();
        if (popupInterval) {
            clearInterval(popupInterval);
            startPopupCycle();
        }
    };
    
    // Initialize
    if (popup) {
        startPopupCycle();
        
        popup.addEventListener('mouseenter', () => {
            if (popupTimeout) clearTimeout(popupTimeout);
        });
        
        popup.addEventListener('mouseleave', () => {
            if (isVisible) {
                popupTimeout = setTimeout(() => {
                    hidePopup();
                }, 3000);
            }
        });
    }
}