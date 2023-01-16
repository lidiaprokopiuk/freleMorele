let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

calculation();

let generateCartItem = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let { img, name, price } = search;
            return `
            <div class="row border-bottom py-3">
                <div class="col-3">
                    <img src=${img} alt="" class="img-fluid">
                </div>
                <div class="col-9">
                    <div class="d-flex justify-content-between mb-4 align-items-center">
                        <h5 class="text-uppercase mb-0">${name}</h5>
                        <div class="border px-2 py-1">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <span id=${id} class="quantity px-3">${item}</span>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>                           
                        </div>                                   
                        <p class="mb-0">$ ${item * price}</p>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <p class="price">$ ${price}</p>
                </div>
            </div>
            `
        }).join(''));
    } 
    else {
        label.innerHTML = ``
        shoppingCart.innerHTML = `
            <h2 class="mb-3">Cart is empty</h2>
            <a href="shop.html" class="btn btn-link text-dark">Continue Shopping</a>
        `
    }
}

generateCartItem();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) {
        basket.push( {
            id: selectedItem.id,
            item: 1,
        })
    } else {
        search.item += 1;
    }
    
    generateCartItem();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket))
}
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }    
    update(selectedItem.id);   
    basket = basket.filter((x) => x.item !== 0);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((x)=> x.id === id);       
    document.getElementById(id).innerHTML = search.item;  
    calculation();  
    totalAmount();
}

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItem();
    totalAmount();
    calculation();
    localStorage.setItem('data', JSON.stringify(basket));
}

let totalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let {item ,id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price

        }).reduce((x,y) => x + y, 0);
        label.innerHTML = `
            <div class="d-flex justify-content-between mb-3">
                <span>Total</span>
                <span>${amount}</span>
            </div>
            <button class="btn btn-dark checkout w-75">Checkout</button>
        `
    } 
    else return;
}

totalAmount();