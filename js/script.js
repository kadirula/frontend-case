

/*********************** Product Tab Toggle - begin ***********************************/
const productTabItems = document.querySelectorAll('.product-tab__item');
const productTabContents = document.querySelectorAll('.product-tab__content');

productTabItems.forEach(productItem => {
    productItem.addEventListener('click', () => {
        const dataTab = productItem.getAttribute('data-tab');
        if (dataTab != null) {
            removeElementClass(productTabItems, 'active');
            productItem.classList.add('active');

            const productTabContent = document.getElementById(dataTab);

            if (productTabContent != null) {
                removeElementClass(productTabContents, 'active');
                productTabContent.classList.add('active');
            }
            if (dataTab === 'models') {
                productInfoRendering('colors');
            }
            if (dataTab === 'colors') {
                productColorRendering();
                productInfoRendering('accessories');
            }
            if (dataTab === 'accessories') {
                productInfoRendering('summary');
            }
            if (dataTab === 'summary') {
                productSummaryRendering();
                productInfoRendering('buy now');
            }

        }

    })
})
/*********************** Product Tab Toggle - end ***********************************/


/*********************** Product Model Item Rendering - begin ***********************************/
productModelRender();
/*********************** Product Model Item Rendering - end ***********************************/

/*********************** Product Info Rendering - begin *********************/
productInfoRendering();
/*********************** Product Info Rendering - end *********************/

/*********************** Product Propery Toggle - begin ***********************************/
const productProperties = document.querySelectorAll('.product-property__item');
productProperties.forEach(productProperty => {
    productProperty.addEventListener('click', () => {
        productProperty.classList.toggle('active');
    })
})
/*********************** Product Propery Toggle - end ***********************************/


/* Functions */

function removeElementClass(element, className) {
    if (element.length > 0) {
        element.forEach(item => {
            item.classList.remove(className);
        })
    }
    else {
        element.classList.remove(className)
    }
}

/* Rendering Functions */
async function productModelRender() {

    const products = await getProducts();

    const selectedProduct = JSON.parse(localStorage.getItem('selected-product'));

    products.map((product, index) => {
        const productModel = `
        <div class="product-model__item ${index === 0 ? 'active' : ''}" data-productId="${product.id}" onclick="modelItemActive(this)">
            <span class="product-model__select"><img src="assets/select.png" alt=""></span>
            <h4 class="product-model__title">${product.name}</h4>
            <div class="product-model__image">
                <img src="assets/cars/${product.image}" class="img-fluid" alt="${product.name}">
            </div>
            <p class="product-model__desc"><span>${product.price} TL</span>' den başlayan fiyatlarla
            </p>
            <button class="product-model__btn">Select</button>
        </div>`;

        document.querySelector('.product-model').innerHTML += productModel;
    })

    // if (selectedProduct) {
    //     products.map((product, index) => {
    //         const productModel = `
    //         <div class="product-model__item ${selectedProduct.id === product.id ? 'active' : ''}" data-productId="${product.id}" onclick="modelItemActive(this)">
    //             <span class="product-model__select"><img src="assets/select.png" alt=""></span>
    //             <h4 class="product-model__title">${product.name}</h4>
    //             <div class="product-model__image">
    //                 <img src="assets/cars/${product.image}" class="img-fluid" alt="${product.name}">
    //             </div>
    //             <p class="product-model__desc"><span>${product.price} TL</span>' den başlayan fiyatlarla
    //             </p>
    //             <button class="product-model__btn">Select</button>
    //         </div>`;

    //         document.querySelector('.product-model').innerHTML += productModel;
    //     })
    // }
    // else {
    //     products.map((product, index) => {
    //         const productModel = `
    //         <div class="product-model__item ${index === 0 ? 'active' : ''}" data-productId="${product.id}" onclick="modelItemActive(this)">
    //             <span class="product-model__select"><img src="assets/select.png" alt=""></span>
    //             <h4 class="product-model__title">${product.name}</h4>
    //             <div class="product-model__image">
    //                 <img src="assets/cars/${product.image}" class="img-fluid" alt="${product.name}">
    //             </div>
    //             <p class="product-model__desc"><span>${product.price} TL</span>' den başlayan fiyatlarla
    //             </p>
    //             <button class="product-model__btn">Select</button>
    //         </div>`;

    //         document.querySelector('.product-model').innerHTML += productModel;
    //     })
    // }

}

