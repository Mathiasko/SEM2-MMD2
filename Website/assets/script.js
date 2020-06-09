let apiUrl = 'http://srkr.dreamhosters.com/wp-json/wp/v2/posts?'
let apiKey = '9M0XFU2Lqoz6PbrOvzaKnYwtnEbwm9Jj'
let blogCatID = 8
let productCatID = 7
let categoriesTagID = 6

let productsArr = []
let blogsArr = []
let categoriesArr = []

function getProducts() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                let products = JSON.parse(this.responseText);
                products.forEach(product => {
                    let obj = {
                        id : product.id,
                        name : product.acf.name,
                        about_manufacturer : product.acf.about_manufacturer,
                        description : product.acf.description,
                        did_you_know : product.acf.did_you_know,
                        how_to_use : product.acf.how_to_use,
                        ingredientsmaterial : product.acf.ingredientsmaterial,
                        manufacturer : product.acf.manufacturer,
                        packaging : product.acf.packaging,
                        price : product.acf.price,
                        pcg : product.acf.pcg,
                        tags : product.acf.tags,
                        image : product.acf.image
                    }
                    productsArr.push(obj)
                });
                console.log(productsArr)
            } catch (error) {
                errorMessage(`Error parsing JSON: ${error}`);
            }
        }
        if (this.readyState == 4 && this.status > 400) {
            errorMessage('An error has occured while getting the data. Please try again later!');
        }
        renderProducts()
    }

    xhttp.open('GET', `${apiUrl}categories=${productCatID}&per_page=100`, true);
    xhttp.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhttp.send();

}

function getBlogs() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                let blogs = JSON.parse(this.responseText);
                blogs.forEach(blog => {
                    let obj = {
                        id : blog.id,
                        title : blog.acf.title,
                        content : blog.acf.content,
                        tags : blog.acf.tags,
                        image : blog.acf.image,
                        content_preview : blog.acf.content_preview
                    }
                    blogsArr.push(obj)
                });
                console.log(blogsArr)
            } catch (error) {
                errorMessage(`Error parsing JSON: ${error}`);
            }
        }
        if (this.readyState == 4 && this.status > 400) {
            errorMessage('An error has occured while getting the data. Please try again later!');
        }
    renderBlogPreview()

    }

    xhttp.open('GET', `${apiUrl}categories=${blogCatID}&per_page=100`, true);
    xhttp.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhttp.send();
}

function getCategories() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                let categories = JSON.parse(this.responseText);
                categories.forEach(category => {
                    let obj = {
                        category : category.acf.category
                    }
                    categoriesArr.push(obj)
                });
                console.log(categoriesArr)
            } catch (error) {
                errorMessage(`Error parsing JSON: ${error}`);
            }
        }
        if (this.readyState == 4 && this.status > 400) {
            errorMessage('An error has occured while getting the data. Please try again later!');
        }
    }

    xhttp.open('GET', `${apiUrl}tags=${categoriesTagID}&per_page=100`, true);
    xhttp.setRequestHeader('Authorization', `Bearer ${apiKey}`);
    xhttp.send();
}

function renderBlogPreview(){
    const blogsListDiv = document.getElementById('blogsList')
    
    for (let i= 0; i < blogsArr.length; i++) {
        const blogPreviewDiv = document.createElement('div')
        blogPreviewDiv.id= blogsArr[i].id
        blogsListDiv.appendChild(blogPreviewDiv)

        const blogPreviewImg = document.createElement('img')
        blogPreviewImg.classList.add('img', 'blogPreviewImg')
        blogPreviewImg.src= blogsArr[i].image
        blogPreviewDiv.appendChild(blogPreviewImg)

        const blogPreviewTitle = document.createElement('h2')
        blogPreviewTitle.classList.add('padding0')
        blogPreviewTitle.innerHTML = blogsArr[i].title
        blogPreviewDiv.appendChild(blogPreviewTitle)

        const blogPreviewText = document.createElement('p')
        blogPreviewText.classList.add('padding0')
        blogPreviewText.innerHTML = blogsArr[i].content_preview
        blogPreviewDiv.appendChild(blogPreviewText)

        const blogPreviewContinueReading = document.createElement('p')
        blogPreviewContinueReading.innerHTML = 'continue reading'
        blogPreviewDiv.appendChild(blogPreviewContinueReading)

    }
}

function renderProducts(){
    const productsDiv = document.getElementById('productsDiv')

    for (let i = 0; i < productsArr.length; i++) {
        
        const productDiv = document.createElement('div')
        productDiv.id = productsArr[i].id
        productDiv.classList.add('saver-container')
        productsDiv.appendChild(productDiv)
    
        const productManufacturerDiv = document.createElement('p')
        productManufacturerDiv.classList.add('center', 'padding0', 'dleft')
        productManufacturerDiv.innerHTML='Manufacturer: ' + productsArr[i].manufacturer
        productDiv.appendChild(productManufacturerDiv)
    
        const productImgDiv = document.createElement('img')
        productImgDiv.classList.add('product-square')
        productImgDiv.src = productsArr[i].image
        productDiv.appendChild(productImgDiv)
    
        const productInlineDiv = document.createElement('div')
        productInlineDiv.classList.add('inline')
        productDiv.appendChild(productInlineDiv)
    
        const productNameDiv = document.createElement('p')
        productNameDiv.innerHTML= productsArr[i].name
        productNameDiv.classList.add('padding0')
        productInlineDiv.appendChild(productNameDiv)
    
        const productPriceDiv = document.createElement('p')
        productPriceDiv.innerHTML= productsArr[i].price
        productPriceDiv.classList.add('padding0')
        productInlineDiv.appendChild(productPriceDiv)
        
    }
}