//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const json = require("body-parser/lib/types/json");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req , res){
res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req , res){
var firstname = req.body.fname;
var lastname = req.body.lname;
var email = req.body.email;
var data ={
    members:[
        {
            email_address : email ,
            status: "subscribed",
            merge_fields :{
                FNAME : firstname,
                LNAME : lastname

            }
        }
    ]
};
 var jsondata = JSON.stringify(data);

var options ={
    url : "https://us18.api.mailchimp.com/3.0/lists/83cc508e6e/ ",
    method : "POST" , 
    headers : {
        "Authorization": "ekram1 9d4e4cf98446cf6c1d5c881c1614fa56-us18"
    },
      body: jsondata

};
 request(options , function(error , response , body){
     if (error){
         res.sendFile(__dirname + "/failure.html");
        }
     else{
         if(response.statusCode === 200){
             res.sendFile(__dirname + "/success.html");
         }
         else{
           res.sendFile(__dirname + "/failure.html");

         }
     }
     
 });



});

app.post("/failure" , function(req , res ){
res.redirect("/");
});

//API key
//9d4e4cf98446cf6c1d5c881c1614fa56-us18

//unique id 
//83cc508e6e
app.listen(process.env.PORT || 3000 , function(){
    console.log("server is running on port 3000.");
});