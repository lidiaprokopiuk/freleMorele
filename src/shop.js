const shop = document.querySelector('#shop .row');

let basket = JSON.parse(localStorage.getItem("data")) || [];

const generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, img, imgHover } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div class="col-sm-10 col-md-6 col-lg-4">
            <div class="item card bg-transparent border-0 mb-4" id='product-'${id}>
                <div class="position-relative img-invert">
                    <img src=${img} class="img-fluid" alt="">
                    <img src=${imgHover} class="img-fluid invisible position-absolute top-0 start-0" alt="">
                </div>
                <div class="card-body bg-white text-center">
                    <h5 class="card-tilte item-tilte headling mb-2">${name}</h5>
                    <p class="price">$ ${price}</p>    
                    <div class="bg-dark text-white py-2 px-4 d-flex justify-content-between mx-auto">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity px-4">
                            ${search.item === undefined ? "Add to Cart" : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>                
            </div>
        </div>`
    }).join(""))
}

generateShop();

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
    
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket))
}
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return;
    // else if(search.item === 0) return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }    
    update(selectedItem.id);   
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((x)=> x.id === id);       
    document.getElementById(id).innerHTML = search.item;  
    calculation();  
}
                            
let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

calculation();




{/* <div class="d-flex border px-2 py-1">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity px-4">
                            ${search.item === undefined ? 0 : search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div> */}