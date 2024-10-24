const express= require("express");
const bodyParser=require("body-parser")
const cors=require("cors");
const connectDB = require('./db');
const mongoose = require('mongoose');

connectDB();

const submissionSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
});

const Submission = mongoose.model('Submission', submissionSchema);
const app=express();
const PORT=3000;

app.use(cors());
app.use(bodyParser.json());


app.post("/submit",(req,res)=>{
    const{name,contact,email}=req.body;

    if(!name||!contact||!email){

        return res.status(400).json({message:"all fields required."})
    }

    const newSubmission = new Submission({ name, contact, email });
    newSubmission.save();
      return res.status(201).json({message:"Submission received!"})
    
});

app.get('/submissions', async (req, res) => {
    try {
        const submissions = await Submission.find(); // Fetch submissions from the database
        res.json(submissions); // Return the submissions as a JSON response
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ message: 'Error fetching submissions' }); // Handle errors
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on http//localhost:${PORT}`)
})