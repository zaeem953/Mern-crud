const express = require('express')
const cors = require("cors");
require("./db/config")
const User = require("./db/User")
const products = require("./db/Product");
const Product = require('./db/Product');
const Jwt = require("jsonwebtoken");
const jwtKey = "e-com";

const app = express()
const port = 3000

//-----------------------MIDDLEWARES-----------------------
app.use(express.json());
app.use(cors());

//--------------------------------------------AUTH LOGIN AND REGISTER  START---------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save()
    result = result.toObject();
    delete result.password;
    //----------------------------------------------JWT TOKEN FOR REGISTER------------------------------------------------------------------------
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong" })
        }
        resp.send({ result, auth: token });
    })
})

app.post("/login", async (req, resp) => {
    //---------------------------------- .select("-password") --------To hide some field in the output or in console
    console.log(req.body);
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
    //----------------------------------------------JWT TOKEN FOR LOGIN------------------------------------------------------------------------
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "24h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong" })
                }
                resp.send({ user, auth: token });
            })
        }
        else {
            resp.send({ result: "Not Found" })
        }
    }
    else {
        resp.send({ result: "Not Found" })
    }
})

//--------------------------------------------AUTH LOGIN AND REGISTER  END---------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------PRODUCT ROUTES_------------------------------------------------------------


//---------------------------------------------------ADD PRODUCT------------------------------------------------
app.post("/add-product",verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

//---------------------------------------------------GET ALL PRODUCT LIST---------------------------------------

app.get("/products",verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No products found" })
    }
})

//-----------------------------------------------DELETE PRODUCT-----------------------------------------------

app.delete("/products/:id",verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

//---------------------------------------------UPDATE PRODUCT------------------------------------------------


//-------------------------------------------GET BY ID-------------------------------------------------
app.get("/products/:id",verifyToken, async (req, res) => {
    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No products found" })
    }
})

//-------------------------------------Update-------------------------------------------------------
app.put("/products/:id",verifyToken, async (req, res) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result);
})

//-----------------------------------SEARCH------------------------------------------------------------


app.get("/search/:key",verifyToken, async (req, res) => {
    const result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    res.send(result);
})

//----------------------------------------VERIFY JWT TOKEN FOR ALL APIS------------------------------------------------
function verifyToken(req, res, next){
    let token=req.headers["authorization"];
    if(token){
        token = token.split(" ")[1];
        
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                res.status(401).send({result: "Please provide valid token"});
            }
            else{
                next();
            }
        })
    }else{
        res.status(403).send({result: "Send header"})
    }
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))