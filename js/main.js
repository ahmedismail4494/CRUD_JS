

//  Call Elements
let title = document.querySelector('#title'); 
let price = document.querySelector('#price'); 
let taxes = document.querySelector('#taxes'); 
let ads = document.querySelector('#ads'); 
let discount = document.querySelector('#discount'); 
let total = document.querySelector('#total'); 
let count = document.querySelector('#count'); 
let category = document.querySelector('#category'); 
let submit = document.querySelector('#submit'); 



// Video (10) 
let mood = "create";
let UpdElm;



// Get Total
function GetTotal() {
  if(price.value !== ""){
                 // for convert string to numvber you should but   +befor-Element
    let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  }else{
    total.innerHTML = "0";
    total.style.background = "red";
  }
}

// Create Product & Save at LocalStorage
let dataProduct;
if(localStorage.Product != null){
  dataProduct = JSON.parse(localStorage.Product);
}else{
  dataProduct = [];
}

submit.onclick = function () { 'use strict';
  let newProduct = {
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value
  }

  if(title.value!="" && price.value!="" && category.value!="" && count.value<100) {
      // Create Or ***Update***
    if(mood == "create"){
      // Create Count Product 
      if(newProduct.count > 1) {
        for(let c=0; c<newProduct.count; c++ ){
          dataProduct.push(newProduct);
        }
      }else{
        dataProduct.push(newProduct);
      }
    }else{
      dataProduct[UpdElm] =  newProduct;
      mood = "create";
      submit.innerHTML = 'Create';
      count.style.display = "block"; 
    }
  }else{
    null
  }

  
  
  // Save Localstorage  // storagy array in local storage
  localStorage.setItem("Product", JSON.stringify(dataProduct));

  clearData();
  showData();
}


//  Clear input 
function clearData(){ 'use strict';
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = "0";
  count.value = '';
  category.value = '';
}


//  Read Data
function showData(){ 'use strict';
  GetTotal();
  let table = '';
  for(let i=0; i<dataProduct.length; i++ ){
    table += `
      <tr>
        <th> ${i+1} </th>
        <th> ${dataProduct[i].title} </th>
        <th> ${dataProduct[i].price} </th>
        <th> ${dataProduct[i].taxes} </th>
        <th> ${dataProduct[i].ads} </th>
        <th> ${dataProduct[i].discount} </th>
        <th> ${dataProduct[i].total} </th>
        <th> ${dataProduct[i].category} </th>
        <th> <button id="update"onclick="updateData(${i})" > update </button> </th>
        <th> <button id="delet" onclick="deletData(${i})" > delet </button></th>
      </tr> 
    `;
  }
  document.querySelector("#tbody").innerHTML = table;

  let btnDeletAll = document.querySelector("#btnDeletAll"); 
  if(dataProduct.length > 0){
    btnDeletAll.innerHTML = `<button onclick="deletAll()" > Delet All </button>`;
  }else{
    btnDeletAll.innerHTML = "";
  }

}
showData();



// Delet Product
function deletData(e) { "use strict";
  dataProduct.splice(e, 1);
  localStorage.Product = JSON.stringify(dataProduct);
  showData();
}


// Delet All Data 
function deletAll() { "use strict";
/* // first way to delet data
  dataProduct = [];
  localStorage.Product = JSON.stringify(dataProduct);
  showData();
*/

// second way to delet data 
  dataProduct.splice(0);
  localStorage.clear();
  showData();
}


// update 
function updateData(e) { "use strict";
  title.value = dataProduct[e].title;
  price.value = dataProduct[e].price;
  taxes.value = dataProduct[e].taxes;
  ads.value = dataProduct[e].ads;
  discount.value = dataProduct[e].discount;
  GetTotal();
  count.style.display = "none";
  category.value = dataProduct[e].category;
  submit.innerHTML = "Update";
  mood = "update";
  UpdElm = e;

  // window.scrollTo(0,0);  or
  scroll({
    top:0
  })


}



// video(11) Search
let searchMood = 'title';
function GetSearchMood(id) { 'use strict';
  let searchInp = document.getElementById("search");

  (id == "searchTitle")? searchMood = 'title' : searchMood = 'category';
  
  searchInp.placeholder = `Search By ${searchMood} `;

  searchInp.focus();
  searchInp.value = "";
  showData();

} 

// Search
function SearchData (value) { 'use strict';
  let table = '';
  for(let p=0; p<dataProduct.length; p++){

    if(searchMood == "title"){
      //  convert the title and the value to lowercase make a correct comper 
      if(dataProduct[p].title.toLowerCase().includes(value.toLowerCase()) ){
        table += `
            <tr>
              <th> ${p+1} </th>
              <th> ${dataProduct[p].title} </th>
              <th> ${dataProduct[p].price} </th>
              <th> ${dataProduct[p].taxes} </th>
              <th> ${dataProduct[p].ads} </th>
              <th> ${dataProduct[p].discount} </th>
              <th> ${dataProduct[p].total} </th>
              <th> ${dataProduct[p].category} </th>
              <th> <button id="update"onclick="updateData(${p})" > update </button> </th>
              <th> <button id="delet" onclick="deletData(${p})" > delet </button></th>
            </tr> 
          `;
      }  
    }
    
    else{
      //  convert the title and the value to lowercase make a correct comper 
      if(dataProduct[p].category.toLowerCase().includes(value.toLowerCase()) ){
        table += `
            <tr>
              <th> ${p+1} </th>
              <th> ${dataProduct[p].title} </th>
              <th> ${dataProduct[p].price} </th>
              <th> ${dataProduct[p].taxes} </th>
              <th> ${dataProduct[p].ads} </th>
              <th> ${dataProduct[p].discount} </th>
              <th> ${dataProduct[p].total} </th>
              <th> ${dataProduct[p].category} </th>
              <th> <button id="update"onclick="updateData(${p})" > update </button> </th>
              <th> <button id="delet" onclick="deletData(${p})" > delet </button></th>
            </tr> 
          `;
      }
    }

  }

  document.querySelector("#tbody").innerHTML = table;
}




// clean date validation



