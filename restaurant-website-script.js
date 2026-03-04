/* ========================================
   Savory Bites Restaurant
   JavaScript
   ======================================== */

// Menu Data
const menuItems = [
    // Appetizers
    {
        id: 1,
        name: "Crispy Spring Rolls",
        description: "Golden fried vegetable rolls with tangy sauce",
        price: 8.99,
        category: "appetizers",
        emoji: "🥟"
    },
    {
        id: 2,
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter and herbs",
        price: 5.99,
        category: "appetizers",
        emoji: "🍞"
    },
    {
        id: 3,
        name: "Bruschetta",
        description: "Toasted bread topped with fresh tomatoes and basil",
        price: 7.99,
        category: "appetizers",
        emoji: "🍅"
    },
    // Main Course
    {
        id: 4,
        name: "Grilled Salmon",
        description: "Fresh salmon with herbs and lemon butter sauce",
        price: 24.99,
        category: "mains",
        emoji: "🐟"
    },
    {
        id: 5,
        name: "Chicken Parmesan",
        description: "Breaded chicken with marinara and melted cheese",
        price: 18.99,
        category: "mains",
        emoji: "🍗"
    },
    {
        id: 6,
        name: "Beef Steak",
        description: "Premium beef steak with peppercorn sauce",
        price: 32.99,
        category: "mains",
        emoji: "🥩"
    },
    // Desserts
    {
        id: 7,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center",
        price: 9.99,
        category: "desserts",
        emoji: "🍫"
    },
    {
        id: 8,
        name: "Tiramisu",
        description: "Classic Italian coffee-flavored dessert",
        price: 8.99,
        category: "desserts",
        emoji: "☕"
    },
    {
        id: 9,
        name: "Cheesecake",
        description: "Creamy cheesecake with berry topping",
        price: 7.99,
        category: "desserts",
        emoji: "🍰"
    },
    // Drinks
    {
        id: 10,
        name: "Fresh Lemonade",
        description: "Homemade lemonade with fresh lemons",
        price: 4.99,
        category: "drinks",
        emoji: "🍋"
    },
    {
        id: 11,
        name: "Mango Shake",
        description: "Creamy mango smoothie",
        price: 6.99,
        category: "drinks",
        emoji: "🥭"
    },
    {
        id: 12,
        name: "Coffee",
        description: "Freshly brewed aromatic coffee",
        price: 3.99,
        category: "drinks",
        emoji: "☕"
    }
];

// DOM Elements
const toggleBtn = document.getElementById('status-toggle');
const menuGrid = document.getElementById('menu-grid');
const menuTabs = document.querySelectorAll('.menu-tab');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');

// ========================================
// Open/Close Toggle Functionality
// ========================================
function initToggle() {
    // Check localStorage for saved status
    const savedStatus = localStorage.getItem('restaurantStatus');
    const isOpen = savedStatus !== 'closed';
    
    updateToggleUI(isOpen);
    
    // Add click event listener
    toggleBtn.addEventListener('click', () => {
        const currentStatus = toggleBtn.classList.contains('open');
        const newStatus = !currentStatus;
        
        // Save to localStorage
        localStorage.setItem('restaurantStatus', newStatus ? 'open' : 'closed');
        
        updateToggleUI(newStatus);
        
        // Show notification
        showNotification(newStatus ? "We're now open!" : "We're now closed");
    });
}

function updateToggleUI(isOpen) {
    if (isOpen) {
        toggleBtn.classList.remove('closed');
        toggleBtn.classList.add('open');
        toggleBtn.querySelector('.toggle-text').textContent = "We're Open!";
    } else {
        toggleBtn.classList.remove('open');
        toggleBtn.classList.add('closed');
        toggleBtn.querySelector('.toggle-text').textContent = "We're Closed";
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${localStorage.getItem('restaurantStatus') === 'closed' ? '#ef4444' : '#22c55e'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// ========================================
// Menu Rendering
// ========================================
function renderMenu(category = 'all') {
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    menuGrid.innerHTML = '';
    
    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
            <div class="menu-card-image">${item.emoji}</div>
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-card-footer">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="addToCart(${item.id})">Add</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Menu Tab Click Events
menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        // Render menu for category
        renderMenu(tab.dataset.category);
    });
});

// ========================================
// Add to Cart Function
// ========================================
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (item) {
        alert(`${item.name} added to cart! - $${item.price.toFixed(2)}`);
    }
}

// ========================================
// Mobile Menu Toggle
// ========================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// Contact Form
// ========================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formMessage = document.getElementById('form-message');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill in all required fields!';
        formMessage.className = 'form-message error';
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address!';
        formMessage.className = 'form-message error';
        return;
    }
    
    // Log form data
    console.log('Contact Form Submission:', { name, email, subject, message });
    
    // Success message
    formMessage.textContent = `Thank you, ${name}! Your message about "${subject}" has been sent. We'll get back to you soon!`;
    formMessage.className = 'form-message success';
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
});

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initToggle();
    renderMenu();
