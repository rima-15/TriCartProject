function sortProducts() {
    // Get the value selected in the dropdown
    const sortOption = document.getElementById('sort').value;
    const productsContainer = document.getElementById('productsList');
    const products = Array.from(productsContainer.getElementsByClassName('product'));

    let sortedProducts;

    if (sortOption === 'priceAsc') {
        // Sort by price ascending
        sortedProducts = products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.category-product-price').textContent.replace(' SR', '').trim());
            const priceB = parseFloat(b.querySelector('.category-product-price').textContent.replace(' SR', '').trim());
            return priceA - priceB; // Ascending order
        });
    } else if (sortOption === 'priceDesc') {
        // Sort by price descending
        sortedProducts = products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.category-product-price').textContent.replace(' SR', '').trim());
            const priceB = parseFloat(b.querySelector('.category-product-price').textContent.replace(' SR', '').trim());
            return priceB - priceA; // Descending order
        });
    } else if (sortOption === 'nameAsc') {
        // Sort by name A-Z
        sortedProducts = products.sort((a, b) => {
            const nameA = a.querySelector('.infoOfProduct').textContent.trim().toLowerCase();
            const nameB = b.querySelector('.infoOfProduct').textContent.trim().toLowerCase();
            return nameA.localeCompare(nameB); // A-Z
        });
    } else if (sortOption === 'nameDesc') {
        // Sort by name Z-A
        sortedProducts = products.sort((a, b) => {
            const nameA = a.querySelector('.infoOfProduct').textContent.trim().toLowerCase();
            const nameB = b.querySelector('.infoOfProduct').textContent.trim().toLowerCase();
            return nameB.localeCompare(nameA); // Z-A
        });
    }

    // Clear the products container and append sorted products
    productsContainer.innerHTML = '';
    sortedProducts.forEach(product => {
        productsContainer.appendChild(product);
    });
}

// Get all "Add to Cart" buttons on the category page
document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', function() {
        // Get product information
        const productDiv = button.closest('.product');
        const productId = productDiv.getAttribute('data-product-id');
        const productName = productDiv.querySelector('h2').innerText;
        const productPrice = parseFloat(productDiv.querySelector('.category-product-price').innerText.split(' ')[0]);
        const quantity = parseInt(productDiv.querySelector('.quantity').value);

        // Get cart from localStorage or initialize an empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        let productInCart = cart.find(item => item.productId === productId);
        if (productInCart) {
            // Update quantity if the product is already in the cart
            productInCart.quantity += quantity;
        } else {
            // Otherwise, add the product to the cart
            cart.push({
                productId,
                productName,
                productPrice,
                quantity
            });
        }

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

// Increase quantity
document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', function() {
        let quantityInput = button.previousElementSibling; // Input element
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
});

// Decrease quantity
document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', function() {
        let quantityInput = button.nextElementSibling; // Input element
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
        }
    });
});





// Fetch the cart from localStorage and display items
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Display the cart items dynamically
    const cartItemsContainer = document.getElementById('cart-items');
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <p>${item.productName} - ${item.productPrice} SR</p>
            <input type="number" class="cart-quantity" value="${item.quantity}" min="1" max="10" data-product-id="${item.productId}">
            <p class="item-total">${(item.productPrice * item.quantity).toFixed(2)} SR</p>
            <button class="remove-item" data-product-id="${item.productId}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
        totalPrice += item.productPrice * item.quantity;
    });

    // Update total price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2) + ' SR';

    // Handle quantity change
    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', function() {
            const productId = input.getAttribute('data-product-id');
            const newQuantity = parseInt(input.value);
            const cartItem = cart.find(item => item.productId === productId);
            cartItem.quantity = newQuantity;

            // Recalculate item total and cart total
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        });
    });

    // Handle item removal
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = button.getAttribute('data-product-id');
            const cartItemIndex = cart.findIndex(item => item.productId === productId);
            cart.splice(cartItemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        });
    });

    // Clear cart
    document.getElementById('clear-cart').addEventListener('click', function() {
        localStorage.removeItem('cart');
        updateCartDisplay();
    });

    // Checkout
    document.getElementById('checkout').addEventListener('click', function() {
        showAcknowledgmentModal(totalPrice);
    });

    // Update the cart display after any change
    function updateCartDisplay() {
        // Re-fetch the cart and update the display
        const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let updatedTotal = 0;
        updatedCart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <p>${item.productName} - ${item.productPrice} SR</p>
                <input type="number" class="cart-quantity" value="${item.quantity}" min="1" max="10" data-product-id="${item.productId}">
                <p class="item-total">${(item.productPrice * item.quantity).toFixed(2)} SR</p>
                <button class="remove-item" data-product-id="${item.productId}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            updatedTotal += item.productPrice * item.quantity;
        });
        document.getElementById('total-price').textContent = updatedTotal.toFixed(2) + ' SR';
    }

    // Show acknowledgment modal
    function showAcknowledgmentModal(totalPrice) {
        document.getElementById('final-total').textContent = totalPrice.toFixed(2) + ' SR';
        document.getElementById('acknowledgment-modal').style.display = 'block';
    }

    // Close acknowledgment modal
    function closeAcknowledgment() {
        document.getElementById('acknowledgment-modal').style.display = 'none';
    }
});



