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

/**
 * @api {post} /authenticate Authenticate User
 * @apiName Authenticate
 * @apiGroup User
 *
 * @apiParam {String} token User token
 * @apiParamExample {json} Input
 *    {
 *      "token": "ExampleToken",
 *    }
 * @apiSuccess {String} message success message
 */
app.post('/authenticate', authentication, (req, res, next) => {
    res.status(200).send("Authentication succesful");
})


/**
 * @api {post} /register Register User
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {Object} user User object.
 * @apiParam {String} user.user Username
 * @apiParam {String} user.password User password
 * @apiParam {String} user.repeatPass User repeat password
 * @apiParamExample {json} Input
 *    {
 *      "user": "ExampleUser",
 *      "password": "ExamplePass",
 *      "repeatPass": "ExamplePass"
 *    }
 * @apiSuccess {String} message success message
 */
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

/**
 * @api {post} /login Login User
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {Object} user User object
 * @apiParam {String} user.user Username
 * @apiParam {String} user.password User password
 * @apiParamExample {json} Input
 *    {
 *      "user": "ExampleUser",
 *      "password": "ExamplePass",
 *    }
 * @apiSuccess {Object} user User object
 * @apiSuccess {String} user.user Username 
 * @apiSuccess {String} user.token Token 
 * @apiSuccess {String} user.id User id 
 */
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

/**
 * @api {post} /logout Logout User
 * @apiName Logout
 * @apiGroup User
 *
 * @apiParam {String} token User token
 * @apiParamExample {json} Input
 *    {
 *      "token": "ExampleToken",
 *    }
 * @apiSuccess {String} message success message
 */
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

/**
 * @api {get} /notifications Get notifications
 * @apiName Get notifications
 * @apiGroup Notification
 *
 * @apiSuccess {Object[]} notifications Notifications array
 * @apiSuccess {Object} notification Notification object
 * @apiSuccess {String} notification.id Id
 * @apiSuccess {String} notification.header Title
 * @apiSuccess {String} notification.content Content
 * @apiSuccess {String} notification.createdAt ISO timestamp 
 * @apiSuccess {String} notification.updatedAt ISO timestamp
 * @apiSuccess {String} notification.userId User id
 * @apiSuccess {Object} notification.user User object
 * @apiSuccess {String} notification.user.name User name
 * @apiSuccessExample {json} Success
 *    [{
 *      "id": 1,
 *      "content": "Example content",
 *      "header": "Example title",
 *      "createdAt": "2018-03-11T13:34:20.000Z",
 *      "updatedAt": "2018-03-11T13:34:20.000Z",
 *      "userId": 1,
 *      "user": {
 *           "name": "Example name"
 *       }
 *    }]
 */
app.get('/notifications', (req, res, next) => {
    db.Notification.findAll({include: { model: db.User, attributes: ['name'] }}).then(notifications => {
        res.json(notifications);
    })
});

