let express = require("express")
let mongoose = require("mongoose")
const bodyParser = require('body-parser');
let app = express();
const cors = require("cors")
require("./connection")
let user = require("./userSchema")
app.use(cors())
app.use(bodyParser.json())
//const { v2: uuidv2 } = require('uuid')

let addCount = 0;
let updateCount = 0;


//add and delete data on one click
//execution time for this Api is O(1) because every time we are deleting previous entry which is O(1) plus
// adding one entry which is also O(1) so execution time is O(1).
app.post('/add', async (req, res) => {
    try {
          addCount++;
        console.log(req.body)
        await user.deleteMany();

        // Create new data entry
        const newData = new user({
            UserId:Date.now(),
            name: req.body.name, // Assuming name is also provided in the request body
            email: req.body.email,
        });

        // Save the new data to the database
        await newData.save();

        res.status(201).json({ success: true, message: 'Data added successfully' });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).json({ success: false, error: 'An error occurred while adding data' });
    }
});


// update data on click button
// we are updating database so it will search the element in the database so the if there is n number of 
// enteries so it will run O(n) times and then update
app.put("/update/:email", async (req, res) => {
    updateCount++;
    //const UserId = req.params.UserId;
     let email = req.params.email
    console.log(typeof(UserId))
    
   const { name} = req.body;
   

    try {
        // Check if email property exists in request body
        if (!req.body || !req.body.email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const  updatedUser = await user.findByIdAndUpdate(email,{name},{new:true} );
           console.log(updatedUser)
     if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);

        //res.status(200).json({ success: true, message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});


// count the number of clicks addData and updateData
app.get('/counts', (req, res) => {
    const countData = {
        addCount,
        updateCount
    };
    res.json(countData);
});




app.listen(8000, () => {
    console.log("server started")
})