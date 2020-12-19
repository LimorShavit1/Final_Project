const express = require('express');
const app = express();
const mongoose = require('mongoose'); // use mongoose to connect to DB


app.use(express.json());
const authRoutes = require('./routes/auth');

app.get('/', (req, res) => {
    res.send('welcome to home route');
});

//middleware:
app.use('/api/users', authRoutes);


// DB_USERNAME ='limorsh'
// DB_PASSWORD='limorsagi123'
//mongoose.connect('mongodb+srv://limorsh:limorsagi123@cluster0.ymfp4.mongodb.net/auth_system?retryWrites=true&w=majority',
//require('dotenv').config();
//mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ymfp4.mongodb.net/auth_system?retryWrites=true&w=majority`,
mongoose.connect('mongodb+srv://limorsh:limorsagi123@cluster0.ymfp4.mongodb.net/auth_system?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        //connect web:
        require('dotenv').config();

        const port = process.env.PORT || 3000; // if we dont have port in env file use port=3000
        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        })

    })
    .catch(err => console.log(err))

