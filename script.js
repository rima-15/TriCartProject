// date in the home page
document.addEventListener("DOMContentLoaded", function() {
    // Get the current date
    const today = new Date();

    // Calculate the current week's starting date (Sunday)
    const dayOfWeek = today.getDay(); // 0 = Sunday
    const sundayDate = new Date(today);
    sundayDate.setDate(today.getDate() - dayOfWeek); // Set to the previous Sunday

    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = sundayDate.toLocaleDateString('en-US', options);


    document.getElementById('week-start-date').textContent = `Week starting : ${formattedDate}`;
});

document.addEventListener("DOMContentLoaded", function() {
    function validateForm(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get selected order, product, and rating
        const orderSelect = document.getElementById("listsOforder");
        const productSelect = document.getElementById("ListOfproduct");
        const ratingSelect = document.querySelector(".rating-star");

        const selectedOrder = orderSelect.value;
        const selectedProduct = productSelect.options[productSelect.selectedIndex].text; // Get the text of the selected product
        const selectedProductValue = productSelect.value; // Get the value (ID) of the selected product
        const selectedRating = ratingSelect.value; // Get the rating value

        console.log('selectedOrder:', selectedOrder); // Debugging
        console.log('selectedProduct:', selectedProduct); // Debugging
        console.log('selectedProductValue:', selectedProductValue); // Debugging
        console.log('selectedRating:', selectedRating); // Debugging

        // Check if both order, product, and rating are selected
        // Here, we're checking if the product value is not empty (to ensure a valid product is selected)
        if (!selectedOrder || !selectedProductValue || !selectedRating) {
            showAlert("Please select an order and a rating.", false); // Validation message, no redirect
            return;
        }

        // Display feedback message with the selected product name
        successAlert(`Your rating for ${selectedProduct} is ${selectedRating} stars` ); // Feedback message, trigger redirect
    }

    // Function to display the custom alert
    function showAlert(message, shouldRedirect) {
        const alertMessage = document.getElementById("alertMessage");
        alertMessage.innerHTML = message; // Set the message with HTML content (to support <br> tags)
        const customAlert = document.getElementById("customAlert");

        customAlert.style.display = "flex"; // Show the alert

        // Close the alert and redirect to Home page when the button is clicked (if it's the feedback message)
        document.getElementById("closeAlert").onclick = function() {
            customAlert.style.display = "none"; // Hide the alert
            if (shouldRedirect) {
                window.location.href = "HomePage.html"; // Redirect to Home page after user clicks OK (only for feedback message)
            }
        };
    }

    function successAlert(message) {
        const thankMess = document.getElementById("thankMess");
        const thankdircMess = document.getElementById("thankdircMess");
                    //const customAlert = document.getElementById("customAlert");

        thankMess.innerHTML ="Thank you for your feedback!";
        thankdircMess.innerHTML =message;
        document.getElementById("confirmModal").style.display = "block"; // Show the confirmation modal

    }


    // Attach the validateForm function to the form's submit event
    document.querySelector("form").addEventListener("submit", validateForm);
});


