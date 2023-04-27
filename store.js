if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}
function ready(){
    var removecartitembuttons=document.getElementsByClassName('btn-danger')
    for(var i=0;i<removecartitembuttons.length;i++){
        var button=removecartitembuttons[i]
        button.addEventListener('click',removecartitem)
    }
    var quantityinputs=document.getElementsByClassName('cart-input')
    for(var i=0;i<quantityinputs.length;i++){
        var input=quantityinputs[i]
        input.addEventListener('change',quantitychanged)
    }
    var addtocartbutton=document.getElementsByClassName('shop-item-button')
    for(var i=0;i<addtocartbutton.length;i++){
        var button=addtocartbutton[i]
        button.addEventListener('click',addtocartclicked)
    }
}
function addtocartclicked(event){
    console.log("clicked")
    var button=event.target
    var shopitem=button.parentElement
    var title=shopitem.getElementsByClassName('item-title')[0].innerText
    var price=shopitem.getElementsByClassName('item-price')[0].innerText
    additemtocart(title,price)
    updatecarttotal()
}
function additemtocart(title,price){
    var cartrow=document.createElement('div')
    var cartitems=document.getElementsByClassName('rowi')[0]
    var cartitemnames=cartitems.getElementsByClassName('title')
    for(var i=0;i<cartitemnames.length;i++){
        if(cartitemnames[i].innerText==title){
            alert('this item is already in the cart')
            return
        }
    }
    cartrow.classList.add('cart-items')
    var cartrowcontents=`
    <div class="data title">${title}</div>
    <div class="data cart-price">${price}</div>
    <div class="data cart-input"><input class="cart-item-input" type="number" value="1">
        <button class="btn-danger">Remove</button></div>
        `
    cartrow.innerHTML=cartrowcontents
    cartitems.append(cartrow)
    cartrow.getElementsByClassName('btn-danger')[0].addEventListener('click',removecartitem)
    cartrow.getElementsByClassName('cart-input')[0].addEventListener('change',quantitychanged)

}



function quantitychanged(event){
    var input=event.target
    if(isNaN(input.value)||input.value<=0){
        input.value=1
    }
    updatecarttotal()
}
function removecartitem(event){
    var buttonclicked=event.target
    buttonclicked.parentElement.parentElement.remove()
    updatecarttotal()
}
function updatecarttotal(){
    // var cartitemcontainer=document.getElementsByClassName('cartitems')[0]
    var cartrows=document.getElementsByClassName('cart-items')
    
    var total=0
    for(var i=0;i<cartrows.length;i++){
        var cartrow=cartrows[i]
        var priceelement=cartrow.getElementsByClassName('cart-price')[0]
        console.log(priceelement)
        var quantityelement=cartrow.getElementsByClassName('cart-item-input')[0]
        console.log(quantityelement)
        var price=parseFloat(priceelement.innerText.replace('Rs.',''))
        var quantity=quantityelement.value
        //console.log(quantity)
        total=total+(price*quantity)

    }
    document.getElementsByClassName('cart-total-price')[0].innerText='Total: Rs.' + total
}