async function productColorRendering() {

    let product;
    if(localStorage.getItem('selected-product') != null){
        product = JSON.parse(localStorage.getItem('selected-product'));
    }
    else{
        const products = await getProducts();
        product = products[0];
    }
    

    const productColorContent = `
        <div class="product-color__center">
            <h3 class="product-color__title">${product.name}</h3>
            <img src="assets/cars/${product.image}" class="img-fluid product-color__image" alt="${product.name}">
        </div>
        <div class="product-color__select">
            <div class="product-color__select-item active" style="background-color: #B40F14" onclick="productColorChanged(this)">
                <span class="product-color__select-icon"><img src="assets/select.png" alt=""></span>
            </div>
            <div class="product-color__select-item" style="background-color: #1C1C1C" onclick="productColorChanged(this)">
                <span class="product-color__select-icon"><img src="assets/select.png" alt=""></span>
            </div>
            <div class="product-color__select-item" style="background-color: #C8C8C8" onclick="productColorChanged(this)">
                <span class="product-color__select-icon"><img src="assets/select.png" alt=""></span>
            </div>
        </div>
    `;

    document.querySelector('#colors .product-color').innerHTML = productColorContent;
}

function productModelInfoRender(product, type = 'colors') {
    const productModelInfo = `
        <span class="product-info__label">New</span>
        <div class="product-info__left">
            <div class="product-info__image">
                <img src="assets/cars/${product.image}" class="img-fluid" alt="${product.name}">
            </div>
            <div class="product-info__text">
                <p>Total</p>
                <span class="price">${product.price} TL</span>
            </div>
        </div>
        <div class="product-info__right">
            <button class="product-info__action">
                ${type} 
                <img src="assets/${type === 'buy now' ? 'basket-icon.png' : 'arrow-right.png'}" alt="">
            </button>
        </div>`;

    return productModelInfo;
}

async function productInfoRendering(type = 'colors') {
    const products = await getProducts();
    const selectedProduct = JSON.parse(localStorage.getItem('selected-product'));

    let productInfoContent;
    // console.log(products);

    if (selectedProduct) {
        productInfoContent = productModelInfoRender(selectedProduct, type)
    }
    else {
        productInfoContent = productModelInfoRender(products[0], type);
    }
    document.querySelector('.product-info').innerHTML = productInfoContent;
}

async function productSummaryRendering() {
    let selectedProduct;
    if(localStorage.getItem('selected-product') != null){
        selectedProduct = JSON.parse(localStorage.getItem('selected-product'));
    }
    else{
        const products = await getProducts();
        selectedProduct = products[0];
    }
    const productSummaryContent = `
        <div class="product-summary__image">
            <span class="product-summary__title">${selectedProduct.name}</span>
            <img src="assets/cars/${selectedProduct.image}" class="img-fluid" alt="">
        </div>
        <div class="product-summary__info">
            <div class="product-summary__info-item">
                <h5 class="product-summary__text">MODEL</h5>
                <p class="product-summary__desc">${selectedProduct.model}</p>
            </div>
            <div class="product-summary__info-item">
                <h5 class="product-summary__text">COLOR</h5>
                <p class="product-summary__desc">Rose Red</p>
            </div>
            <div class="product-summary__info-item">
                <h5 class="product-summary__text">ACCESSORIES</h5>
                <p class="product-summary__desc">Boost Pack + Light Plus</p>
            </div>
        </div>
    `;

    document.querySelector('.product-summary').innerHTML = productSummaryContent;
}

/* Other Functions */
async function modelItemActive(modelItem) {
    const modelItems = document.querySelectorAll('.product-model__item');

    removeElementClass(modelItems, 'active');

    modelItem.classList.add('active');

    const productId = modelItem.getAttribute('data-productId');

    const findProduct = await getProductById(productId);

    setLocalstorageSelectedProduct(findProduct);

    productInfoRendering();

}

async function getProducts() {
    const products = await fetch('mocks/products.json')
        .then(res => res.json())
        .then(data => {
            return data;
        })

    return products;
}

async function getProductById(productId) {
    const products = await getProducts();
    return products.filter(product => product.id === productId)[0];
}

async function setProductsLocalStorage() {

    if (localStorage.getItem('seat-products') == null) {
        const products = await getProducts();
        localStorage.setItem('seat-products', JSON.stringify(products))
    }
}

function getLocalStorageProducts(key) {
    return JSON.parse(localStorage.getItem(key))
}

function setLocalstorageSelectedProduct(product) {
    localStorage.setItem('selected-product', JSON.stringify(product));
}

function productColorChanged(productColorItem) {
    const productColors = document.querySelectorAll('.product-color__select-item');
    removeElementClass(productColors, 'active');
    productColorItem.classList.add('active');
}