/**
 * @api {get} /notifications/:id Get single notification
 * @apiName Get notification
 * @apiGroup Notification
 * 
 * @apiParam {Number} id Notification id
 *
 * @apiSuccess {Object} notification Notification object
 * @apiSuccess {String} notification.id Id
 * @apiSuccess {String} notification.header Title
 * @apiSuccess {String} notification.content Content
 * @apiSuccess {String} notification.createdAt ISO timestamp 
 * @apiSuccess {String} notification.updatedAt ISO timestamp
 * @apiSuccess {String} notification.userId User id
 * @apiSuccess {Object} notification.user User object
 * @apiSuccess {String} notification.user.name User name
 * @apiSuccess {Object[]} notification.responses Responses array
 * @apiSuccess {Object} notification.responses.response Response object
 * @apiSuccess {String} notification.responses.response.id Response object
 * @apiSuccess {String} notification.responses.response.content Response Content
 * @apiSuccess {String} notification.responses.response.createdAt Response ISO timestamp 
 * @apiSuccess {String} notification.responses.response.updatedAt Response ISO timestamp
 * @apiSuccess {String} notification.responses.response.notificationId Response notification id
 * @apiSuccess {String} notification.responses.response.userId Response user id
 * @apiSuccess {Object} notification.responses.response.user Response user object
 * @apiSuccess {String} notification.responses.response.user.name Response user name
 * 
 * @apiSuccessExample {json} Success
 *    [{
 *      "id": 1,
 *      "content": "Example content",
 *      "header": "Example title",
 *      "createdAt": "2018-03-11T13:34:20.000Z",
 *      "updatedAt": "2018-03-11T13:34:20.000Z",
 *      "userId": 1,
 *      "user": {
 *           "name": "Example name"
 *       },
 *       "responses": [
 *      {
 *          "id": 6,
 *          "content": "Example content",
 *          "createdAt": "2018-03-12T07:31:50.000Z",
 *          "updatedAt": "2018-03-12T07:31:50.000Z",
 *          "notificationId": 1,
 *          "userId": 1,
 *          "user": {
 *              "name": "Example name"
 *          }
 *     }]
 *    }]
 */
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

/**
 * @api {post} /notifications Post notification
 * @apiName Post notification
 * @apiGroup Notification
 *
 * @apiParam {Object} notification Notification object
 * @apiParam {String} notification.token User token
 * @apiParam {Number} notification.userId User id
 * @apiParam {String} notification.header Notification content
 * @apiParam {String} notification.content Notification content
 * @apiParamExample {json} Input
 *    {
 *      "userId": 1,
 *      "token": "ExampleToken",
 *      "header": "Example title",
 *      "content": "Example content"
 *    }
 * @apiSuccess {Object} notification Added notfication
 * @apiSuccess {String} notification.content Notification content
 * @apiSuccess {Number} notification.id Notification id
 * @apiSuccess {String} notification.header Notification header
 * @apiSuccess {String} notification.createdAt Notification timestamp
 * @apiSuccess {String} notification.updatedAt Notification timestamp
 * @apiSuccess {Number} notification.userId Notification user id
 * @apiSuccess {Object} notification.user Notification user object
 * @apiSuccess {String} notification.user.name Notification user name
 * @apiSuccessExample {json} Success
 *    {
 *      "id": 1,
 *      "content": "Example content",
 *      "header": "Example title",
 *      "createdAt": "2018-03-11T13:34:20.000Z",
 *      "updatedAt": "2018-03-11T13:34:20.000Z",
 *      "userId": 1,
 *      "user": {
 *           "name": "Example name"
 *       }
 *    }
 */
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

/**
 * @api {post} /notifications/:id Post response
 * @apiName Post response
 * @apiGroup Notification
 *
 * @apiParam {Number} id Notification id
 * 
 * @apiParam {Object} response Response object
 * @apiParam {String} response.token User token
 * @apiParam {Number} response.userId User id
 * @apiParam {String} response.content Response content
 * @apiParamExample {json} Input
 *    {
 *      "userId": 1,
 *      "token": "ExampleToken",
 *      "content": "Example content"
 *    }
 * @apiSuccess {Object} response Added response
 * @apiSuccess {String} response.content Response content
 * @apiSuccess {Number} response.id Response id
 * @apiSuccess {String} response.notificationId Notification id
 * @apiSuccess {String} response.createdAt Response timestamp
 * @apiSuccess {String} response.updatedAt Response timestamp
 * @apiSuccess {Number} response.userId Response user id
 * @apiSuccess {Object} response.user Response user object
 * @apiSuccess {String} response.user.name User name
 * @apiSuccessExample {json} Success
 *    {
 *      "id": 1,
 *      "content": "Example content",
 *      "notificationId": 1,
 *      "header": "Example title",
 *      "createdAt": "2018-03-11T13:34:20.000Z",
 *      "updatedAt": "2018-03-11T13:34:20.000Z",
 *      "userId": 1,
 *      "user": {
 *           "name": "Example name"
 *         }
 *    }
 */
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
