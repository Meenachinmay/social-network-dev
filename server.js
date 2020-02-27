const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

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

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));


