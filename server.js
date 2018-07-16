var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/swag-shop");

var Product = require("./model/product");
var WishList = require("./model/wishlist"); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get("/product", function( request, response){
    Product.find({},function(err,products){
       if(err){
           response.status(500).send({error:"Could not fetch product"});
       } else{
           response.send(products);
       }
    });
   
});

app.post("/product", function( request, response ){
    var product = new Product();
    product.title = request.body.title;
    product.price = request.body.price;
    product.save(function(err, savedProduct){
       if(err){
           response.status(500).send({error:"Could not save product"});
       } else{
           response.send(savedProduct);
       }
    });
});

app.listen(3000,function(){
   console.log("Swag shop API running on port 3000,,,"); 
});
 