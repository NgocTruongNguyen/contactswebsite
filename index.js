const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Contact = require('./models/contact'); // Import the Contact model

try {
    mongoose.connect('mongodb+srv://2k1nguyenngoctruongVSEC:w7vPw6SnFc7HkRLy@cluster0.ezfhubl.mongodb.net/mywebsitevsec?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("Connect successfuly!!!");
    // Retrieve a list of all collection names
    mongoose.connection.db.listCollections().toArray((err, collections) => {
        console.log("a")
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('Collections:', collections.map(col => col.name));
        }
    });
} catch (error) {
    console.log("Connect failure!!!");
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const contact = new Contact({ name, email, message });
        await contact.save();
        console.log('Contact information saved:', contact);
        res.send('Contact form submitted successfully!');
    } catch (error) {
        console.error('Error saving contact information:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

const PORT = 4445;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
