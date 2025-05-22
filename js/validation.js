// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Validate Contact Form
    const contactForm = document.querySelector("#contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();
  
        if (name === "" || email === "" || message === "") {
          alert("Please fill in all fields.");
          e.preventDefault();
          return;
        }
  
        if (!validateEmail(email)) {
          alert("Please enter a valid email address.");
          e.preventDefault();
        }
      });
    }
  
    // Validate Checkout Form
    const checkoutForm = document.querySelector("#checkoutForm");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", function (e) {
        const name = document.querySelector("#checkout-name").value.trim();
        const address = document.querySelector("#checkout-address").value.trim();
        const phone = document.querySelector("#checkout-phone").value.trim();
  
        if (name === "" || address === "" || phone === "") {
          alert("All checkout fields are required.");
          e.preventDefault();
        }
      });
    }
  });
  
  // Email format checker
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
  