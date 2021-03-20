let filteredEmployees;

// Sort by
const sortBy = [
  { criterio: "1", descricao: "Nome ascendente" },
  { criterio: "2", descricao: "Nome descendente" },
  { criterio: "3", descricao: "Salário ascendente" },
  { criterio: "4", descricao: "Salário descendente" },
];

let select = document.querySelector("#select");

let selectList = document.createElement("select");
select.appendChild(selectList);

sortBy.forEach((el) => {
  let option = document.createElement("option");
  option.value = el.criterio;
  option.text = el.descricao;
  selectList.appendChild(option);
});

selectList.addEventListener("change", () => listEmployees());

// Filter by Roles
rolesfs = document.querySelector("#rolesfs");

roles.sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

roles.forEach((role) => {
  let lb = document.createElement("label");

  let chk = document.createElement("input");
  chk.setAttribute("type", "checkbox");
  chk.setAttribute("name", "roles");
  chk.setAttribute("id", role.id);
  chk.setAttribute("value", role.name);

  lb.appendChild(chk);
  lb.appendChild(document.createTextNode(role.name));

  lb.addEventListener("change", () => listEmployees());

  rolesfs.appendChild(lb);

  let br = document.createElement("br");
  rolesfs.appendChild(br);
});

function filterList() {
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');

  if (checked.length) {
    const chArr = Array.apply(null, checked).map((el) => +el.id);
    filteredEmployees = employees.filter(
      (emp) => chArr.indexOf(emp.role_id) >= 0
    );
  } else {
    filteredEmployees = [...employees];
  }
}

let i = 0;

function flexSort(a, b, key) {
  if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
    return 0;
  }

  const compA = a[key];
  const compB = b[key];

  if (compA > compB) {
    return 1;
  } else if (compB > compA) {
    return -1;
  }
  return 0;
}

function sort() {
  if (selectList.value == "2") {
    filteredEmployees.sort((a, b) => -flexSort(a, b, "name"));
    console.log(i++);
  } else if (selectList.value == 3) {
    filteredEmployees.sort((a, b) => flexSort(a, b, "salary"));
    console.log(i++);
  } else if (selectList.value == 4) {
    filteredEmployees.sort((a, b) => -flexSort(a, b, "salary"));
  } else {
    filteredEmployees.sort((a, b) => flexSort(a, b, "name"));
  }
  console.log(filteredEmployees);
}

function listEmployees() {
  filterList();
  sort();

  let nrosEmp = document.querySelector("#nrosEmp");
  nrosEmp.innerHTML = "" + filteredEmployees.length;

  let table = document.querySelector("#lista");
  let corpoLista = document.querySelector("#corpoLista");

  corpoLista.innerHTML = "";

  filteredEmployees.forEach((emp) => {
    let tr = document.createElement("tr");
    tr.appendChild(createTdElement(emp.id));
    tr.appendChild(createTdElement(emp.name));
    tr.appendChild(
      createTdElement(roles.find((el) => el.id === emp.role_id).name)
    );
    tr.appendChild(createTdElement(emp.salary));
    corpoLista.appendChild(tr);
  });
}

function createTdElement(texto) {
  let td = document.createElement("td");
  td.innerText = texto;
  return td;
}

listEmployees();
