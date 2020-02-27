const express = require('express');
const mongoose = require('mongoose');


const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Connect to database
mongoose.connect(db)
    .then(() => console.log('Mongo DB Connected', 
        { useNewUrlParser: true },
        { useCreateIndex: true},
        { useUnifiedTopology: true }
    ))
    .catch(err => console.log(err));


app.get('/', (req, res) => res.send('hello world'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));