
var updateBtns = document.getElementsByClassName('update-cart')

console.log(cart,'cart')

function getCookie(name){
    var cookieValue = null;
    if(document.cookie && document.cookie !==''){
      var cookies = document.cookie.split(';');
      for (var i = 0; i< cookies.length; i++){
        var cookie = cookies[i].trim();

        if(cookie.substring(0, name.length+1)===(name+'='))
        {
          cookieValue = decodeURIComponent(cookie.substring(name.length +1));
          break;
        }
      }
    }
    return cookieValue
  }

  var csrftoken = getCookie('csrftoken')

for(var i=0; i< updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        if (user == "false"){
            addCookieItem(productId, action)
        }
        else{
            updateUserOrder(productId, action)
        }
    })
}
function addCookieItem(productId, action){
    if(action =='add'){
        if(cart[productId] == undefined){
            cart[productId] = {'quantity':1}
        }
        else {
            cart[productId]['quantity'] +=1
        }
    }
    if (action =='remove'){
        cart[productId]['quantity'] -=1
        if (cart[productId]['quantity'] <= 0){
            console.log('item should be deleted')
            delete cart[productId];
        }
    }

    document.cookie = 'cart=' + JSON.stringify(cart)+ ";domain=;path=/"
    location.reload()
}

function updateUserOrder(productId, action){
    var url = '/update_item/'

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            'productId': productId,
            'action': action
        })
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log('data', data);
        location.reload()
    });
    
}