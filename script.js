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
