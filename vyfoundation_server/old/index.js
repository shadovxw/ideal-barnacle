require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jerrell.cartwright@ethereal.email',
        pass: 'TJvR669k8sKpstjG44'
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP connection error:", error);
    } else {
        console.log("SMTP server is ready to accept messages:", success);
    }
});



const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
const PORT = process.env.PORT || 8080;

const schemaData = mongoose.Schema({
    name: { type: String},
    email: { type: String, required: true},
    mobile: { type: String, required: true}, 
    address: { type: String },
    amount: { type: String },
    donationType: { type: String },
    newsletter: { type: Boolean },
    eventsupdate: { type: Boolean },
    donationmade: { type: String }
}, {
    timestamps: true
});

const schemaData2 = mongoose.Schema({
    emailid: { type: String, required: true },
}, {
    timestamps: true
});

const userModel = mongoose.model("user", schemaData);
const userModel2 = mongoose.model("subscription", schemaData2);

app.get("/", async (req, res) => {
    try {
        const users = await userModel.find({});
        const subscriptions = await userModel2.find({});
        res.json({ success: true, users, subscriptions });
        console.log(users)
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving data', error: error.message });
    }
});

app.get("/withemail/:emailid", async (req, res) => {
    const emailid = req.params.emailid;

    try {
        const users = await userModel.find({ email: emailid });
        const subscriptions = await userModel2.find({});
        res.json({ success: true, users, subscriptions });
        console.log(users)
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving data', error: error.message });
    }
});

app.post("/create", async (req, res) => {
    try {
        const data = new userModel(req.body);
        await data.save();
        res.send({ success: true, message: "Data saved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving data', error: error.message });
    }
});

app.post("/createsubcription", async (req, res) => {
    try {
        const data = new userModel2(req.body);
        await data.save();
        

        const emailOptions = {
            from: 'jerrell.cartwright@ethereal.email',
            to: data.emailid,
            subject: "VY FOUNDATION",
            text: `Thank you for subscribing to updates from VY Foundation. We’re excited to have you!`,
            };

        console.log("[DEBUG] Sending welcome email to:", data.emailid);
        await transporter.sendMail(emailOptions);
        console.log("[DEBUG] 2");
        res.send({ success: true, message: "Data saved successfully" });
        console.log("[DEBUG] 3");

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving data', error: error.message });
    }
});

app.put("/update", async (req, res) => {
    try {
        const { _id, ...rest } = req.body;
        const data = await userModel.updateOne({ _id: _id }, rest);
        res.send({ success: true, message: "Data updated", data: data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating data', error: error.message });
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await userModel.deleteOne({ _id: id });
        res.send({ success: true, message: "Data deleted successfully", data: data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting data', error: error.message });
    }
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => console.log(err));