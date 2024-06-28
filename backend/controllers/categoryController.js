import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asynHandler.js";

const createCategory = asyncHandler(async (req, res) => { 
    try {
        const {name} = req.body;

        if (!name) {
            return res.json({error: "Name is required"});
        }

        const existingCategory = await Category.findOne({name});

        if (existingCategory) { 
            return res.json({error: "Category already exists"});
        }

        const category = await Category({name}).save();

        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
})

export {createCategory};