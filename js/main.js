"use strict";

const form = document.querySelector("form");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const ageInput = document.querySelector("#age");
const organizationInput = document.querySelector("#organization");
const dateInput = document.querySelector("#start-date");
const hasChildCheckbox = document.querySelector("#has-child");
const roleSelect = document.querySelector("#role");
const qualSelect = document.querySelector("#qualification");
const saveBtn = document.querySelector("#save");
const tableBody = document.querySelector("#workers-table tbody");
let workers = [];

class Worker {
  constructor(firstName, lastName, age, hasChild) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._age = age;
    this._hasChild = hasChild;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(name) {
    this._firstName = name;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(name) {
    this._lastName = name;
  }

  get age() {
    return this._age;
  }

  set age(age) {
    this._age = age;
  }

  get hasChild() {
    return this._hasChild;
  }

  set hasChild(hasChild) {
    this._hasChild = hasChild;
  }

  deleteWorker(index) {
    workers.splice(index, 1);
    saveData();
    renderTable();
  }
}

class FrontendDev extends Worker {
  constructor(firstName, lastName, age, hasChild, organization, startDate, qualification) {
    super(firstName, lastName, age, hasChild);
    this._organization = organization;
    this._startDate = startDate;
    this._role = "Frontend разработчик";
    this._qualification = qualification;
  }

  get organization() {
    return this._organization;
  }

  set organization(organization) {
    this._organization = organization;
  }

  get startDate() {
    return this._startDate;
  }

  set startDate(startDate) {
    this._startDate = startDate;
  }

  get qualification() {
    return this._qualification;
  }

  set qualification(qualification) {
    this._qualification = qualification;
  }

  get role() {
    return this._role;
  }
}

class BackendDev extends Worker {
  constructor(firstName, lastName, age, hasChild, organization, startDate, qualification) {
    super(firstName, lastName, age, hasChild);
    this._organization = organization;
    this._startDate = startDate;
    this._role = "Backend разработчик";
    this._qualification = qualification;
  }

  get organization() {
    return this._organization;
  }

  set organization(organization) {
    this._organization = organization;
  }

  get startDate() {
    return this._startDate;
  }

  set startDate(startDate) {
    this._startDate = startDate;
  }

  get qualification() {
    return this._qualification;
  }

  set qualification(qualification) {
    this._qualification = qualification;
  }

  get role() {
    return this._role;
  }
}

saveBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (form.checkValidity() && checkValues()) {
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const age = +ageInput.value;
    const organization = organizationInput.value;
    const date = dateInput.value;
    const qual = qualSelect.options[qualSelect.selectedIndex].text;
    let hasChild = false;
    if (hasChildCheckbox.checked) {
      hasChild = true;
    }

    let newWorker = null;

    switch (roleSelect.value) {
      case "frontend":
        newWorker = new FrontendDev(firstName, lastName, age, hasChild, organization, date, qual);
        break;
      case "backend":
        newWorker = new BackendDev(firstName, lastName, age, hasChild, organization, date, qual);
        break;
    }

    workers.push(newWorker);
    saveData();
    renderTable();
    clearForm();
  }
});

const renderTable = () => {
  tableBody.innerHTML = "";

  workers.forEach((worker, index) => {
    const row = document.createElement("tr");

    Object.values(worker).forEach((value) => {
      const cell = document.createElement("td");
      if (typeof value === "boolean") {
        if (value) {
          cell.textContent = "Да";
        } else {
          cell.textContent = "Нет";
        }
      } else {
        cell.textContent = value;
      }

      row.appendChild(cell);
    });

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.addEventListener("click", () => worker.deleteWorker(index));
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  });
};

const isNumber = (num) => {
  if (num === null) {
    return 0;
  }

  return !isNaN(parseFloat(num)) && isFinite(num);
};

const isString = (str) => {
  return typeof str === "string" && /[^\d]/.test(str);
};

const checkValues = () => {
  let allValid = true;

  if (!isNumber(ageInput.value)) {
    allValid = false;
  }

  if (!isString(firstNameInput.value)) {
    allValid = false;
  }

  if (!isString(lastNameInput.value)) {
    allValid = false;
  }

  if (!isString(organizationInput.value)) {
    allValid = false;
  }

  return allValid;
};

const clearForm = () => {
  const formInputs = form.querySelectorAll("input");
  formInputs.forEach((input) => {
    input.value = "";
  });

  hasChildCheckbox.checked = false;
  roleSelect.value = "";
  qualSelect.value = "";
};

const saveData = () => {
  const jsonString = JSON.stringify(workers);
  localStorage.setItem("Workers", jsonString);
};

const loadData = () => {
  const storedData = localStorage.getItem("Workers");

  if (storedData) {
    workers = JSON.parse(storedData).map((workerData) => {
      let worker = null;

      if (workerData._role === "Frontend разработчик") {
        worker = new FrontendDev(
          workerData._firstName,
          workerData._lastName,
          workerData._age,
          workerData._hasChild,
          workerData._organization,
          workerData._startDate,
          workerData._qualification
        );
      } else if (workerData._role === "Backend разработчик") {
        worker = new BackendDev(
          workerData._firstName,
          workerData._lastName,
          workerData._age,
          workerData._hasChild,
          workerData._organization,
          workerData._startDate,
          workerData._qualification
        );
      }

      worker._role = workerData._role;

      return worker;
    });
    renderTable();
  }
};

loadData();

// localStorage.clear();
