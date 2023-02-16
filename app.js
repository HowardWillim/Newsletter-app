const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");
const app =express();
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;

    var data ={
        members:[{
      
        
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
          "FNAME": fname,
          "LNAME": lname
      
           }
        }
        ]
        
    

    }
      

    const jsonData =JSON.stringify(data);


    const url="https://us21.api.mailchimp.com/3.0/lists/43d783c093" ;
    const options=
    {
        method :"POST",
        auth : "abc:35a22724869d3f72f4ce2208a42d270e-us21"

    }
    const request =https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();

})
app.listen(3000,function(){
    console.log("Server is running on port 3000");
})

//35a22724869d3f72f4ce2208a42d270e-us21

// 43d783c093