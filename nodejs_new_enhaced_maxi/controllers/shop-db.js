const Product = require('../models/product-db');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};

exports.getProduct = (req,res,next) => {
  //uso el mismo nombre del parametro que definí en el router!!
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      product:product,
      path: '/products'
    });
  });
}

exports.getIndex = (req, res, next) => {
  
  //recordar que la promesa del pool trae un arreglo con dos arreglos dentro
  //el primer arreglo contiene los registros obtenidos
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartproducts = [];
      for(let product of products){
        const cartProductData = cart.products.find(p=>p.id===product.id);
        if(cartProductData){
          cartproducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartproducts
      });
    });
  });

  
};

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId,product.price);
    //console.log('product.price', product.price);
  });
  
  
  res.redirect('/cart');
};

exports.postDeleteCartProduct = (req,res, next) => {
   const prodId = req.body.productId;
   Product.findById(prodId, product => {
      Cart.deleteProduct(prodId, product.price);
   });
   res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
