<<<<<<< HEAD
// cart.js - Enhanced Cart Management

// Initialize cart if not exists
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

/**
 * Add item to cart or update quantity if exists
 * @param {Object} product - {id, name, price, image, quantity?}
 */
export function addToCart(product) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += product.quantity || 1;
    } else {
        cart.push({
            ...product,
            quantity: product.quantity || 1
        });
    }

    saveCart(cart);
    showCartNotification(product.name);
    updateCartCount();
    return cart;
}

/**
 * Remove item from cart
 * @param {string} productId
 */
export function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    return cart;
}

/**
 * Update item quantity in cart
 * @param {string} productId 
 * @param {number} newQuantity 
 */
export function updateCartItem(productId, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity > 0) {
            item.quantity = newQuantity;
        } else {
            return removeFromCart(productId);
        }
    }
    
    saveCart(cart);
    updateCartCount();
    return cart;
}

// Helper functions
export function getCart() {
    return JSON.parse(localStorage.getItem('cart'));
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartCount() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal() {
    return getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
}

// UI Functions
export function updateCartCount() {
    const count = getCartCount();
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
        el.classList.toggle('hidden', count === 0);
    });
}

function showCartNotification(productName) {
    // Remove existing notifications
    document.querySelectorAll('.cart-notification').forEach(el => el.remove());

    const notification = document.createElement('div');
    notification.className = 'cart-notification fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center animate-fade-in z-50';
    notification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        ${productName} added to cart!
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('animate-fade-in');
        notification.classList.add('animate-fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
=======
// cart.js - Enhanced Cart Management

// Initialize cart if not exists
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

/**
 * Add item to cart or update quantity if exists
 * @param {Object} product - {id, name, price, image, quantity?}
 */
export function addToCart(product) {
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += product.quantity || 1;
    } else {
        cart.push({
            ...product,
            quantity: product.quantity || 1
        });
    }

    saveCart(cart);
    showCartNotification(product.name);
    updateCartCount();
    return cart;
}

/**
 * Remove item from cart
 * @param {string} productId
 */
export function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    return cart;
}

/**
 * Update item quantity in cart
 * @param {string} productId 
 * @param {number} newQuantity 
 */
export function updateCartItem(productId, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity > 0) {
            item.quantity = newQuantity;
        } else {
            return removeFromCart(productId);
        }
    }
    
    saveCart(cart);
    updateCartCount();
    return cart;
}

// Helper functions
export function getCart() {
    return JSON.parse(localStorage.getItem('cart'));
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartCount() {
    return getCart().reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal() {
    return getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
}

// UI Functions
export function updateCartCount() {
    const count = getCartCount();
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
        el.classList.toggle('hidden', count === 0);
    });
}

function showCartNotification(productName) {
    // Remove existing notifications
    document.querySelectorAll('.cart-notification').forEach(el => el.remove());

    const notification = document.createElement('div');
    notification.className = 'cart-notification fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center animate-fade-in z-50';
    notification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        ${productName} added to cart!
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('animate-fade-in');
        notification.classList.add('animate-fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
>>>>>>> cd42570efff135a9e285e3f0748cd7beaf33728c
}