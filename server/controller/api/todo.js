
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo=require("../../model/Todo");
const validateTodoInput=require("../../validation/TodoValidator");

router.post("/create", (req, res) => {
const{errors,isValid}= validateTodoInput(req.body)
if (!isValid){
 res.status(400).json(errors);
}  
else{
Todo .findOne({name:req.body.name })
      .then(todo => {
        if (todo) {
            return res.status(400).json("The Todo name already exists");
        }
        else{
            const newTodo = new Todo({
                name : req.body.name,
                description:req.body.description,
                duedate:req.body.duedate
               });
               
               newTodo.save().then(todo => {
                 res.json(todo);
               });
        }
      })
};
});
router.get('/read/:id', (req, res) => {
Todo  .findOne({_id:req.params.id })
      .then(todo => {
        if (todo){
         res.json(todo);
        } else {
         res.json({message:"No user FOund"});
        };
      })
});

router.get('/all', (req, res) => {
Todo.find({completed:"false"})
    .then(todo => res.json(todo));
});

router.put('/update/:id', (req, res) => {
    const{errors,isValid}= validateTodoInput(req.body)
if (!isValid){

 res.status(400).json(errors);
}  
Todo  .findOne({_id:req.params.id })
      .then( todo=> {
        if (todo) {
            todo.name=req.body.name;
            todo.description=req.body.description;
            todo.duedate=req.body.duedate;
            todo.save().then(todo => {
                res.json(todo);
              });
        } else {
            res.json("Error")
        }
      })
});

router.delete('/delete/:id', (req, res) => {
Todo.findOne({_id:req.params.id})
    .then( todo=> todo.remove().then(() => res.json({ success: true })))
    .catch(err => {
      res.status(400).json({ success: false });
    });
});
 module.exports = router
