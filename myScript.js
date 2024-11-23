
/*document.addEventListener("DOMContentLoaded", function () {
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
*/
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

	// Function to render offers
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


	// Function to show custom alerts
	function showCustomAlert(message) {
		const alertMessage = document.getElementById("alertMessage");
		const customAlert = document.getElementById("customAlert");

		alertMessage.innerHTML = message;
		customAlert.style.display = "flex";

		document.getElementById("closeAlert").onclick = function () {
			customAlert.style.display = "none";
		};
	}

	    function successAlert(message) {
            const thankMess = document.getElementById("thankMess");
            const thankdircMess = document.getElementById("thankdircMess");
                        //const customAlert = document.getElementById("customAlert");

            thankMess.innerHTML = message;
            thankdircMess.innerHTML ="thank you to be part of us!";
            document.getElementById("confirmModal").style.display = "block"; // Show the confirmation modal


        }

	// Function to show custom confirmation dialog
	function showCustomConfirmation(message, onConfirm) {
		const confirmMessage = document.getElementById("confirmMessage");
		const customConfirm = document.getElementById("customConfirm");

		confirmMessage.innerHTML = message;
		customConfirm.style.display = "flex";

		// When Confirm is clicked
		document.getElementById("confirmYes").onclick = function () {
			customConfirm.style.display = "none";
			onConfirm(); // Trigger the confirm action
		};

		// When Cancel is clicked
		document.getElementById("confirmNo").onclick = function () {
			customConfirm.style.display = "none";
		};
	}

	renderOffers();

	deleteButton.addEventListener("click", function () {
		const selectedCheckboxes = document.querySelectorAll(".offer-checkbox:checked");

		if (selectedCheckboxes.length === 0) {
			showCustomAlert("Please select at least one offer.");
			return;
		}

		showCustomConfirmation("Are you sure you want to delete the selected offers?", function () {
			const selectedIds = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.dataset.offerId));
			offers = offers.filter(offer => !selectedIds.includes(offer.id));
			renderOffers();
			successAlert("Selected offers have been deleted successfully.");
		});
	});

	const newOfferForm = document.getElementById("newOfferForm");
	newOfferForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const offerName = document.getElementById("offerName").value.trim();
		const offerDescription = document.getElementById("offerDescription").value.trim();
		const offerImageInput = document.getElementById("offerImage");

		// Validate inputs
		if (!offerName) {
			showCustomAlert("Please enter a valid Offer Name.");
			return;
		}
		if (!offerDescription) {
			showCustomAlert("Please enter a valid Offer Description.");
			return;
		}
		if (!offerImageInput.files.length) {
			showCustomAlert("Please upload an image for the offer.");
			return;
		}

		const file = offerImageInput.files[0];
		const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
		if (!validImageTypes.includes(file.type)) {
			showCustomAlert("Please upload a valid image file (JPEG, PNG, or JPG).");
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
		successAlert("New offer added successfully!");
	});
});
    function closeConfirmModal() {
        console.log("closeConfirmModal invoked");

        document.getElementById("confirmModal").style.display = "none"; // Hide the confirmation modal
    };





