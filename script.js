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

    // html display
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
        showAlert(`Thank you for your feedback!<br><br>Your rating for ${selectedProduct} is ${selectedRating} stars`, true); // Feedback message, trigger redirect
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

            showAlert(`Product "${productName.value}" has been added successfully.`);

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


let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
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

//////////////// offerCollections Page /////////////////

document.addEventListener("DOMContentLoaded", function () {
    let offers = [
        { id: 1, name: "Flash Sale", description: "Quick! This flash sale lasts for only a few hours. Grab your favorites before they’re gone!", image: "web_images/Offer.png" },
        { id: 2, name: "Hot & Trending", description: "Check out our hot and trending items that everyone is talking about. Don’t miss your chance to own them!", image: "web_images/Screenshot%20(92).png" },
        { id: 3, name: "Seasonal Discount", description: "Celebrate the season with our exclusive discounts. Perfect for refreshing your wardrobe or home!", image: "web_images/Screenshot%20(94).png" },
        { id: 4, name: "Only a Few Left!", description: "Limited quantities available! Grab your favorites before they’re gone for good!", image: "web_images/ONLYONE.jpg" },
        { id: 5, name: "Save 20%", description: "Enjoy a straight 20% off your purchase. It’s the perfect time to try something new!", image: "web_images/Screenshot%20(93).png" },
        { id: 6, name: "Mystery Discount", description: "Unlock a mystery discount! Every purchase qualifies—find out how much you save at checkout!", image: "web_images/Screenshot%20(95).png" }
    ];

    const offerList = document.getElementById("offerList");
    const deleteButton = document.getElementById("deleteButton");

    function renderOffers() {
        offerList.innerHTML = ""; // Clear the existing offer list

        offers.forEach((offer) => {
            const offerBox = document.createElement("div");
            offerBox.classList.add("offer-box");
            offerBox.dataset.offerId = offer.id;

            const checkboxContainer = document.createElement("div");
            checkboxContainer.classList.add("checkbox-container");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("offer-checkbox");
            checkbox.dataset.offerId = offer.id;
            checkboxContainer.appendChild(checkbox);
            offerBox.appendChild(checkboxContainer);

            const offerTitle = document.createElement("h3");
            offerTitle.textContent = offer.name;
            offerBox.appendChild(offerTitle);

            const offerDesc = document.createElement("p");
            offerDesc.textContent = offer.description;
            offerBox.appendChild(offerDesc);

            const offerImage = document.createElement("img");
            offerImage.src = offer.image;
            offerImage.alt = offer.name;
            offerBox.appendChild(offerImage);

            offerList.appendChild(offerBox);
        });
    }

    renderOffers();

    deleteButton.addEventListener("click", function () {
        const selectedCheckboxes = document.querySelectorAll(".offer-checkbox:checked");

        if (selectedCheckboxes.length === 0) {
            alert("Please select at least one offer.");
            return;
        }

        const confirmDelete = confirm("Are you sure you want to delete the selected offers?");
        if (confirmDelete) {
            const selectedIds = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.dataset.offerId));
            offers = offers.filter(offer => !selectedIds.includes(offer.id));
            renderOffers();
        }
    });

    const newOfferForm = document.getElementById("newOfferForm");
    newOfferForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const offerName = document.getElementById("offerName").value.trim();
        const offerDescription = document.getElementById("offerDescription").value.trim();
        const offerImageInput = document.getElementById("offerImage");

        // Validate inputs
        if (!offerName) {
            alert("Please enter a valid Offer Name.");
            return;
        }
        if (!offerDescription) {
            alert("Please enter a valid Offer Description.");
            return;
        }
        if (!offerImageInput.files.length) {
            alert("Please upload an image for the offer.");
            return;
        }

        const file = offerImageInput.files[0];
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validImageTypes.includes(file.type)) {
            alert("Please upload a valid image file (JPEG, PNG, or JPG).");
            return;
        }

        const newOffer = {
            id: Date.now(), // Unique ID based on timestamp
            name: offerName,
            description: offerDescription,
            image: URL.createObjectURL(file),
        };

        offers.push(newOffer);
        renderOffers(); // Refresh the offers list
        newOfferForm.reset();
        alert("New offer added successfully!");
    });
});





