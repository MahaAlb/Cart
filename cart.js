"use strict";
let products = [];

const addProduct = function () {
  const productName = document.getElementById("product-name").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;

  if (!validateInputs(productName, price, quantity)) {
    alert("Invalid Inputs");
    return;
  }

  const product = {
    productName: productName,
    price: price,
    quantity: quantity,
    getTotal: function () {
      return this.price * this.quantity;
    },
  };
  products.push(product);

  display();
};

const display = function () {
  displayProducts();
  displaySubTotal();
  displayShipping();
  displayTotal();
};

const displayProducts = function () {
  document.getElementById("products").innerHTML = "";
  products.forEach((p, i) => {
    document.getElementById("products").innerHTML += ` <tr>
    <td class="align-middle">
      <img src="img/${p.productName}.jpg" alt="" style="width: 50px" />
      ${p.productName}
    </td>
    <td class="align-middle">USD ${p.price}</td>
    <td class="align-middle">
      <div
        class="input-group quantity mx-auto"
        style="width: 100px"
      >
        <div class="input-group-btn">
          <button class="btn btn-sm btn-primary btn-minus" onclick="decQuantity(${i})">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <input type="text" value="${p.quantity}"/>
        <div class="input-group-btn">
          <button onclick="incQuantity(${i})">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </td>
    <td class="align-middle">USD ${p.getTotal()}</td>
    <td class="align-middle">
      <button class="btn btn-sm btn-danger" onclick="remove(${i})">
        <i class="fa fa-times"></i>
      </button>
    </td>
  </tr>`;
  });
};

const displaySubTotal = function () {
  document.getElementById("sub-total").innerHTML = `USD ${calculateSubTotal()}`;
};

const displayShipping = function () {
  let shipping = calculateShipping();
  document.getElementById("shipping").innerHTML = `USD ${shipping}`;
};

const calculateSubTotal = function () {
  let total = 0;
  //   for (let i = 0; i < products.length; i++) {
  //     total += products[i].total;
  //   }
  //continue
  //break
  products.forEach((p) => {
    total += p.getTotal();
  });
  return total;
};

const displayTotal = function () {
  let total = calculateSubTotal() + calculateShipping();
  document.getElementById("total").innerHTML = `USD ${total}`;
};

const calculateShipping = function () {
  return Math.round(calculateSubTotal() * 0.1);
};

const validateInputs = function (productName, price, quantity) {
  return true;
};

const decQuantity = function (i) {
  if (products[i].quantity > 1) {
    products[i].quantity -= 1;
    display();
  }
};

const incQuantity = function (i) {
  products[i].quantity = Number(products[i].quantity) + 1;
  display();
};

const remove = function (i) {
  if (confirm("Are you sure?")) {
    products.splice(i, 1);
    display();
  }
};

//store cart items
if (id in cart) {
  cart[id].quantity++;
} else {
  let cartItem = {
      productName: productName,
      price: price,
      quantity: 1
  };
  cart[id] = cartItem
}

//add to local storage
localStorage.setItem("cart", JSON.stringify(cart));

//create table rows
let cart = {};
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

let tbody = document.getElementById("tbody");

for (let id in cart) {
    let item = cart[id];

    let tr = document.createElement('tr')

    let productName_td = document.createElement('td')
    productName_td.textContent = item.productName
    tr.appendChild(productName_td)


    let price_td = document.createElement("td");
    price_td.textContent = item.price;
    tr.appendChild(price_td);

    let quantity_td = document.createElement("td");
    quantity_td.textContent = item.quantity;
    tr.appendChild(quantity_td);

    tbody.appendChild(tr)

}