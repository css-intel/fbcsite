// Role Management System
const roles = {
    owner: { name: '👑 Property Owner', desc: 'Full access to all features and financial reports' },
    manager: { name: '📋 Property Manager', desc: 'Coordination and oversight of all operations' },
    supervisor: { name: '👨‍💼 Maintenance Supervisor', desc: 'Team oversight and work order management' },
    tech: { name: '🔧 Maintenance Technician', desc: 'Work assignments and task completion' },
    tenant: { name: '🏠 Tenant', desc: 'Submit requests and view property information' },
    vendor: { name: '🚚 Vendor/Contractor', desc: 'Active job coordination and invoicing' }
};

// Set current role
let currentRole = localStorage.getItem('propertyRole') || '';

// Initialize Role Selection
const roleModal = document.getElementById('roleModal');
const roleButtons = document.querySelectorAll('.role-btn');

roleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const role = e.currentTarget.getAttribute('data-target-role') || e.currentTarget.getAttribute('data-role');
        setRole(role);
        roleModal.classList.add('hidden');
    });
});

function setRole(role) {
    currentRole = role;
    localStorage.setItem('propertyRole', role);
    updateDashboard();
    updateRoleDisplay();
    updateRoleMenu();
    updateAccessibility();
}

function skipRole() {
    currentRole = '';
    localStorage.setItem('propertyRole', '');
    roleModal.classList.add('hidden');
    updateDashboard();
    updateRoleDisplay();
    updateRoleMenu();
    updateAccessibility();
}

// Show modal if no role selected and on first visit
if (!currentRole && !sessionStorage.getItem('roleModalShown')) {
    roleModal.classList.remove('hidden');
    sessionStorage.setItem('roleModalShown', 'true');
} else if (currentRole) {
    roleModal.classList.add('hidden');
}

// Update Dashboard Based on Role
function updateDashboard() {
    // Hide all dashboards
    document.querySelectorAll('.role-content').forEach(el => {
        el.classList.remove('active');
    });

    // Show selected dashboard
    if (currentRole) {
        const dashboard = document.getElementById(`${currentRole}-dashboard`);
        if (dashboard) {
            dashboard.classList.add('active');
        }
    } else {
        document.getElementById('guest-dashboard').classList.add('active');
    }
}

// Update Role Display
function updateRoleDisplay() {
    const roleDisplay = document.getElementById('roleDisplay');
    if (currentRole && roles[currentRole]) {
        roleDisplay.textContent = `${roles[currentRole].name} - ${roles[currentRole].desc}`;
    } else {
        roleDisplay.textContent = 'Viewing as Guest - Limited information available';
    }
}

// Update Role Menu
function updateRoleMenu() {
    const roleBtn = document.getElementById('roleBtn');
    if (currentRole && roles[currentRole]) {
        roleBtn.textContent = roles[currentRole].name;
    } else {
        roleBtn.textContent = 'Guest View';
    }
}

// Update Accessibility Based on Role
function updateAccessibility() {
    const restrictedElements = document.querySelectorAll('[data-role-required]');
    
    restrictedElements.forEach(el => {
        const requiredRole = el.getAttribute('data-role-required');
        if (requiredRole && !currentRole.includes(requiredRole)) {
            el.style.display = 'none';
        } else {
            el.style.display = '';
        }
    });
}

// Role Menu Toggle
const roleBtn = document.getElementById('roleBtn');
const roleMenu = document.getElementById('roleMenu');

if (roleBtn) {
    roleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        roleMenu.classList.toggle('hidden');
    });
}

// Role Menu Options
const roleOptions = document.querySelectorAll('.role-option');
roleOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        const role = e.target.getAttribute('data-role');
        setRole(role);
        roleMenu.classList.add('hidden');
    });
});

// Close role menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.role-indicator')) {
        roleMenu.classList.add('hidden');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
}

// Close mobile menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
    });
});

// Property Details Toggle
function toggleDetails(button) {
    const card = button.closest('.property-card');
    const expanded = card.querySelector('.property-expanded');
    
    if (expanded.style.display === 'none') {
        expanded.style.display = 'block';
        button.textContent = 'Hide Details';
        button.style.background = '#c49060';
    } else {
        expanded.style.display = 'none';
        button.textContent = 'View Details';
        button.style.background = '';
    }
}

// Tab Switching for Maintenance
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabName = button.getAttribute('data-tab');
        const contentEl = document.getElementById(tabName);
        if (contentEl) {
            contentEl.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Initialize animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
const cards = document.querySelectorAll('.property-card, .stat-card, .maintenance-item, .document-category');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add hamburger animation styles
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-btn span.active:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }
    
    .mobile-menu-btn span.active:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn span.active:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

// Add scroll animations
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Initialize on page load
window.addEventListener('load', () => {
    updateDashboard();
    updateRoleDisplay();
    updateRoleMenu();
    updateAccessibility();
});

console.log('Property Management System with Role-Based Access loaded successfully!');
