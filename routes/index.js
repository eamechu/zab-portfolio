var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/sendmail', (req, res) => {
    // console.log(req.body);
    const output = `
        <p>You have a new Message from your Website</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    //NodeMailer
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "586d0e62f617db",
            pass: "7b9e615bb343c9"
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"WebsiteVisitor" <586d0e62f617db>', // sender address
        to: 'ginoxata@hurify1.com, eamechu@intervas.com', // list of receivers
        subject: 'Contact from Website', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        var msg = "Thank you for the message, it has been successfully sent!";
        res.render('index', { msg: msg });
    });

});


module.exports = router;