var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');



var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Insere os arquivos que contém as rotas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usuario.route');
const autenticacaoRouter = require('./routes/autenticacao.route');
const produtoRouter = require('./routes/produto.router');
const tipoRouter = require('./routes/tipo.router');
const fornecedorRouter = require('./routes/fornecedor.router');

//Insere os endpoints para cada rota
app.use('/', indexRouter);
app.use('/usuario', usersRouter);
app.use('/autenticacao', autenticacaoRouter);
app.use('/tipo',tipoRouter);
app.use('/produto',produtoRouter);
app.use('/fornecedor',fornecedorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
