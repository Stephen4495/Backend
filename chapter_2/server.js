const express = require('express');
const app = express();
const PORT = 8383;

let data = ['james']

//MIDDLEWARE
app.use(express.json())

//{Type 1}. Website endpoints - (This are endpoints for sending back html and they typically come when a user enters a url in a browser)
app.get('/', (req, res)=>{
  console.log('User requested the homepage website')
  res.send(`<body style ="background:pink; color:blue;">

    <h1>DATA<h1/>

    <p>${JSON.stringify(data)}</p>
    <a href="/dashboard">Dashboard</a>
    <body</>
    <script>console.log('This is my script')</script>
    `);
   
});

app.get('/dashboard', (req, res)=>{
  res.send(`
    
    <body>
    <h1>dashboard</h1>
    <a href="/">home</a>
    <body/>
    
    
    `);
});

app.get('/api/data', (req, res)=>{
  res.status(599).send(data)
})

app.post('/api/data', (req, res)=>{
  //someone wants to create a user (for example when they click a signup button)
  //the user clicks the signup button afater entering theri credentials and theri browser is wired upto send out a network request to the server to handle that action 
  const newEntry = req.body 
  console.log(newEntry);
  data.push(newEntry.name)
  res.sendStatus(201)
})

app.delete('/api/data', (req, res)=>{
  data.pop()
  console.log('We deleted the element off the ennd of the array')
  res.sendStatus(203)
})



//Type 2- API endpoints (non visual)


app.listen(PORT , () => console.log(`server is running on port ${PORT}`));
 