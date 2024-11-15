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



document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', function() {
        const productDiv = button.closest('.product');
        const productId = productDiv.getAttribute('data-product-id');
        const productName = productDiv.querySelector('h2').innerText;
        const productPrice = parseFloat(productDiv.querySelector('.category-product-price').innerText.replace('SR', ''));
        const productDescription = productDiv.querySelector('.infoOfProductDisc').innerText;
        const imageSrc = productDiv.querySelector('.category-product-img img').src;

        // Retrieve quantity from input
        const quantityInput = productDiv.querySelector('.quantity');
        const quantity = parseInt(quantityInput ? quantityInput.value : 1); // Default to 1 if no input

        // Fetch the cart or initialize an empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Find if the product already exists in the cart
        let productInCart = cart.find(item => item.productId === productId);

        if (productInCart) {
            productInCart.quantity += quantity; // Increase quantity if it exists
        } else {
            // Otherwise, add a new product entry with specified quantity
            cart.push({
                productId,
                productName,
                productPrice,
                productDescription,
                imageSrc,
                quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in localStorage
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();

    // Clear cart
    document.getElementById('clear-cart').addEventListener('click', function() {
        localStorage.removeItem('cart');
        updateCartDisplay();
    });

    // Checkout
    document.querySelector('#checkout').addEventListener('click', function() {
    if(cart.length === 0){
                showModal(event)
                document.getElementById("CartEmptyModal").style.display = "block"; // Show the confirmation modal

    } else {
         showAcknowledgmentModal(totalToPay);

    }


    });

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
        let updatedTotal = 0;

           if (updatedCart.length === 0) {
                    // Show "Cart is empty!" if no items in the cart
                    cartItemsContainer.innerHTML = '<p class="PageDiscr">Cart is empty, no product added yet!</p>';
                } else {

        updatedCart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cartProduct');
            itemDiv.innerHTML = `
                <div class="pic-and-info-in-cart">
                    <img class="product-img" src="${item.imageSrc}" alt="${item.productName}" width="100" height="100">
                    <div class="cartProductde-details">
                        <h2 class="infoOfProduct">${item.productName}</h2>
                        <p class="infoOfProductDisc">${item.productDescription}</p>
                        <p class="category-product-price">${item.productPrice.toFixed(2)} SR</p>
                    </div>
                </div>
                <br>
                <hr style="border:0.5px solid var(--header-color);">
                <div class="PruductControle">
                 <div class="cartCounter">
                     <span class="cart-decrease-quantity">-</span>
                     <input type="number" class="cart-quantity" value="${item.quantity}" min="1" max="10" data-product-id="${item.productId}"  >
                      <span class="cart-increase-quantity">+</span>
                              </div>
                    <button id="remove-item" data-product-id="${item.productId}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);

            // Calculate the total price for the current item and add to the overall total
            updatedTotal += item.productPrice * item.quantity;
        });


            // Reapply event listeners for increment and decrement buttons
            document.querySelectorAll('.cart-increase-quantity').forEach(button => {
                button.addEventListener('click', function() {
                    let quantityInput = button.previousElementSibling;
                    quantityInput.value = parseInt(quantityInput.value) + 1;
                    quantityInput.dispatchEvent(new Event('input')); // Trigger update
                });
            });

            document.querySelectorAll('.cart-decrease-quantity').forEach(button => {
                button.addEventListener('click', function() {
                    let quantityInput = button.nextElementSibling;
                    let currentQuantity = parseInt(quantityInput.value);
                    if (currentQuantity > 1) {
                        quantityInput.value = currentQuantity - 1;
                        quantityInput.dispatchEvent(new Event('input')); // Trigger update
                    }
                });
            });
        }

        // Calculate total to pay with discount and shipping fee (only if there are products in the cart)
        let totalToPay = updatedTotal > 0 ? (updatedTotal * 0.85) + 25 : 0;

        // Display subtotal and total
        document.getElementById('subTotal').textContent = updatedTotal.toFixed(2) + ' SR';
        document.getElementById('total-price').textContent = totalToPay.toFixed(2) + ' SR';

        // Add input event listener to quantity inputs for dynamic total updates
        document.querySelectorAll('.cart-quantity').forEach(input => {
            input.addEventListener('input', function() {
                const productId = input.getAttribute('data-product-id');
                const newQuantity = parseInt(input.value);

                // Update the quantity in the cart array and localStorage
                const cartItem = updatedCart.find(item => item.productId === productId);
                cartItem.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(updatedCart));

                // Recalculate and update the total price
                updateCartDisplay();
            });
        });

        // Add click event listener to remove-item buttons
        document.querySelectorAll('#remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const productId = button.getAttribute('data-product-id');
                updatedCart = updatedCart.filter(item => item.productId !== productId);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                updateCartDisplay();
            });
        });
    }

    function showAcknowledgmentModal(totalPrice) {
        document.getElementById('final-total').textContent = totalPrice.toFixed(2) + ' SR';
        document.getElementById('acknowledgment-modal').style.display = 'block';
    }

    document.getElementById('close-acknowledgment').addEventListener('click', function() {
        document.getElementById('acknowledgment-modal').style.display = 'none';
    });
});

function showModal(event) {
                        event.preventDefault(); // Prevent the form from submitting
                        document.getElementById("myModal").style.display = "block"; // Show the first modal
                    }

                    function closeModal() {
                        document.getElementById("myModal").style.display = "none"; // Hide the first modal
                    }

                    function confirmCheckout() {
                        closeModal(); // Hide the first modal
                        document.getElementById("confirmModal").style.display = "block"; // Show the confirmation modal
                    }

                    function closeConfirmModal() {
                        document.getElementsByClassName("normalPopup").style.display = "none"; // Hide the confirmation modal
                    }

                    function goToHome() {
                        closeConfirmModal(); // Hide the confirmation modal
                        window.location.href = "ProductEvalution.html"; // Redirect to home page
                    }

                    // Close the modals if the user clicks outside of them
                    window.onclick = function(event) {
                        if (event.target == document.getElementById("myModal") ) {
                            closeModal();
                        } else if (event.target == document.getElementsByClassName("normalPopup")) {
                            closeConfirmModal();
                        }
                    }

