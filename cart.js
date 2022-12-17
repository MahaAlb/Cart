"use strict";
let products = [];

const addProduct = function() {
  const productName = document.getElementById("product-name").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;
  document.getElementById("products").innerHTML += getProductHTMLRow(productName, price, quantity)}

// calculateShipping()
// calculateSubTotal()
// calculateTotal()

const calculateSubTotal = () => {
  const total_arr = documen.getElementsByClassName('product-total');
  let total = 0;
  total_arr.forEach( e => {
    total += Number(e.innerHTML)
  })
  document.getElementById('sub-total').innerHTML = `$${total}`;
}

const calculateShipping = () => {
  const total_arr = documen.getElementsByClassName('product-total');
  document.getElementById("shipping").innerHTML = `$${total_arr.length * 10}`
}

const calculateTotal = () => {
  const subTotal=document.getElementById('sub-total')
  const shipping=document.getElementById('shipping')
  document.getElementById('total'.innerHTML=`$${Number(subTotal)+Number(shipping)}`)
}

const getProductHTMLRow = (productName, price, quantity) => {
return ` <tr>
<td class="align-middle">${productName}</td>
<td class="align-middle">USD ${price}</td>
<td class="align-middle">
  <div class="input-group quantity mx-auto" style="width: 100px">
    <div class="input-group-btn">
      <button type="button" class="btn btn-sm btn-primary btn-minus" onclick="decQuantity()">
      -
      </button>
    </div>
    <input
      type="text"
      class="form-control form-control-sm bg-secondary border-0 text-center"
      value="${quantity}"
    />
    <div class="input-group-btn">
      <button type="button" class="btn btn-sm btn-primary btn-plus" onclick="incQuantity()">
        +
      </button>
    </div>
  </div>
</td>
<td class="align-middle product-total">USD ${price * quantity}</td>
<td class="align-middle">
  <button class="btn btn-sm btn-danger" onclick="remove()">
    <i class="fa fa-times"></i>
  </button>
</td>
</tr>`;
}

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

const login = async () => {
  let data = await fetch(`http://localhost:5000/api/users/login`,{
    method: 'POST',
    headers:{
      'x-access-token': 'Bearer <token>',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email":"ramymibrahim@yahoo.com","password":"123456"})
  })
  let res = await data.json();
  console.log(res);
  localStorage.setItem("x-access-token",res.token)
}

const displaySubTotal = function () {
  document.getElementById("sub-total").innerHTML = `USD ${calculateSubTotal()}`;
};

const displayShipping = function () {
  let shipping = calculateShipping();
  document.getElementById("shipping").innerHTML = `USD ${shipping}`;
};

const displayTotal = function () {
  let total = calculateSubTotal() + calculateShipping();
  document.getElementById("total").innerHTML = `USD ${total}`;
};

const validateInputs = function (productName, price, quantity) {
  return true;
};

const decQuantity = function (i) {
  if (products[i].quantity > 1) {
    products[i].quantity -= 1;
    localStorage.setItem("products", JSON.stringify(product));
    display();
  }
};

const incQuantity = function (i) {
  products[i].quantity = Number(products[i].quantity) + 1;
  localStorage.setItem("products", JSON.stringify(product));
  display();
};

const remove = function (i) {
  if (confirm("Are you sure?")) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(product));
    display();
  }
};

JSON.parse(localStorage.getItem("products") || "[]");
// //store cart items

// let cart = {};

// if (id in cart) {
//   cart[id].quantity++;
// } else {
//   let cartItem = {
//       productName: productName,
//       price: price,
//       quantity: 1
//   };
//   cart[id] = cartItem
// }

// //add to local storage
// localStorage.setItem("cart", JSON.stringify(cart));

// //create table rows
// if (localStorage.getItem("cart")) {
//   cart = JSON.parse(localStorage.getItem("cart"));
// }

// let product_tbody = document.getElementById("tbody");

// for (let id in cart) {
//     let item = cart[id];

//     let product_tr = document.createElement('tr')

//     let productName_td = document.createElement('td')
//     productName_td.textContent = item.productName
//     product_tr.appendChild(productName_td)

//     let price_td = document.createElement("td");
//     price_td.textContent = item.price;
//     product_tr.appendChild(price_td);

//     let quantity_td = document.createElement("td");
//     quantity_td.textContent = item.quantity;
//     product_tr.appendChild(quantity_td);

//     tbody.appendChild(product_tr)

// }