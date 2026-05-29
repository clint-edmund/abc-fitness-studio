/* =========================
   GALLERY PAGE - sessionStorage (Cart)
========================= */
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const clearCartBtn = document.getElementById("clearCartBtn");
const processOrderBtn = document.getElementById("processOrderBtn");

/* GET CART */
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

/* SAVE CART */
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

/* DISPLAY CART */
function displayCart() {
  if (!cartCount || !cartItems) return;

  const cart = getCart();
  cartCount.textContent = cart.length;
  cartItems.innerHTML = "";

  cart.forEach(function(item) {
    const li = document.createElement("li");
    li.textContent = item.name + " - $" + item.price;
    cartItems.appendChild(li);
  });
}

/* ADD TO CART */
if (addToCartButtons.length > 0) {
  addToCartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const itemName = button.getAttribute("data-name");
      const itemPrice = button.getAttribute("data-price");

      const cart = getCart();
      cart.push({ name: itemName, price: itemPrice });

      saveCart(cart);
      displayCart();

      alert(itemName + " has been added to your cart.");
    });
  });
}

/* CLEAR CART */
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", function() {
    sessionStorage.removeItem("cart");
    displayCart();

    alert("Your cart has been cleared.");
  });
}

/* PROCESS ORDER */
if (processOrderBtn) {
  processOrderBtn.addEventListener("click", function() {
    const cart = getCart();

    if (cart.length === 0) {
      alert("Your cart is empty. Please add an item first.");
      return;
    }

    alert("Your order has been processed.");

    sessionStorage.removeItem("cart");
    displayCart();
  });
}

/* LOAD CART ON PAGE LOAD */
displayCart();


/* =========================
   CONTACT PAGE - localStorage
========================= */
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const orderInput = document.getElementById("order");
const formMessage = document.getElementById("formMessage");
const clearOrderBtn = document.getElementById("clearOrderBtn");

/* LOAD SAVED CONTACT DATA */
if (contactForm) {
  window.addEventListener("load", function () {
    if (nameInput && emailInput && orderInput) {
      nameInput.value = localStorage.getItem("customerName") || "";
      emailInput.value = localStorage.getItem("customerEmail") || "";
      orderInput.value = localStorage.getItem("customerOrder") || "";
    }
  });

  /* SUBMIT CONTACT FORM */
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    localStorage.setItem("customerName", nameInput.value);
    localStorage.setItem("customerEmail", emailInput.value);
    localStorage.setItem("customerOrder", orderInput.value);

    alert("Your order has been saved.");
    if (formMessage) {
      formMessage.textContent = "Your order information has been saved.";
    }
  });
}

/* CLEAR SAVED ORDER */
if (clearOrderBtn) {
  clearOrderBtn.addEventListener("click", function() {

    localStorage.removeItem("customerName");
    localStorage.removeItem("customerEmail");
    localStorage.removeItem("customerOrder");

    if (nameInput && emailInput && orderInput) {
      nameInput.value = "";
      emailInput.value = "";
      orderInput.value = "";
    }

    alert("Your saved order has been cleared.");
    if (formMessage) {
      formMessage.textContent = "Saved order has been cleared.";
    }
  });
}


/* =========================
   NEWSLETTER SUBSCRIBE
========================= */
const newsletterForm = document.getElementById("newsletterForm");

/* SUBSCRIBE FORM */
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function(event) {
    event.preventDefault();

    alert("Thank you for subscribing to our newsletter!");

    newsletterForm.reset();
  });
}