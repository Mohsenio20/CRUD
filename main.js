let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

//get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +tax.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "rgba(10, 79, 10, 1)";
  } else {
    total.innerHTML = "";
    total.style.background = "#7d0c03ff";
  }
}

//create product

let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  //count
  // claen title , price and category and count
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count < 100
  ) {
    if (mood == "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[tmp] = newpro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    //دا علشان ميمسحش كل البيانات لو مدخلتش المطلوب بشكل صحيح
    clearData();
  }

  //save localStorage
  localStorage.setItem("product", JSON.stringify(datapro));

  showData();
};

//clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//read

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
              <tr>
              <td>${i + 1}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].tax}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">update</button></td>
              <td><button onclick="delitem(${i})" id="delete">delete</button></td>
            </tr>
            `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deletAall");
  if (datapro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick ="deleteall()">deleteAll(${datapro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

//delete
function delitem(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}
//delete all

function deleteall() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}

//count
//update

function updateData(i) {
  console.log(i);
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  tax.value = datapro[i].tax;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchMood = "title";
function getsearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "search by " + searchMood;

  search.focus();
  search.value = "";
  showData();
}
//search BY title مروق عليكم
function searchData(value) {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    if (searchMood == "title") {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
              <tr>
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].tax}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">update</button></td>
              <td><button onclick="delitem(${i})" id="delete">delete</button></td>
            </tr>
            `;
      }
    } else {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `
              <tr>
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].tax}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button id="update" onclick="updateData(${i})">update</button></td>
              <td><button onclick="delitem(${i})" id="delete">delete</button></td>
            </tr>
            `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

//clean data هيا وكاله من غير بواب
