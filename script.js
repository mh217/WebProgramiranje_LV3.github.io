// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const showButton = document.getElementById('show-button');


 
let items = [
    {
        id: 1,
        name: 'Apple',
        price: 0.99,
        img: 'https://assets.clevelandclinic.org/transform/cd71f4bd-81d4-45d8-a450-74df78e4477a/Apples-184940975-770x533-1_jpg'
    },
    {
        id: 2,
        name: 'Banana',
        price: 10,
        img: 'https://www.biobio.hr/upload/catalog/product/17352/7447.jpg'
    },
    {
        id:3, 
        name:'Melon', 
        price:3,
        img:'https://static.libertyprim.com/files/familles/melon-large.jpg?1574629891'
    },
    {
        id:4, 
        name:'Watermelon', 
        price:6,
        img:'https://blog-images-1.pharmeasy.in/2020/08/28152823/shutterstock_583745164-1.jpg'
    },
    {
        id:5, 
        name:'Plum', 
        price:2.5,
        img:'https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/plum-plumb-difference-5815-4560b01b679af15fd13e5ef5a8886abc@1x.jpg'
    },
    {
        id:6, 
        name:'Pear', 
        price:1,
        img:'https://static.libertyprim.com/files/familles/poire-large.jpg?1569271830'
    },
    {
        id:7, 
        name:'Cherry', 
        price:7,
        img:'https://www.100daysofrealfood.com/wp-content/uploads/2023/07/shutterstock_1828768448.jpg'
    },
    {
        id:8, 
        name:'Blackberry', 
        price:4.7,
        img:'https://images.immediate.co.uk/production/volatile/sites/10/2018/02/69fa32f9-f2ca-4005-bd3a-40e98aca45f7-c1ec280.jpg?quality=90&resize=940,627'
    }
];

let cart = [];

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    search(searchTerm);
    
    
    console.log(`Searching for: ${searchTerm}`);
   
});

showButton.addEventListener('click',function() {
    itemsGrid.innerHTML =""
    fillItemsGrid();
   
});


function fillItemsGrid() {
    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);

        itemElement.querySelector('.add-to-cart-btn').addEventListener("click", function(event) {
            event.preventDefault(); 
            addToCart(event.target.dataset.id)
            changeBadge()
            
        })
    }
}


cartButton.addEventListener("click", function() {
    displayCart(); 
    calculateCost()
}); 

buyButton.addEventListener("click", buy);


// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle('show-modal');
}

function addToCart(id) {
    let itemAdded = false
    changeBadge()
    for(const item of items) {
        if(item.id == id) {
            console.log(`There is: ${cart}`);
            itemAdded = true; 
            break; 
        }
    }
    if(!itemAdded) {
        console.log(`There is no item with name`);
    }

    for(let i =0; i<cart.length; i++) {
        if(cart[i].id == id) {
            cart[i].quantity++; 
            return; 
        }
    } 
    cart.push({id: id, quantity: 1}); 
}

function calculateCost() {
    let cost = 0;  
    for(var i = 0; i < cart.length; i++) {
        cost += items[cart[i].id -1].price * cart[i].quantity
    }
    cartTotal.textContent = `$${cost.toFixed(2)}`;
}

function changeBadge() {
    let quantity = 0;
    for (let i = 0; i < cart.length; i++) {
        quantity += cart[i].quantity;
    } 
    cartBadge.textContent = quantity; 
}


function displayCart() {
    cartItemsList.innerHTML =""
    for(let i =0; i< cart.length; i++) {
        let itemElement = document.createElement('li');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <h2>${items[cart[i].id - 1].name}</h2>
            <p>${cart[i].quantity}</p>
            <button class="remove-from-cart-btn" data-id="${cart[i].id}">Remove</button>
        `;
        cartItemsList.appendChild(itemElement);

        //cartItemsList.querySelector('.remove-to-cart-btn').addEventListener("click", function(event) {
          //  removeFromCart(event.target.dataset.id)
        //})
    }
}

cartItemsList.addEventListener("click", (event) => {
    console.log("btn pressed");
    if (event.target.classList.contains("remove-from-cart-btn")) {
      const itemId = parseInt(event.target.dataset.id);
      removeFromCart(itemId);
    }
});


function removeFromCart(itemId) {
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id == itemId){
            cart[i].quantity--;
            if(cart[i].quantity <= 0){
                cart.splice(i, 1);
            }
        }
    }
    displayCart();
    changeBadge();
    calculateCost();
}



function buy() {
    if(cart.length === 0) {
        window.alert("Your cart is empty.")
    }
    else {
        window.alert("Thank you for your purchase.")
        cart = []; 
        displayCart();
        cartBadge.textContent = `${0}`;
        cartTotal.textContent = `$${0.00}`;
    }

}
// Call fillItemsGrid function when page loads
fillItemsGrid();

function search(name) {
    let itemFound = false 
    for(const item of items) {
        if(item.name.toLowerCase() == name) {
            itemFound = true; 
            itemsGrid.innerHTML =""
            let itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}" width ="300px">
                <h2>${item.name}</h2>
                <p>$${item.price}</p>
                <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
            `;
            itemsGrid.appendChild(itemElement);
            searchInput.value = '';

            itemElement.querySelector('.add-to-cart-btn').addEventListener("click", function(event) {
                event.preventDefault(); 
                addToCart(event.target.dataset.id)
                changeBadge()  
            })
            break; 
        } 
    }
    
    if(!itemFound) {
        window.alert("Item was not found")
        searchInput.value = '';
        itemsGrid.innerHTML =""
        fillItemsGrid();
    }
}


// Example of DOM methods for adding event handling
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);