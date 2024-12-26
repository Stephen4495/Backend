import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

//Get the file path form URL of the current module
const __filename = fileURLToPath(import.meta.url);
//Get the directory name form the file path
const __dirname = dirname(__filename);

//MIDDLEWARE
app.use(express.json)
//Serves the HTML file from the /public direction and 
//Tells express to serve all files from the public folder as static asssets/files. Any request for the css files will be resolved to the public directory
app.use(express.static(path.join(__dirname, '../public')))

// Serving up the HTML from the /public directory
app.get('/', (req, res)=>{
    res.sendFile(Path.join(__dirname, 'public', 'index.html'))
});

app.listen(PORT, ()=>{
  console.log(`Server has started on port: ${PORT}`);
});

