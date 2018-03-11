const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const crypto = require('crypto');

app.use(cors());
app.use(bodyParser.json());

const authentication = (req, res, next) => {
    let token = req.body.token;
    db.User.findOne({where: {token: token}}).then(user => {
        if (user) {
            next();
        } else {
            res.send(401);
        }
    })
}

app.post('/authenticate', authentication, (req, res, next) => {
    res.status(200).send("Authentication succesful");
})

app.post('/register', (req, res, next) => {
    let name = req.body.user;
    let pass = req.body.password;
    let repeat = req.body.repeatPass;
    if (pass === repeat) {
        let hash = crypto.createHash('sha256').update(pass).digest('base64'); 
        db.User.findOne({where:{name: name}}).then(user => {
            if (user) {
                res.status(400).send("Username is taken");
            } else {
                db.User.create({
                    name: name,
                    password: hash,
                }).then(user => {
                    res.status(201).send("User created")
                });
            }
        });
    } else {
        res.status(403).send("Passwords didn't match");
    }
});

app.post('/login', (req, res, next) => {
    let name = req.body.user;
    let pass = req.body.password;
    let hash = crypto.createHash('sha256').update(pass).digest('base64'); 
    db.User.findOne({where:
    {
        name: name,
        password: hash
    }}).then(user => {
        if (user) {
            let token = crypto.randomBytes(64).toString('hex');
            user.update({
                token: token,
            }).then(user => {
                res.status(200).json({user: user.name, token: user.token, id: user.id});
            })
        } else {
            res.status(400).send("Wrong username or password");
        }
    })

});

app.post('/logout', authentication, (req, res, next) => {
    let token = req.body.token;
    db.User.findOne({where: {token: token}}).then(user => {
        user.update({
            token: null
        }).then(() => {
            res.send(200);
        });
    });

});


app.get('/notifications', (req, res, next) => {
    db.Notification.findAll({include: { model: db.User, attributes: ['name'] }}).then(notifications => {
        res.json(notifications);
    })
});

app.get('/notifications/:id', (req, res, next) => {
    let id = req.params.id;
    db.Notification.findOne(
        {where: {id: id}, 
        include: [
            {model: db.User, attributes: ['name']},
            {model: db.Response, include: { model: db.User, attributes: ['name']}}
        ]}).then(notification => {
        res.json(notification);
    })
})

app.post('/notifications', authentication, (req, res, next) => {
    let userId = req.body.userId;
    let header = req.body.header;
    let content = req.body.content;
    let notif = {header: header, content: content,}
    notif.userId = userId;
    db.Notification.create(notif)
    .then(notification => {
         db.User.findOne({where: {id: notification.userId}}).then(user => {
            notification.dataValues.user = {name: user.dataValues.name};
            res.json(notification);
            
        }) 
    })
})

app.post('/notifications/:id', authentication, (req, res, next) => {
    let userId = req.body.userId;
    let notificationId = req.params.id;
    let content = req.body.content;
    let response = {userId: userId, notificationId: notificationId, content: content,}
    db.Response.create(response)
    .then(response => {
        db.User.findOne({where: {id: response.userId}}).then(user => {
            response.dataValues.user = {name: user.dataValues.name};
            res.json(response);
        })
    })
})

http.listen(3001, () => {
    console.log("listening port");
});

module.exports = http;
