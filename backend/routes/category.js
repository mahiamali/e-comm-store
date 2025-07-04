const express = require("express")
const router = express.Router()
const { addCategory, updateCategory, deleteCategory, getCategories, getCategoryByID } = require("../handlers/category-handler");

router.post("", async(req, res)=>{
    let model = req.body;
    let result = await addCategory(model);
    res.send(result);
})

router.get("", async(req, res)=>{
    let result = await getCategories();
    res.send(result);
})

router.get("/:id", async(req, res)=>{
    let id = req.params['id'];
    let result = await getCategoryByID(id);
    res.send(result);
})

router.put("/:id", async(req, res)=>{
    let model = req.body;
    let id = req.params['id'];
    await updateCategory(id, model);
    res.send({message:"Updated!"}); 
})

router.delete("/:id", async(req, res)=>{
    let id = req.params['id'];
    await deleteCategory(id);
    res.send({message:"Deleted!"}); 
})

module.exports = router