// DOM dagi elementlarni JS file olib kelish

const elFormContact = document.querySelector(".js-contact-form");
const elInputContactUsername = elFormContact.querySelector(
  ".js-contact-username"
);
const elInputContactRel = elFormContact.querySelector(".js-contact-relative");
const elInputContactUserNumber =
  elFormContact.querySelector(".js-contact-number");

const elContactList = document.querySelector(".js-contact-list");
const elContactTemplate = document.querySelector(
  ".js-contact-template"
).content;

const contacts = [];

function checkUniqueNumberValue(arr, inputValue) {
  const findNumberIndex = arr.findIndex(function (item) {
    return item.number == inputValue;
  });

  return findNumberIndex;
}

function showContacts(arr, node) {
  node.innerHTML = "";

  arr.forEach(function (soloContact, index) {
    const contactTemplateClone = elContactTemplate.cloneNode(true);

    contactTemplateClone.querySelector(".js-contact-name").textContent =
      soloContact.username;
    contactTemplateClone.querySelector(".js-contact-relative").textContent =
      soloContact.relation;
    contactTemplateClone.querySelector(".js-user-phone-number").textContent =
      soloContact.number;
    contactTemplateClone.querySelector(
      ".js-user-phone-number"
    ).href = `tel:${soloContact.number}`;

    contactTemplateClone.querySelector(".js-delete-btn").dataset.contactIndex =
      index;

    node.appendChild(contactTemplateClone);
  });
}

function addContact(name, relation, number) {
  const contact = {
    username: name,
    relation: relation,
    number: number,
  };

  contacts.push(contact);
}

elFormContact.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const userNameInputValue = elInputContactUsername.value.trim();
  const userRelationInputValue = elInputContactRel.value.trim();
  const userPhoneNumberInputValue = elInputContactUserNumber.value.trim();

  // Early return

  const numberIndex = checkUniqueNumberValue(
    contacts,
    userPhoneNumberInputValue
  );

  if (numberIndex > -1) {
    elInputContactUserNumber.classList.add("is-invalid");
    return;
  } else {
    elInputContactUserNumber.classList.remove("is-invalid");
  }

  // Bundan keyingi code ishlamaydi

  addContact(
    userNameInputValue,
    userRelationInputValue,
    userPhoneNumberInputValue
  );

  showContacts(contacts, elContactList);
});

function deleteContact(index) {
  contacts.splice(index, 1);

  showContacts(contacts, elContactList);
}

elContactList.addEventListener("click", function (evt) {
  if (evt.target.matches(".js-delete-btn")) {
    const deleteBtnIndex = Number(evt.target.dataset.contactIndex);

    deleteContact(deleteBtnIndex);
  }
});

// const cars = [
//   {
//     name:"BMW",
//     year: 2015
//   },
//   {
//     name:"AUdi",
//     year: 2016
//   },
//   {
//     name:"Tesla",
//     year: 1995
//   },
//   {
//     name:"Volvo",
//     year: 2020
//   },

// ];

// const findCar = cars.findIndex(function(item, index){
//    return item.year == 2028;
// });

// console.log(findCar);
