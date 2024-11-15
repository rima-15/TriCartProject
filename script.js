// date in the home page

document.addEventListener("DOMContentLoaded", function() {
    // Get the current date
    const today = new Date();

    // Calculate the current week's starting date (Sunday)
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const sundayDate = new Date(today); // Clone today's date
    sundayDate.setDate(today.getDate() - dayOfWeek); // Set to the previous Sunday

    // Format the date as needed (e.g., "Sunday, 7 February")
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = sundayDate.toLocaleDateString('en-US', options);

    // Display the date in the HTML
    document.getElementById('week-start-date').textContent = `Week starts on: ${formattedDate}`;
});

document.addEventListener("DOMContentLoaded", function() {
    function validateForm(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get selected order, product, and rating
        const orderSelect = document.getElementById("listsOforder");
        const productSelect = document.getElementById("ListOfproduct");
        const ratingSelect = document.querySelector(".rating-star");

        const selectedOrder = orderSelect.value;
        const selectedProduct = productSelect.options[productSelect.selectedIndex].text;
        const selectedRating = ratingSelect.value;

        // Check if both order and rating are selected
        if (!selectedOrder || !selectedRating) {
            alert("Please select an order and a rating.");
            return;
        }

        // Display alert with feedback
        alert(`Thank you for your feedback!\n\nYour rating for ${selectedProduct} is ${selectedRating} stars`);

        // Redirect to Home page
        window.location.href = "HomePage.html";
    }

    // Attach the validateForm function to the form's submit event
    document.querySelector("form").addEventListener("submit", validateForm);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const productName = document.getElementById("productName");
  const category = document.getElementById("category");
  const price = document.getElementById("price");
  const quantity = document.getElementById("quantity");
  const description = document.getElementById("description");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validation
    if (!productName.value.trim() || !category.value || !price.value  || !quantity.value  || !description.value.trim() || !imageUpload.files.length) {
      alert("Please fill in all the fields.");
      return;
    }
    if (!isNaN(productName.value.charAt(0))) {
      alert("Product name should not start with a number.");
      return;
    }
    if (isNaN(price.value) || isNaN(quantity.value)) {
      alert("Price and quantity should be numbers.");
      return;
    }

    // Product Object
    const newProduct = {
      name: productName.value,
      category: category.value,
      price: parseFloat(price.value),
      quantity: parseInt(quantity.value, 10),
      description: description.value
    };

    // Save to Local Storage
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    // Alert and Clear Form
    alert(`Product "${productName.value}" has been added successfully.`);
    form.reset();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const productList = document.querySelector(".product-list");

  // Check if productList exists in the DOM
  if (!productList) {
    console.error("Element with class 'product-list' not found in the DOM.");
    return;
  }

  // Retrieve products from local storage
  const products = JSON.parse(localStorage.getItem("products")) || [];

  // Check if there are any products
  if (products.length === 0) {
    productList.innerHTML = "<p>No products added yet.</p>";
    return;
  }

  // Loop through each product and add it to the product-list div
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
                // Change button text if no more hidden offers
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

document.addEventListener("DOMContentLoaded", function() {
    let offers = [
        { id: 1, name: "Flash Sale", description: "Quick! This flash sale lasts for only a few hours.", image: "web_images/1offer.jpeg" },
        { id: 2, name: "Hot & Trending", description: "Check out our hot and trending items.", image: "web_images/2offer.jpeg" },
        { id: 3, name: "Seasonal Discount", description: "Celebrate the season with our exclusive discounts.", image: "web_images/3offer.jpeg" },
        { id: 4, name: "Only a Few Left!", description: "Limited quantities available!", image: "web_images/4,3offer.png" },
        { id: 5, name: "Save 20%", description: "Enjoy a straight 20% off your purchase.", image: "web_images/5offer.jpeg" },
        { id: 6, name: "Mystery Discount", description: "Unlock a mystery discount!", image: "web_images/6offer.jpeg" }
    ];
    const offerList = document.getElementById("offerList");
    const deleteButton = document.getElementById("deleteButton");
    function renderOffers() {
        offerList.innerHTML = "";
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
    deleteButton.addEventListener("click", function() {
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
    newOfferForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const offerName = document.getElementById("offerName").value.trim();
        const offerDescription = document.getElementById("offerDescription").value.trim();
        const offerImageInput = document.getElementById("offerImage");
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
        const newOfferId = offers.length ? offers[offers.length - 1].id + 1 : 1;
        const newOffer = {
            id: newOfferId,
            name: offerName,
            description: offerDescription,
            image: URL.createObjectURL(file)
        };
        offers.push(newOffer);
        renderOffers();
        newOfferForm.reset();
        alert("New offer added successfully!");
    });
});

// reviews hover details

document.addEventListener("DOMContentLoaded", function() {
    const reviews = document.querySelectorAll('.review');

    reviews.forEach(review => {
        review.addEventListener('mouseenter', function() {
            const additionalInfo = review.querySelector('.additional-info');
            additionalInfo.style.display = 'block';
        });

        review.addEventListener('mouseleave', function() {
            const additionalInfo = review.querySelector('.additional-info');
            additionalInfo.style.display = 'none';
        });
    });
});

// offers collection

function ProductFormHandler() {
    this.init = function () {
        const newOfferForm = document.getElementById("newOfferForm");

        newOfferForm.addEventListener("submit", (event) => {
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

            // Pass the new offer to the OffersManager
            if (typeof OffersManager !== "undefined") {
                OffersManager.addOffer(newOffer);
            }

            newOfferForm.reset();
            alert("New offer added successfully!");
        });
    };
}

document.addEventListener("DOMContentLoaded", function() {
    const productFormHandler = new ProductFormHandler();
    productFormHandler.init();
});

