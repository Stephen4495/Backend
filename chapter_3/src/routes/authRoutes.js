import express from 'express';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router(); 

// Register new user endpoint /auth/register
router.post('/register', (req, res) => {
  const { username, password } = req.body
  // save the username and irreversibly encrypted password
  // save the gilgamesh@gmail.com | heihfiwfomo..,asfjioewmvmo234 (thiu is what gets put in the database)

  // encrypt password
  const hashedPassword = bcrypt.hashSync(password, 8);


  // save the new user and password
  try{
    const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
    const result = insertUser.run(username, hashedPassword);

    // now tha we have the user, I wnat to addd their first todo for them
    const defaultTodo = `Hello :) Add your first todo!`
    const insertTodo = db.prepare(`INSERT INTO todos(user_id, task) VALUES (?, ?)`);
    insertTodo.run(result.lastInsertRowid, defaultTodo);

    // create a token
    const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET,{expiresIn: '24h'} );
    res.json({ token });
  } catch(err) {
    console.log(err.message);
    res.sendStatus(503);
  }
 

});

router.post('/login', (req, res)=>{
  // When  we loog in the user and we look up the password associated with that email in the database
  // but we get it back and see it's encrypted which means you can not compare it to the one the user just used trying to login 
  // so what we can do is again, one way encrypt the password the user just entered

});

export default router;
