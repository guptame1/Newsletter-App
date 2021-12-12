const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require("https");

const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

res.sendFile(__dirname + "/signup.html");

})

app.post("/", function (req,res) {

var firstName = req.body.FNAME;
var lastName = req.body.LNAME;
var email = req.body.email;

var data= {

members: [

{

email_address : email,
status:"subscribed",
merge_fields: {

    FNAME: firstName,
    LNAME: lastName
}
}
]
};

var jsonData= JSON.stringify(data);

const url="https://us1.api.mailchimp.com/3.0/lists/8565496e4e";

const options = {

    method: "POST",
    auth:"megha:76c2268c7d8c0bba1b7415cc1fe1b153-us1"
}


const request = https.request(url,options, function(response) {

    if (response.statusCode===200) {
        res.sendFile (__dirname + "/success.html")
    } else {
        res.sendFile (__dirname +"/failure.html")
    }

    response.on("data", function(data){
    console.log(JSON.parse(data));
 
 })

})


request.write(jsonData);
request.end();

});


app.post("/failure",function (req,res){

    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function() {
    console.log('Server listening on port 3000');
    
    });
    
    



//APIKEY
//76c2268c7d8c0bba1b7415cc1fe1b153-us1

//list ID
//Typically, this is what they want: 8565496e4e.

