const categorymodel = require("../models/categorymodel");

// Create category
const createcatcontroller = async (req, res) => {
    try {
        const { title, imageurl } = req.body;

        // Validation
        if (!title) {
            return res.status(400).send({
                success: false,
                message: "Please provide category title",
            });
        }

        // Create and save new category
        const newCategory = new categorymodel({ title, imageurl });
        await newCategory.save();

        res.status(201).send({
            success: true,
            message: "Category created successfully",
            category: newCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error creating category",
            error,
        });
    }
};

// Get all categories
const getallcategorycontroller = async (req, res) => {
    try {
        const categories = await categorymodel.find({});
        if (!categories || categories.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No categories found",
            });
        }

        res.status(200).send({
            success: true,
            totalCategories: categories.length,
            categories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching categories",
            error,
        });
    }
};

// Update category
const updatecatcontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageurl } = req.body;

        // Find and update category
        const updatedCategory = await categorymodel.findByIdAndUpdate(
            id,
            { title, imageurl },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).send({
                success: false,
                message: "No category found with this ID",
            });
        }

        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error updating category",
            error,
        });
    }
};

// Delete category
const deletecategorycontroller = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if category exists
        const category = await categorymodel.findById(id);
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "No category found with this ID",
            });
        }

        // Delete category
        await categorymodel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error deleting category",
            error,
        });
    }
};

module.exports = {
    createcatcontroller,
    getallcategorycontroller,
    updatecatcontroller,
    deletecategorycontroller,
};
