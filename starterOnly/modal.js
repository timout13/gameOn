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
let data = {};

for (const field of form.elements) {
  formInputs = {
    ...formInputs,
    [field.name]: {
      state: false,
    },
  };
}
delete formInputs[""];
delete formInputs["newsletter"];

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
    errorMessage: "Entrer une date correcte.",
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

const handleTesting = (msg, target, visibility, state) => {
  formInputs[target.name].state = state;
  handleError(msg, target, visibility);
};

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
        handleTesting("", e.target, false, true);
        data = { ...data, [e.target.name]: e.target.value };
      } else {
        handleTesting(rule.errorMessage, e.target, true, false);
      }
    } else if (testing) {
      handleTesting("", e.target, false, true);
      data = { ...data, [e.target.name]: e.target.value };
    } else {
      handleTesting(rule.errorMessage, e.target, true, false);
    }
  } else if (
    (rule && rule == checkingRules.condition) ||
    rule == checkingRules.location
  ) {
    if (e.target.checked) {
      handleTesting("", e.target, false, true);
    } else {
      handleTesting(rule.errorMessage, e.target, true, false);
    }
  }
  isFormValid();
}

const afterSubmission = (e) => {
  e.preventDefault();
  let newsletterCheckbox = document.querySelector("[name='newsletter']");
  data = { ...data, [newsletterCheckbox.name]: newsletterCheckbox.checked };
  let modalBody = document.querySelector(".modal-body");
  let p = document.createElement("p");
  let btn = document.createElement("button");
  btn.classList.add("btn-signup");
  btn.classList.add("modal-btn");
  btn.innerText = "Fermer";
  btn.addEventListener("click", closeModal);
  p.innerText = "Merci d'avoir réserver !";
  console.log(data);
  form.remove();
  modalBody.append(p);
  modalBody.append(btn);
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// Watch Form
formBtnSubmit.addEventListener("click", afterSubmission);
form.addEventListener("change", handleForm);
