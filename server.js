const Hapi = require('hapi');
const config = require('config');
const vision = require('vision');
const handlebars = require('handlebars');
const inert = require('inert');
const jwt = require('jsonwebtoken');
const Boom = require('boom');

const server = new Hapi.Server();
const secretKey = config.get('secretKey');

// dummy user
// Use DB connection instead of dummyUser in production.
const dummyUser = {
  id: '1',
  name: 'hoge',
  pass: 'hoge',
  mail: 'hoge@mail.jp'
};


// Connect the server
server.connection({
  host: config.get('host'),
  port: normalizePort(process.env.PORT || '3000')
});


// template engine
server.register(vision, err => {
  if (err) {
    throw err;
  }

  return server.views({
    engines: {
      html: handlebars
    },
    relativeTo: __dirname,
    path: './public'
  });
});


// serving static files and directories
server.register(inert, err => {
  if (err) {
    throw err;
  }
});


// routing
server.route([
  {
    path: '/assets/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path: 'public/assets'
      }
    }
  },
  {
    path: '/{param*}',
    method: 'GET',
    handler: (request, reply) => {
      reply.view('index', { title: 'jwt-react-redux-auth-boilerplate' });
    }
  },
  {
    path: '/api/login/',
    method: 'POST',
    handler: (request, reply) => {
      const name = request.payload.name;
      const pass = request.payload.pass;

      // Use DB connection instead of dummyUser in production.
      if (dummyUser.name === name && dummyUser.pass === pass) {
        const jsonWebToken = jwt.sign({
          id: dummyUser.id,
          mail: dummyUser.mail
        }, secretKey);

        return reply([Object.assign({}, dummyUser, { jsonWebToken })]);
      }

      const err = Boom.badImplementation('name or password is not found', {
        message: '入力されたユーザー名やパスワードが正しくありません。確認してからやりなおしてください。'
      });
      err.output.payload = Object.assign({}, err.output.payload, err.data);

      return reply(err);
    }
  },
  {
    path: '/api/login/',
    method: 'GET',
    handler: (request, reply) => {
      const jsonWebToken = request.headers.authorization.split(' ')[1];

      jwt.verify(jsonWebToken, secretKey, (err, decode) => {
        if (err) {
          return reply(Boom.badImplementation(String(err)));
        }

        // Use DB connection instead of dummyUser in production.
        if (dummyUser.id === decode.id) {
          return reply(dummyUser);
        }

        return reply(Boom.badImplementation('User is not found'));
      });
    }
  }
]);


// Start the server
server.start(err => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
