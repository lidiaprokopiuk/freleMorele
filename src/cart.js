let label = document.getElementById('label');
let totalPrice = document.getElementById('totalPrice');

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
            let sumPrice = Number(item * price).toFixed(2);
            return `
            <div class="row border-bottom border-secondary py-3 d-flex">
                <div class="col-3">
                    <img src=${img} alt="" class="img-fluid">
                </div>
                <div class="col-9">
                    <div class="row align-items-center">
                        <div class="col-10 col-sm-5 col-xxl-6 order-1">
                            <h6 class="text-uppercase mb-0">${name}</h6>
                        </div>
                        <div class="col-5 col-sm-3 order-3">
                            <div class="border px-2 py-1 d-flex justify-content-between">
                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <p id=${id} class="quantity px-1 mb-0 ">${item}</p>
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>                           
                            </div>   
                        </div>
                        <div class="col-4 col-sm-3 col-xxl-2 text-center order-3 ">                                
                            <p class="mb-0 h5">$ ${sumPrice}</p>
                        </div>
                        <div class="col-2 col-sm-1 text-end order-2 order-sm-4">
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        
                        <div class="col-3 col-sm-2 order-2">
                            <p class="price mt-3">$ ${price}</p>
                        </div>
                    </div>
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
        let amountFixed = amount.toFixed(2)
        label.innerHTML = `
            <span>$ ${amountFixed}</span>
        `
        
        totalPrice.innerHTML = `
            <span>$ ${amountFixed}</span>
        `
    } 
    else return;
}

totalAmount();