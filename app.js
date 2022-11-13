const password = document.getElementById("password");
const form = document.querySelector("form");

const inputValidity = {
  email: {
    requiredMsg: "Email is required",
    errorMsg: "Please enter valid email (example: yourname@mail.get)",
    regex:
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}$/,
    required: true,
    valid: false,
  },
  country: {
    requiredMsg: "Country is required",
    errorMsg: "Please enter valid country",
    regex: /^[A-Z][a-z\s]{2,}/,
    required: false,
    valid: true,
  },
  zipCode: {
    requiredMsg: "Zip-code is required",
    errorMsg: "Please enter valid zip-code (example: 999-999)",
    regex: /^[0-9]{3}-[0-9]{3}$/,
    required: false,
    valid: true,
  },
  password: {
    requiredMsg: "Password is required",
    errorMsg:
      "Password needs to be at least 8 characters long and have at least one uppercase char, one lowercase char and one number",
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    required: true,
    valid: false,
  },
  passwordConfirm: {
    requiredMsg: "Confirm password is required",
    errorMsg: "Paswords do not match ",
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    required: true,
    valid: false,
  },
};

const validityMethods = {
  determineValidity(e) {
    let isValid = this.valid;
    if (e.target.id === "passwordConfirm") {
      isValid = e.target.value === password.value;
    } else if (this.required) {
      isValid =
        e.target.value !== undefined &&
        e.target.value.length > 0 &&
        this.regex.test(e.target.value);
    } else {
      if (e.target.value === undefined || e.target.value.length === 0) {
        isValid = true;
      } else {
        isValid = this.regex.test(e.target.value);
      }
    }
    this.valid = isValid;

    if (isValid) {
      e.target.classList.remove("invalid");
      e.target.nextElementSibling.classList.remove("active");
      e.target.nextElementSibling.textContent = "";
    } else {
      if (
        this.required &&
        (e.target.value === undefined || e.target.value.length === 0)
      ) {
        e.target.classList.add("invalid");
        e.target.nextElementSibling.classList.add("active");
        e.target.nextElementSibling.textContent = this.requiredMsg;
      } else {
        e.target.classList.add("invalid");
        e.target.nextElementSibling.classList.add("active");
        e.target.nextElementSibling.textContent = this.errorMsg;
      }
    }
    return isValid;
  },
};

Object.keys(inputValidity).forEach((item) => {
  Object.assign(inputValidity[item], validityMethods);
});

form.addEventListener("input", (e) => {
  inputValidity[e.target.id].determineValidity(e);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const keys = Object.keys(inputValidity);
  const validity = keys.every((item) => inputValidity[item].valid);
  if (validity) {
    form.innerHTML = `<h1 style='color: green'>All is good, good job!</h1>`;
  } else {
    for (const key of keys) {
      if (keys.some((item) => !inputValidity[item].valid)) {
        e.target.lastElementChild.previousElementSibling.classList.add(
          "active"
        );
        e.target.lastElementChild.previousElementSibling.textContent =
          "Please fill all required fields";
      }
      if (!inputValidity[key].valid) {
        document.getElementById(key).classList.add("invalid");
      }
    }
  }
});
