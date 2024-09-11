
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const clearBtn = document.getElementById("clearBtn");
  
    // Attach blur (mouseout) event listeners for real-time validation of each field
    document.getElementById("firstName").addEventListener("blur", validateFirstName);
    document.getElementById("lastName").addEventListener("blur", validateLastName);
    document.getElementById("email").addEventListener("blur", validateEmail);
    document.getElementById("contactNumber").addEventListener("blur", validateContactNumber);
    document.getElementById("password").addEventListener("blur", validatePassword);
    document.getElementById("confirmPassword").addEventListener("blur", validateConfirmPassword);
    document.getElementById("terms").addEventListener("blur", validateTerms);
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const isValid = validateForm(); // Validate the form on submit
      if (isValid) {
        alert("Form submitted successfully!");
        form.reset();
        clearErrors();
      }
    });
  
    clearBtn.addEventListener("click", function () {
      form.reset();
      clearErrors();
    });
  
    function validateForm() {
      let isValid = true;
      isValid &= validateFirstName();
      isValid &= validateLastName();
      isValid &= validateEmail();
      isValid &= validateContactNumber();
      isValid &= validatePassword();
      isValid &= validateConfirmPassword();
      isValid &= validateTerms();
  
      return isValid;
    }
  
    function validateFirstName() {
      const firstName = document.getElementById("firstName").value.trim();
      const firstNameError = document.getElementById("firstNameError");
      const regex = /^[A-Za-z]+$/; // Only characters (A-Z and a-z)
  
      if (!firstName) {
        firstNameError.textContent = "First Name is required.";
        firstNameError.style.display = "block";
        return false;
      } else if (!regex.test(firstName)) {
        firstNameError.textContent = "First Name should only contain letters.";
        firstNameError.style.display = "block";
        return false;
      } else {
        firstNameError.style.display = "none";
        return true;
      }
    }
  
    function validateLastName() {
      const lastName = document.getElementById("lastName").value.trim();
      const lastNameError = document.getElementById("lastNameError");
      const regex = /^[A-Za-z]+$/; // Only characters (A-Z and a-z)
  
      if (!lastName) {
        lastNameError.textContent = "Last Name is required.";
        lastNameError.style.display = "block";
        return false;
      } else if (!regex.test(lastName)) {
        lastNameError.textContent = "Last Name should only contain letters.";
        lastNameError.style.display = "block";
        return false;
      } else {
        lastNameError.style.display = "none";
        return true;
      }
    }
  
    function validateEmail() {
      const email = document.getElementById("email").value.trim();
      const emailError = document.getElementById("emailError");
  
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailError.textContent = "Invalid email format.";
        emailError.style.display = "block";
        return false;
      } else {
        emailError.style.display = "none";
        return true;
      }
    }
  
    function validateContactNumber() {
      const contactNumber = document.getElementById("contactNumber").value.trim();
      const contactError = document.getElementById("contactError");
  
      if (!/^\d+$/.test(contactNumber)) {
        contactError.textContent = "Contact Number should only contain numbers.";
        contactError.style.display = "block";
        return false;
      } else {
        contactError.style.display = "none";
        return true;
      }
    }
  
    function validatePassword() {
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const password = document.getElementById("password").value;
      const passwordError = document.getElementById("passwordError");
      const specialChars = /[!@#$&*]/;
      const uppercase = /[A-Z]/;
      let isValid = true;
  
      if (password.length < 8 || !uppercase.test(password) || !specialChars.test(password)) {
        passwordError.textContent = "Password must be at least 8 characters, have one uppercase letter, and one special character.";
        passwordError.style.display = "block";
        isValid = false;
      } else if (password.includes(firstName) || password.includes(lastName)) {
        passwordError.textContent = "Password should not include your first or last name.";
        passwordError.style.display = "block";
        isValid = false;
      } else {
        passwordError.style.display = "none";
      }
      return isValid;
    }
  
    function validateConfirmPassword() {
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const confirmPasswordError = document.getElementById("confirmPasswordError");
  
      if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        confirmPasswordError.style.display = "block";
        return false;
      } else {
        confirmPasswordError.style.display = "none";
        return true;
      }
    }
  
    function validateTerms() {
      const termsChecked = document.getElementById("terms").checked;
      const termsError = document.getElementById("termsError");
  
      if (!termsChecked) {
        termsError.textContent = "You must accept the Terms & Conditions.";
        termsError.style.display = "block";
        return false;
      } else {
        termsError.style.display = "none";
        return true;
      }
    }
    
  
    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  
    function hideError(elementId) {
      const errorElement = document.getElementById(elementId);
      errorElement.style.display = "none";
    }
    const readMore = document.getElementById("readMore");
        readMore.addEventListener("click", function () {
          document.getElementById("termsFull").style.display = "block";
          readMore.style.display = "none";
        });
    function clearErrors() {
      document.getElementById("firstNameError").style.display = "none";
      document.getElementById("lastNameError").style.display = "none";
      document.getElementById("emailError").style.display = "none";
      document.getElementById("contactError").style.display = "none";
      document.getElementById("passwordError").style.display = "none";
      document.getElementById("confirmPasswordError").style.display = "none";
      document.getElementById("termsError").style.display = "none";
    }
  });
  