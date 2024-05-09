const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const port = process.env.PORT
const sequelize = require('./config/db');
const { initBookModel } = require('./models/book');
const { initUserModel, User } = require('./models/user');
const { initRoleModel, Role } = require('./models/role');
// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=> {
  return res.status(200).json({
    success: true
  })
})
app.use('/user', usersRouter);

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    await initBookModel();
    await initUserModel();
    await initRoleModel(); 
    await sequelize.sync({ force: true });
    await Role.bulkCreate([
      { name: 'admin' },
      { name: 'user' }
    ]);
    await User.create({
      username: 'admin', 
      password: 'Hello123',
      role_id: 1,
    })
  } catch (error) {
    console.log(error);
  }
  console.log(`running on port ${port}`);
})

module.exports = app;
