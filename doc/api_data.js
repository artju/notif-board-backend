define({ "api": [
  {
    "type": "get",
    "url": "/notifications/:id",
    "title": "Get single notification",
    "name": "Get_notification",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Notification id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Notification object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.header",
            "description": "<p>Title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.content",
            "description": "<p>Content</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.createdAt",
            "description": "<p>ISO timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.updatedAt",
            "description": "<p>ISO timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.userId",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification.user",
            "description": "<p>User object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.user.name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "notification.responses",
            "description": "<p>Responses array</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification.responses.response",
            "description": "<p>Response object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.responses.response.id",
            "description": "<p>Response object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.responses.response.content",
            "description": "<p>Response Content</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.responses.response.createdAt",
            "description": "<p>Response ISO timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.responses.response.updatedAt",
            "description": "<p>Response ISO timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.responses.response.notificationId",
            "description": "<p>Response notification id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.responses.response.userId",
            "description": "<p>Response user id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification.responses.response.user",
            "description": "<p>Response user object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.responses.response.user.name",
            "description": "<p>Response user name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "[{\n  \"id\": 1,\n  \"content\": \"Example content\",\n  \"header\": \"Example title\",\n  \"createdAt\": \"2018-03-11T13:34:20.000Z\",\n  \"updatedAt\": \"2018-03-11T13:34:20.000Z\",\n  \"userId\": 1,\n  \"user\": {\n       \"name\": \"Example name\"\n   },\n   \"responses\": [\n  {\n      \"id\": 6,\n      \"content\": \"Example content\",\n      \"createdAt\": \"2018-03-12T07:31:50.000Z\",\n      \"updatedAt\": \"2018-03-12T07:31:50.000Z\",\n      \"notificationId\": 1,\n      \"userId\": 1,\n      \"user\": {\n          \"name\": \"Example name\"\n      }\n }]\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Notification"
  },
  {
    "type": "get",
    "url": "/notifications",
    "title": "Get notifications",
    "name": "Get_notifications",
    "group": "Notification",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "notifications",
            "description": "<p>Notifications array</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Notification object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.id",
            "description": "<p>Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.header",
            "description": "<p>Title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.content",
            "description": "<p>Content</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.createdAt",
            "description": "<p>ISO timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.updatedAt",
            "description": "<p>ISO timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.userId",
            "description": "<p>User id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification.user",
            "description": "<p>User object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.user.name",
            "description": "<p>User name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "[{\n  \"id\": 1,\n  \"content\": \"Example content\",\n  \"header\": \"Example title\",\n  \"createdAt\": \"2018-03-11T13:34:20.000Z\",\n  \"updatedAt\": \"2018-03-11T13:34:20.000Z\",\n  \"userId\": 1,\n  \"user\": {\n       \"name\": \"Example name\"\n   }\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Notification"
  },
  {
    "type": "post",
    "url": "/notifications",
    "title": "Post notification",
    "name": "Post_notification",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Notification object</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notification.token",
            "description": "<p>User token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "notification.userId",
            "description": "<p>User id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notification.header",
            "description": "<p>Notification content</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notification.content",
            "description": "<p>Notification content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"userId\": 1,\n  \"token\": \"ExampleToken\",\n  \"header\": \"Example title\",\n  \"content\": \"Example content\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification",
            "description": "<p>Added notfication</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.content",
            "description": "<p>Notification content</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "notification.id",
            "description": "<p>Notification id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.header",
            "description": "<p>Notification header</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.createdAt",
            "description": "<p>Notification timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.updatedAt",
            "description": "<p>Notification timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "notification.userId",
            "description": "<p>Notification user id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "notification.user",
            "description": "<p>Notification user object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "notification.user.name",
            "description": "<p>Notification user name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"id\": 1,\n  \"content\": \"Example content\",\n  \"header\": \"Example title\",\n  \"createdAt\": \"2018-03-11T13:34:20.000Z\",\n  \"updatedAt\": \"2018-03-11T13:34:20.000Z\",\n  \"userId\": 1,\n  \"user\": {\n       \"name\": \"Example name\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Notification"
  },
  {
    "type": "post",
    "url": "/notifications/:id",
    "title": "Post response",
    "name": "Post_response",
    "group": "Notification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Notification id</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Response object</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "response.token",
            "description": "<p>User token</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "response.userId",
            "description": "<p>User id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "response.content",
            "description": "<p>Response content</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"userId\": 1,\n  \"token\": \"ExampleToken\",\n  \"content\": \"Example content\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Added response</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.content",
            "description": "<p>Response content</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "response.id",
            "description": "<p>Response id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.notificationId",
            "description": "<p>Notification id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.createdAt",
            "description": "<p>Response timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.updatedAt",
            "description": "<p>Response timestamp</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "response.userId",
            "description": "<p>Response user id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response.user",
            "description": "<p>Response user object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.user.name",
            "description": "<p>User name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "{\n  \"id\": 1,\n  \"content\": \"Example content\",\n  \"notificationId\": 1,\n  \"header\": \"Example title\",\n  \"createdAt\": \"2018-03-11T13:34:20.000Z\",\n  \"updatedAt\": \"2018-03-11T13:34:20.000Z\",\n  \"userId\": 1,\n  \"user\": {\n       \"name\": \"Example name\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "Notification"
  },
  {
    "type": "post",
    "url": "/authenticate",
    "title": "Authenticate User",
    "name": "Authenticate",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"token\": \"ExampleToken\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login User",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User object</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.user",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"user\": \"ExampleUser\",\n  \"password\": \"ExamplePass\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.user",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.token",
            "description": "<p>Token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.id",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "Logout User",
    "name": "Logout",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"token\": \"ExampleToken\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register User",
    "name": "Register",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User object.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.user",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.repeatPass",
            "description": "<p>User repeat password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"user\": \"ExampleUser\",\n  \"password\": \"ExamplePass\",\n  \"repeatPass\": \"ExamplePass\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>success message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/server.js",
    "groupTitle": "User"
  }
] });
