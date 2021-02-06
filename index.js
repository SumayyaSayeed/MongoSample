const express = require('express');
const bodyparser = require('body-parser');

const getAllUsers = async(req,res) =>{
const {User} = require('./models/user');
const user =await User.find();
res.send(user);
}

const insertData = async(req,res)=>{
    const { User} =require('./models/user');
    const  user = await User.create(req.body);
    res.send(user);
}

const deleteData = async(req,res)=>{
    const {User} =require('./models/user');
    const user = await User.findByIdAndDelete({_id:req.params.id},req.body).then(deleteData());
    res.send(user);
}

const updateData = async(req,res)=>{
    const {User} =require('./models/user');
    const user = await User.findByIdAndUpdate({_id:req.params.id},req.body);
    res.send(user);
}

async function startServer(){
    const app = express();
    app.use(bodyparser.json());
    app.listen( 3000 , error =>{
        if(error){
            console.log("error:", error);
            process.exit(1);
        }
        console.log("server listening");
    });
    app.get('/users' , getAllUsers);
    app.post('/users', insertData);
    app.delete('/users/:id', deleteData);
    app.put('/users/:id', updateData);
}
startServer();