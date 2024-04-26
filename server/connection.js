let mongoose = require("mongoose")
let db = "mongodb+srv://gaurav033singh:Zc1XLzod5vLoMakG@neuron.e3uiyd1.mongodb.net/?retryWrites=true&w=majority&appName=Neuron"
mongoose.connect(db).then(()=>console.log("database connected")).catch((err)=>console.log("error"+err.message))