// Task 2 and 3:
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const productName = document.getElementById("productName");
    const category = document.getElementById("category");
    const price = document.getElementById("price");
    const quantity = document.getElementById("quantity");
    const description = document.getElementById("description");
    const imageUpload = document.getElementById("imageUpload");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!productName.value.trim() || !category.value || !price.value || !quantity.value || !description.value.trim() || !imageUpload.files.length) {
            showAlert("Please fill in all the fields.");
            return;
        }
        if (!isNaN(productName.value.charAt(0))) {
            showAlert("Product name should not start with a number.");
            return;
        }
        if (Number.isNaN(parseFloat(price.value)) || Number.isNaN(parseFloat(quantity.value))) {
            showAlert("Price and quantity should be numbers.");
            return;
        }
        const imageFile = imageUpload.files[0];
        let imageDataUrl = "";
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = function () {
                imageDataUrl = reader.result;
                saveProduct(imageDataUrl);
            };
            reader.readAsDataURL(imageFile);
        } else {
            saveProduct();
        }

        function saveProduct(imageDataUrl = "") {
            const newProduct = {
                name: productName.value,
                category: category.value,
                price: parseFloat(price.value),
                quantity: parseInt(quantity.value, 10),
                description: description.value,
                imageDataUrl: imageDataUrl // Save the image Data URL here
            };

            let products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(products));

            successAlert(`Product "${productName.value}" has been added successfully.`);

            form.reset();
        }
    });

    function showAlert(message) {
        const alertMessage = document.getElementById("alertMessage");
        const customAlert = document.getElementById("customAlert");

        alertMessage.innerHTML = message;

        customAlert.style.display = "flex";

        document.getElementById("closeAlert").onclick = function() {
            customAlert.style.display = "none";
        };
    }
    function successAlert(message) {
        const thankMess = document.getElementById("thankMess");
        const thankdircMess = document.getElementById("thankdircMess");
                    //const customAlert = document.getElementById("customAlert");

        thankMess.innerHTML =message;
        thankdircMess.innerHTML ="thanks to be part of us!";
        document.getElementById("confirmModal").style.display = "block"; // Show the confirmation modal

    }

});

document.addEventListener("DOMContentLoaded", function () {
    const productList = document.querySelector(".product-list");

    if (!productList) {
        console.error("Element with class 'product-list' not found in the DOM.");
        return;
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
        const noProductsMessage = document.createElement("p");
        noProductsMessage.textContent = "No products available. Please add a product using the 'Add a New Product' page.";
        noProductsMessage.classList.add("no-products-message");
        productList.appendChild(noProductsMessage);
        return;
    }

    products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        // Display only image, name, and description
        productItem.innerHTML = `
      <div class="category-product-img">
          <img src="${product.imageDataUrl || 'https://via.placeholder.com/150'}" alt="${product.name}">
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
    `;

        productList.appendChild(productItem);
    });
});

    function closeConfirmModal() {
        console.log("closeConfirmModal invoked");

        document.getElementById("confirmModal").style.display = "none"; // Hide the confirmation modal
    }
     function goToHomePage() {
                                closeConfirmModal(); // Hide the confirmation modal
                                    console.log("goToHomePage invoked");

                                window.location.href = "index.html"; // Redirect to ProductEvaluation page
                            };

let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');
const themeImage = document.getElementById('theme-image'); // The image element

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    themeImage.src = 'web_images/VpicDark.png'; // Change the image for dark mode

};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
    themeImage.src = 'web_images/Vpic3.png';
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

// offers full view button
let allOffersShown = false; // Keep track of whether all offers are shown
function showOffers () {
   //alert("Working");
        const button = document.getElementById('moreOffers');
        const hiddenOffers = document.querySelectorAll('.hidden');
        const totalOffers = document.querySelectorAll('.offer');
        button.addEventListener('click', function() {
            if (!allOffersShown) {
                // Show next three hidden offers
                const offersToShow = Array.from(hiddenOffers).slice(0, 3);
                offersToShow.forEach(offer => {
                    offer.classList.remove('hidden'); // Show each hidden offer
                });
                if (hiddenOffers.length <= 3) {
                    button.textContent = 'Show Less Offers'; // Change button text
                }
            } else {
                // Hide the last three offers
                const offersToHide = Array.from(totalOffers).slice(-3);
                offersToHide.forEach(offer => {
                    offer.classList.add('hidden'); // Hide each offer
                });
                button.textContent = 'More Offers'; // Reset button text
            }
            // Toggle the state
            allOffersShown = !allOffersShown;
        });
}


// reviews hover details

document.addEventListener("DOMContentLoaded", function() {
    const reviews = document.querySelectorAll('.review');

    reviews.forEach(review => {
        review.addEventListener('mouseenter', function() {
            const additionalInfo = review.querySelector('.additional-info');
            additionalInfo.style.display = 'block';
            //additionalInfo.style.padding-left = '50%';
        });

        review.addEventListener('mouseleave', function() {
            const additionalInfo = review.querySelector('.additional-info');
            additionalInfo.style.display = 'none';
        });
    });
});

// Cart and Category pages
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
