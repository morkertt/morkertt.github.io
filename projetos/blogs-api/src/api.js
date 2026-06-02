const express = require('express');
const categoryRouter = require('./routers/categoriesRouter');
const loginRouter = require('./routers/loginRouter');
const usersRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');

// ...

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', usersRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
