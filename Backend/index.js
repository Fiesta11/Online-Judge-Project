const express = require('express');
const { generatefile } = require('./generatefile');
const{executecpp} = require('./executecpp')
const app = express();

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get('/' , (req , res) =>{
    res.json({online : "Compiler"})
})

app.post("/run" , async (req , res) =>{
    // const language = req.body.language;
    // const code = req.body.code;
    const {language = 'cpp', code} = req.body;

    if(code === undefined)
    {
        return res.status(404).json({success : false , error : "Empty Code Body!"})
    }
    try{
    const filepath = await generatefile(language , code);
    const output = await executecpp(filepath);
    res.json({filepath , output});
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
})
app.listen(5000 , ()=>{
    console.log("Server is listening on port 5000!!");
})
