function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".modalwrapper");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector("form");
const formBtnSubmit = document.querySelector(".btn-submit");
let formInputs = {};

for (const field of form.elements) {
  formInputs = {
    ...formInputs,
    [field.name]: {
      state: false,
      errors: field.type,
    },
  };
}
delete formInputs[""];

const checkingRules = {
  first: {
    pattern: /^[a-zA-ZÀ-ÿ-]{3,20}$/,
    errorMessage:
      "Entrer une chaîne de caractères,supérieur à 3 et inférieur à 20. Elle ne doit pas comporter de caractères spéciaux.",
  },
  last: {
    pattern: /^[a-zA-ZÀ-ÿ-]{3,20}$/,
    errorMessage:
      "Entrer une chaîne de caractères,supérieur à 3 et inférieur à 20. Elle ne doit pas comporter de caractères spéciaux.",
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: "Entrer un email valide.",
  },
  birthdate: {
    pattern: /^[a-zA-ZÀ-ÿ-]{3,20}$/,
    date: Date.now(),
    errorMessage: "Entrer une date postérieure à demain.",
  },
  quantity: {
    pattern: /^(?:100|\d{1,2})$/,
    errorMessage: "Entrer le nombre de tournois effectués.",
  },
  location: {
    isChecked: true,
    errorMessage: "Cocher le tournois qui vous intéresse.",
  },
  condition: {
    isChecked: true,
    errorMessage: "Cocher les conditions d'utilisations.",
  },
};

// launch modal form
function launchModal() {
  modalbg.classList.add("modalwrapper--show");
}
function closeModal() {
  modalbg.classList.remove("modalwrapper--show");
}

/* Form */
function isFormValid() {
  let countError = 0;
  for (let key in formInputs) {
    if (formInputs[key].state == false) {
      countError++;
    }
  }
  if (countError == 0) {
    formBtnSubmit.disabled = false;
    formBtnSubmit.classList.remove("btn--disabled");
  } else {
    formBtnSubmit.disabled = true;
    formBtnSubmit.classList.add("btn--disabled");
  }
}
function handleError(errorText, target, isVisible) {
  let errorParagraph = target.parentNode;
  errorParagraph.setAttribute("data-error-visible", isVisible);
  errorParagraph.setAttribute("data-error", errorText);
}
function handleForm(e) {
  const rule = checkingRules[e.target.name];

  if (
    rule &&
    rule != checkingRules.condition &&
    rule != checkingRules.location
  ) {
    const testing = rule.pattern.test(e.target.value);

    if (rule.date) {
      let correctDate = Date.parse(e.target.value) < rule.date;
      if (correctDate) {
        formInputs[e.target.name].state = true;
        handleError("", e.target, false);
      } else {
        formInputs[e.target.name].state = false;
        handleError(rule.errorMessage, e.target, true);
      }
    } else if (testing) {
      formInputs[e.target.name].state = true;
      handleError("", e.target, false);
    } else {
      formInputs[e.target.name].state = false;
      handleError(rule.errorMessage, e.target, true);
    }
  } else if (
    (rule && rule == checkingRules.condition) ||
    rule == checkingRules.location
  ) {
    if (e.target.checked) {
      formInputs[e.target.name].state = true;
      handleError("", e.target, false);
    } else {
      formInputs[e.target.name].state = false;
      handleError(rule.errorMessage, e.target, true);
    }
  }

  isFormValid();
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// Watch Form
formBtnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
});
form.addEventListener("change", handleForm);
