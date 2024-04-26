import React, { useState } from 'react'

function Form() {
    let[data,setData] = useState({
        name:"",
        email:""
    })
    
    const [countData, setCountData] = useState(null);
    
    let addData = (e)=>{
        let{name,value}=e.target
        setData(()=>{
            return({
                ...data,
                [name]:value
            })
        })
    }

    
        let sendData = async (e) => {
            e.preventDefault();
    
            let  { email, name } = data;
           // console.log(email);
            try {
                let res = await fetch("http://localhost:8000/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name:name,
                        email:email
                       
                    })
                });
    
    
                let data = await res.json();
                console.log(data);
    
                if (res.status === 400 || !data) {
                    console.log("invalid details");
                 
                        
    
                } else {
                    
                    setData({ ...data, email: "", name: "" })
                   
                }
            } catch (error) {
                console.log("login page ka error" + error.message);
              }  
    }
    const UserId = "1714061892325"
    let updateHandler =async()=>{
        try {
           
            
            // Send update request to the server
            const response = await fetch(`http://localhost:8000/update${UserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: 'updatedName', email: 'updatedEmail@example.com' }), // Assuming data contains the updated values
            });

            const responseData = await response.json();
            console.log(responseData)

            if (response.ok) {
                console.log('Data updated successfully:', responseData);
                // Update UI or perform any other action on successful update
            } else {
                console.error('Failed to update data:', responseData.error);
                // Handle error, display message, etc.
            }
        } catch (error) {
            console.error('Error updating data:', error.message);
            // Handle error, display message, etc.
        } 
    }


    let getCount = async()=>{
          try {
               let response = await fetch("http://localhost:8000/counts")
               let data = await response.json();
               setCountData(data)
            
          } catch (error) {
            console.error('Error fetching count:', error);
          }
    }
    
  return (
    <div>
        <label>name</label>
        <input type='text' placeholder='name' onChange={addData} value={data.name} name='name'></input>
        <label>email</label>
        <input type='text' placeholder="email" onChange={addData} value={data.email} name='email'></input><br></br>
        <button onClick={sendData}>Add</button>
        <button onClick={updateHandler} >update</button>
        <button onClick={getCount}>getCount</button>
        {countData && (
                <div>
                    <p>Add API Count: {countData.addCount}</p>
                    <p>Update API Count: {countData.updateCount}</p>
                </div>
            )}
    </div>
  )
}

export default Form