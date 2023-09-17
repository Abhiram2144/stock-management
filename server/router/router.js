const express = require("express");
const router = express.Router();
const stockSchema = require("../schemas/stockSchema");

router.get("/", async(req,res) =>
{
    let products;
    try{
         products = await stockSchema.find();
    }
    catch(err){
        console.log(err);
    }
    if(!products)
    {
        return res.status(404).send({message: "No products found!"});
    }
    else return res.status(200).send({message: "Successfully Fetched!!",stocks : products});
});

router.get("/:id",async(req,res)=>{
    const id = req.params.id;
    let product;
    try{
        product = await stockSchema.findById(id);
    }
    catch(err)
    {
        console.log(err);
    }
    if(!product)
    {
        return res.status(404).send({message: "Product not found!"});
    }
    else return res.status(200).send({message: "Successfully Fetched!!",stock : product});
})


router.post("/add",async(req,res)=> 
{

    const {name, price, date, description} = req.body;

    const newObj = new stockSchema({
        name, price, date, description
    });

    try{
        await newObj.save();
    }
    catch(err)
    {
        res.status(500).json({message:"Something went wrong!"});
    }
    res.status(201).json({message:"Stock added successfully!"});
});


router.put("/:id",async(req ,res) => {

    const id = req.params.id;
    const {name, price, date, description} = req.body;
    let newObj;
    try{
        newObj=await stockSchema.findByIdAndUpdate(id,{
            name, price, date, description
        });
    }
    catch(err)
    {
        res.status(500).json({message:"Something went wrong!"});
    }
    if(newObj)
    {
        res.status(200).json({message:"Stock updated successfully!"});
    }
    else
    {
        res.status(404).json({message:"Stock not found!"});
    }


});


router.delete("/:id", async(req,res) => 
{
    const id = req.params.id;
    const newObj = stockSchema.findById(id);
    if(!newObj)
    {
        return res.status(404).json({message:"Stock not found!"});
        return;
    }
    try{
        await stockSchema.findByIdAndDelete(id);
    }
    catch(err)
    {
        res.status(500).json({message:"Something went wrong!"});
    }
    res.status(200).json({message:"Stock deleted successfully!"});
});


module.exports = router;