$(() => {
	var products = localStorage.getItem("product-list")
	  ? JSON.parse(localStorage.getItem("product-list"))
	  : [];
	  var carts =sessionStorage.getItem("cart")
	  ? JSON.parse(sessionStorage.getItem("cart"))
	  : [];
	// console.log(products)
	products.forEach((p) => {
	  $(".products").append(`
	   
	   <div class="product">
			<img src="image/${p.picture}" />
			<div class="name my-2">${p.name}</div>
			<div class="desc">${p.description}</div>
			<div class="price" style="text-align: left; font-weight: 900;">Price: ${p.price}</div>
			<div style="text-align: left; ">
			<button data-pk='${p.id}' data-name='${p.name}' data-price='${p.price}' type='button' class="cart"  
            style="text-align: center; padding: 7px; background-color: darkorange; color: white; 
            border-radius: 0.25rem; border: solid 1px darkorange; width: 120px; cursor:pointer;">Add to cart</button>
			</div>
		</div>
	  
		`);
		
	});
	$('.cart').on('click', function(){
		  var pk=$(this).data('pk');
		  var pr=$(this).data('price');
		  var n=$(this).data('name');
		  var x= carts.filter(p=> p.id ==pk);
		  if(x && x.length> 0){
			x[0].qty =x[0].qty+1;
		  }
		  else{
			carts.push({id:pk,name:n, price:pr, qty: 1});
		  }
		  sessionStorage.setItem('cart', JSON.stringify(carts));
		  console.log(carts);
		});
  });
