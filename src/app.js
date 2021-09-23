const mongoose = require("mongoose");
const validator = require("validator");

// Connection Creation and Create a new Database(db)
mongoose.connect("mongodb://localhost:27017/ttchannel")
.then( () => console.log("Connection Successfull.. "))
.catch((err) => console.log(err));

// What is Schema?
// A Mongoose schema defines the structure of the document,
// defalut values, validators, etc..
// now take instance
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        lowercase: true,
        trim: true,
        minlength:2,
        maxlength:30
    
    },
    ctype: {
        type:String,
        required : true,
        lowercase:true,
        enum: ["front end", "back end", "database"]
    },
    videos: {
        type:Number,
        validate(value){
            if(value < 0) {
                throw new Error("vidoes should not be negative");
            }
        }

        // or
        // validate: {
        //     validator:function(value){
        //         return value.length < 0
        //     },
        //     message:"vidoes should not be negative"
        // }

     },
    author:String, 
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error(" Email is invalid");
            }
        }

    },
    active: Boolean,
    date: {
        type:Date,
        default: Date.now
    }
})

// What is Model?
// A mongoose model is a wrapper on the mongoose schema.
// A Mongoose schema defines the structure of the document,
// defalut values, validators, etc.. whereas a mongoose model
// provides an interface to the database for 
//crating, querying, updating, deleting records, etc...

// Collections crations
//const Playlist= new mongoose.model("Playlist",playlistSchema)

// Creating Document or Insert
/*const createDocument = async () => {
    try {
        const reactPlaylist = new Playlist({
            name: "Node Js",
            ctype: "Back End",
            videos: 15,
            author: "Ravi",
            active: true
            
        })
        
        const result = await reactPlaylist.save();
        console.log(result);
    }catch(err){
        console.log(err);
    }
    
}
createDocument(); */

// Collections crations
const Playlist= new mongoose.model("Playlist",playlistSchema)

// insertMany Document
const createDocument = async () => {
    try {
        const jsPlaylist = new Playlist({
            name: "Javascript",
            ctype: "Front End",
            videos: 10,
            author: "Ravi",
            email: "abc@gmail.com",
            active: true
            
        })

        const mongoPlaylist = new Playlist({
            name: "MongoDb",
            ctype: "DataBase",
            videos: 20,
            author: "Ravi",
            email:"rvi@gmail.com",
            active: true
            
        })
        const mongoosePlaylist = new Playlist({
            name: "MonGoOse",
            ctype: "DataBase",
            videos: 30,
            author: "Ravi",
            email:"cdf@gmail.com",
            active: true
            
        })
        const expressPlaylist = new Playlist({
            name: "Expressjs",
            ctype: "Back End",
            videos: 40,
            author: "Ravi",
            email: "cdhsk@gmail.com",
            active: true
            
        })
        
        const result = await Playlist.insertMany([jsPlaylist,mongoPlaylist,mongoosePlaylist,expressPlaylist]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
    
}
createDocument(); 

// Read Document

const getDocument = async () => {
    try{
        const result = await Playlist
        //.find({vidoes: {$gt : 30 }})
        // .find({$or : [ {ctype: "Back End"} ,
        // {author:"Ravi"} ]})
        .find({$and : [ {author:"Ravi"} ]})
        .select({name:1})
        .sort({name: 1})
        //.countDocuments();
        //.limit(1);
        console.log(result);
    }catch(err) {
        console.log(err);
    }
   
}


//getDocument();

// Update the document

const updateDocument = async (_id) => {
    try {
        const result = await Playlist.findByIdAndUpdate({_id}, {
            $set: {
                name: "Javascript "
            }
        }, {
            new: true
        });
        console.log(result);

    }catch(err){
        console.log(err);
    }
    
}

//updateDocument("61480264d8a260af3428f1e3");

// Delete the Document

const deleteDocument = async (_id) => {
    try{

        const result = await Playlist.findByIdAndDelete({_id});
        console.log(result);

    }catch(err){
        console.log(err);
    }
   
}

//deleteDocument("61480264d8a260af3428f1e5");