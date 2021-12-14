const express = require("express");
const path = require("path")
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const nodemailer = require("nodemailer");
const { google } = require("googleapis")

require('dotenv').config();

const dbURI = process.env.DB_URI;
const EMAIL = process.env.EMAIL;
const ClientID = process.env.CLIENT_ID;
const ClientSecret = process.env.CLIENT_SECRET;
const RedirectURI = process.env.REDIRECT_URI;
const RefreshToken = process.env.REFRESH_TOKEN;

mongoose.connect(dbURI)
.then(()=>app.listen(3000))

const oAuth2Client = new google.auth.OAuth2(ClientID, ClientSecret, RedirectURI)
oAuth2Client.setCredentials({ refresh_token: RefreshToken })

const sendMail = async (body)=>{
    try{
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        tls: {
            rejectUnauthorized: false
          },
        auth: {
            type: 'OAuth2',
            user: `${EMAIL}`,
            clientId: ClientID,
            clientSecret: ClientSecret,
            refreshToken: RefreshToken,
            accessToken: accessToken
        }
        })

        const mailOptions = {
            from: `Dhanam Corp. <${EMAIL}>`,
            to: `${body.email}`,
            subject: 'Assignment Sign Up Mail Test',
            text: `Welcome ${body.username}, you are signed up!`,
        }

        const result = await transporter.sendMail(mailOptions)
        return result;
    }
    catch(err){
        return err
    }
}

app.use(express.urlencoded({ extended:true }));

app.set('views');
app.set('view engine', 'pug');

app.get("/sign-up", (req,res)=>{
    res.render('sign-up')
})

app.post('/sign-up', (req,res)=>{
    const user = new User(req.body);
    user.save()
    sendMail(req.body)
    .then(()=>res.send('Success!'))
    .catch(err=>res.send(err))
})
