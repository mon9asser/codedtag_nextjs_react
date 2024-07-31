const mongoose = require('mongoose');
const express = require("express"); 
const  {Categories} = require("./../models/category-model")
const {middlewareTokens} = require("./secure/middlewares")

var categoryRouter = express.Router(); 
var path = require("path");
var fs = require("fs");


categoryRouter.post("/category/blk-create-update", middlewareTokens, async (req, res) => {
    
    if (!req.body.data_array) {
        return res.send({
          data: [],
          is_error: true,
          expired: false,
          redirect_to: "/login",
          message: "Fields are required!"
        });
      }
    
      const categories = req.body.data_array;
    
      const operations = categories.map(category => {
        const dataObject = { ...category };
        if (dataObject._id) {
          delete dataObject._id;
        }
    
        const filter = category._id ? { _id: category._id } : { category_name: category.category_name };
    
        return {
          updateOne: {
            filter,
            update: { $set: dataObject },
            upsert: true
          }
        };
      });
    
      try {
        const result = await Categories.bulkWrite(operations);
        res.send({
          data: result,
          is_error: false,
          redirect_to: "",
          message: "Categories saved successfully!"
        });
      } catch (error) {
        res.send({
          data: error,
          is_error: true,
          expired: false,
          redirect_to: "/login",
          message: "Error in bulk operation!"
        });
    }
});

 
categoryRouter.post("/category/blk-delete", middlewareTokens, async (req, res) => {
    if (!req.body.data_array) {
      return res.send({
        data: [],
        is_error: true,
        expired: false,
        redirect_to: "/login",
        message: "Fields are required!"
      });
    }
  
    const categories = req.body.data_array;

     // Validate the _id fields
    if (!Array.isArray(categories) || !categories.every(category => category._id)) {
        return res.send({
            data: [],
            is_error: true,
            expired: false,
            redirect_to: "/login",
            message: "Invalid category data!"
        });
    }

    const operations = categories.map(category => ({
      deleteOne: {
        filter: { _id: category._id }
      }
    }));
  
    try {
      const result = await Categories.bulkWrite(operations);
      res.send({
        data: result,
        is_error: false,
        redirect_to: "",
        message: "Categories deleted successfully!"
      });
    } catch (error) {
      res.send({
        data: error,
        is_error: true,
        expired: false,
        redirect_to: "/login",
        message: "Error in bulk delete operation!"
      });
    }
});


categoryRouter.get("/categories", middlewareTokens, async (req, res) => {
    try {
      const categories = await Categories.find({});
      res.send({
        data: categories,
        is_error: false,
        expired: false,
        redirect_to: "",
        message: "Categories retrieved successfully!"
      });
    } catch (error) {
      res.send({
        data: error,
        is_error: true,
        expired: false,
        redirect_to: "/login",
        message: "Error retrieving categories!"
      });
    }
});
  

module.exports = { categoryRouter }