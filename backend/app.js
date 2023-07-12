const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const { isProduction } = require('./config/keys');
const csurf = require('csurf');
const debug = require('debug');
require('./models/User');
require('./models/Presentation');

//comments and likes routes Wed
require('./models/Like');
require('./models/Comment');

require('./config/passport');
const passport = require('passport');

const usersRouter = require('./routes/api/users');
const presentationsRouter = require('./routes/api/presentations');

//comments and likes routes Wed
const likesRouter = require('./routes/api/likes');
const commentsRouter = require('./routes/api/comments');

const csrfRouter = require('./routes/api/csrf');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(passport.initialize());

if (!isProduction) {
    app.use(cors());
}

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use('/api/users', usersRouter);
app.use('/api/presentations', presentationsRouter);

//comments and likes routes Wed
app.use('/api/likes', likesRouter);
app.use('/api/comments', commentsRouter);


app.use('/api/csrf', csrfRouter);

if (isProduction) {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    app.get('/', (req, res) => {
      res.cookie('CSRF-TOKEN', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, '../frontend', 'build', 'index.html')
      );
    });
  
    // Serve the static assets in the frontend's build folder
    app.use(express.static(path.resolve("../frontend/build")));
  
    // Serve the frontend's index.html file at all other routes NOT starting with /api
    app.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie('CSRF-TOKEN', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, '../frontend', 'build', 'index.html')
      );
    });
  }

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    });
});

module.exports = app;
