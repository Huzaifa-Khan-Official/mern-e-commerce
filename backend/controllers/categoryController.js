import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asynHandler.js";

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ error: "Name is required" });
        }

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.json({ error: "Category already exists" });
        }

        const category = await Category({ name }).save();

        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        if (!name || !categoryId) {
            return res.json({ error: "Name and categoryId are required" });
        }

        const category = await Category.findOne({ _id: categoryId })

        if (!category) {
            return res.json({ error: "Category not found" });
        }

        category.name = name;
        const updatedCategory = await category.save();

        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    try {

        if (!req.params.categoryId) {
            return res.json({ error: "categoryId is required" });
        }

        const removed = await Category.findByIdAndDelete(req.params.categoryId);

        res.json({ message: "Category deleted Successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

const listCategory = asyncHandler(async (req, res) => {
    try {
        const all = await Category.find({});

        res.json(all);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

const readCategory = asyncHandler(async (req, res) => {
    try {
        if (!req.params.id) {
            return res.json({ error: "categoryId is required" });
        }
        const category = await Category.findOne({_id: req.params.id});

        res.json(category);
    } catch (error) {
        console.error(error);
        return res.status(400).json({error: error.message});
    }
})

export { createCategory, updateCategory, deleteCategory, listCategory, readCategory };