// Role Management System
const roles = {
    manager: { name: '📋 Property Manager', desc: 'Coordination and oversight of all operations' },
    tenant: { name: '🏠 Tenant', desc: 'Submit requests and view property information' },
    subcontractor: { name: '🔧 Subcontractor', desc: 'Active job coordination and invoicing' }
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
        if (requiredRole && currentRole !== requiredRole) {
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

// ==========================================
// WORK ORDER FORM HANDLING
// ==========================================

// Custom Subcontractor Field Toggle
const workOrderAssign = document.getElementById('workOrderAssign');
const customSubcontractor = document.getElementById('customSubcontractor');

if (workOrderAssign) {
    workOrderAssign.addEventListener('change', function() {
        if (this.value === 'custom') {
            customSubcontractor.classList.remove('hidden');
            customSubcontractor.focus();
        } else {
            customSubcontractor.classList.add('hidden');
            customSubcontractor.value = '';
        }
    });
}

// Work Order Form Submission
const newWorkOrderForm = document.getElementById('newWorkOrderForm');
if (newWorkOrderForm) {
    newWorkOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const workOrder = {
            property: document.getElementById('workOrderProperty').value,
            unit: document.getElementById('workOrderUnit').value,
            type: document.getElementById('workOrderType').value,
            priority: document.getElementById('workOrderPriority').value,
            title: document.getElementById('workOrderTitle').value,
            description: document.getElementById('workOrderDescription').value,
            assignedTo: workOrderAssign.value === 'custom' ? customSubcontractor.value : workOrderAssign.value,
            dueDate: document.getElementById('workOrderDue').value,
            contact: document.getElementById('workOrderContact').value,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        
        // Save to localStorage (in real app, would send to server)
        let workOrders = JSON.parse(localStorage.getItem('workOrders') || '[]');
        workOrders.push(workOrder);
        localStorage.setItem('workOrders', JSON.stringify(workOrders));
        
        // Show success message
        alert('✅ Work Order Created Successfully!\n\nTitle: ' + workOrder.title + '\nProperty: ' + workOrder.property + '\nPriority: ' + workOrder.priority);
        
        // Reset form
        newWorkOrderForm.reset();
        customSubcontractor.classList.add('hidden');
    });
}

// ==========================================
// TENANT REQUEST FORM HANDLING
// ==========================================

const tenantRequestForm = document.getElementById('tenantRequestForm');
if (tenantRequestForm) {
    tenantRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const request = {
            type: document.getElementById('tenantRequestType').value,
            title: document.getElementById('tenantRequestTitle').value,
            details: document.getElementById('tenantRequestDetails').value,
            contactMethod: document.getElementById('tenantBestContact').value,
            contactInfo: document.getElementById('tenantContactInfo').value,
            urgency: document.getElementById('tenantUrgency').value,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        
        // Save to localStorage
        let requests = JSON.parse(localStorage.getItem('tenantRequests') || '[]');
        requests.push(request);
        localStorage.setItem('tenantRequests', JSON.stringify(requests));
        
        // Show success message
        alert('✅ Request Submitted Successfully!\n\nWe will get back to you as soon as possible.\n\nYour request: ' + request.title);
        
        // Reset form
        tenantRequestForm.reset();
    });
}

// ==========================================
// CHAT FUNCTIONALITY
// ==========================================

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatNotification = document.getElementById('chatNotification');
    
    chatWindow.classList.toggle('hidden');
    
    // Hide notification when opened
    if (!chatWindow.classList.contains('hidden')) {
        chatNotification.style.display = 'none';
    }
}

function sendChatMessage(e) {
    e.preventDefault();
    
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message outgoing';
    userMsg.innerHTML = `
        <p>${message}</p>
        <span class="chat-time">You • Just now</span>
    `;
    chatMessages.appendChild(userMsg);
    
    // Save to localStorage
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    chatHistory.push({
        type: 'outgoing',
        message: message,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Auto-reply simulation
    setTimeout(() => {
        const autoReply = document.createElement('div');
        autoReply.className = 'chat-message incoming';
        autoReply.innerHTML = `
            <p>Thank you for your message! A property manager will respond to you shortly during business hours (Mon-Fri, 9 AM - 5 PM).</p>
            <span class="chat-time">Property Management • Just now</span>
        `;
        chatMessages.appendChild(autoReply);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// ==========================================
// PAYMENT FUNCTIONALITY
// ==========================================

function showPaymentModal() {
    document.getElementById('paymentModal').classList.remove('hidden');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.add('hidden');
}

function selectPaymentMethod(method) {
    // Highlight selected method
    document.querySelectorAll('.payment-method-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // Store selection
    document.getElementById('paymentForm').dataset.method = method;
}

// Payment Form Submission
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = document.getElementById('paymentAmount').value;
        const type = document.getElementById('paymentType').value;
        const method = this.dataset.method || 'card';
        
        if (!amount || amount <= 0) {
            alert('Please enter a valid payment amount.');
            return;
        }
        
        // Simulate payment processing
        alert(`💳 Payment Processing...\n\nAmount: $${parseFloat(amount).toFixed(2)}\nType: ${type}\nMethod: ${method}\n\nIn a real implementation, this would connect to a payment processor.`);
        
        closePaymentModal();
        paymentForm.reset();
    });
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    const paymentModal = document.getElementById('paymentModal');
    if (e.target === paymentModal) {
        closePaymentModal();
    }
});

// ==========================================
// ADD PROPERTY MODAL
// ==========================================

function showAddPropertyModal() {
    alert('Add Property functionality would open a form to add new rental properties.\n\nThis feature will be connected to a backend database in the full implementation.');
}

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    updateDashboard();
    updateRoleDisplay();
    updateRoleMenu();
    updateAccessibility();
});

