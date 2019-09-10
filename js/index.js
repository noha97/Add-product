

var productNameInp = document.getElementById("productName");
var productPriceInp = document.getElementById("productPrice");
var productCompanyInp = document.getElementById("productCompany");
var productDescInp = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var alertContainer = document.getElementById("alertContainer");
var searchInp = document.getElementById("searchInp");
var productsContainer ;



if(localStorage.getItem("productsContainer") == null)
    {
        productsContainer = [];
    }
else
    {
        productsContainer =JSON.parse( localStorage.getItem("productsContainer"));
        displayData();

    }



searchInp.onkeyup = function()
{
    searchProduct(searchInp.value)
    
}


function searchProduct(term)
{
    
    var searchResult = "";
    for(var i = 0 ; i < productsContainer.length ; i++)
        {
            if(productsContainer[i].name.includes(term)== true)
                {
                    
                    searchResult +='<div class="col-md-3"> <div class="product"><h3>'+productsContainer[i].name+'</h3><p>'+productsContainer[i].desc+'</p><p class="text-danger">'+productsContainer[i].price+'</p> <p class="text-info">'+productsContainer[i].company+'</p><button class="btn btn-danger" onclick="deleteProduct('+i+')">delete</button></div></div>';
                }
        }
    
    document.getElementById("searchResult").innerHTML = searchResult;
}


addBtn.onclick = function()
{
    
    
   if(validateForm() == true)
    {
        
                addProduct();
                displayData();
                clearForm();
    
    }
   

}




function validateForm()
{
    var errors  = "";
    var nameRegx = /^[A-Z][a-zA-Z]{2,10}$/;
    var priceRegex  = /^[1-9][0-9]{2,5}$/
 
    if( nameRegx.test( productNameInp.value ) == false )
        {
            
            alertContainer.style.display = "block";
            errors +="<p>product name must start with upper case</p>"
            alertContainer.innerHTML = errors;          
        }
    if(priceRegex.test(productPriceInp.value) == false)
        {
                     
            alertContainer.style.display = "block";
            errors +="<p>product price must be between 10 and 10000</p>"
            alertContainer.innerHTML = errors;          
           
        }
    
    if(errors.length > 0)
        {
            return false;
        }
    else
        {
            alertContainer.style.display = "none";
            return true;
        }
  
}


function addProduct()
{
    var product = 
        {
            name:productNameInp.value,
            price:productPriceInp.value,
            company:productCompanyInp.value,
            desc:productDescInp.value
        }
    productsContainer.push(product);
    
localStorage.setItem("productsContainer",JSON.stringify(productsContainer));
    
}

function displayData()
{
    var cols="";
    for(var i = 0 ; i<productsContainer.length ; i++)
        {
        cols +='<div class="col-md-3"> <div class="product"><h3>'+productsContainer[i].name+'</h3><p>'+productsContainer[i].desc+'</p><p class="text-danger">'+productsContainer[i].price+'</p> <p class="text-info">'+productsContainer[i].company+'</p><button class="btn btn-danger" onclick="deleteProduct('+i+')">delete</button></div></div>'    
        }
    document.getElementById("rowData").innerHTML = cols;
}
function deleteProduct(id)
{
    
    productsContainer.splice(id,1);
localStorage.setItem("productsContainer",JSON.stringify(productsContainer));
    
    displayData();

}
function clearForm()
{
    
   var inputs= document.getElementsByClassName("form-control");
    
    for(var i= 0 ; i <inputs.length ; i++)
        {
            inputs[i].value = "";
        }
}











