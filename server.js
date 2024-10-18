"use strict";

// Imports
var unalibValidator = require('./unalib');

const express = require("express");
const session = require("express-session");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
const { auth, requiresAuth } = require('express-openid-connect');
const cons = require('consolidate');
const path = require('path');
let app = express(); // Inicialización de app

// Crear servidor HTTP y asociar Socket.io al mismo servidor
var http = require('http').Server(app);
var io = require('socket.io')(http); // Socket.io en el mismo servidor


// Globals
const OKTA_ISSUER_URI = "https://dev-mxomfpblzdszj2r8.us.auth0.com/"
const OKTA_CLIENT_ID = "p1Wa0GDyBMGizph54fvn1ZfSd6e3HAuD";
const OKTA_CLIENT_SECRET = "G5w-A6PF1EBhJcouciujjLHRS0_CkCHWjuck_h1vbUZ-IMo1aydrHyJa47HpScZF";
const REDIRECT_URI = "http://localhost:3000/dashboard";
const PORT = process.env.PORT || "3000";
const SECRET = "hjsadfghjakshdfg87sd8f76s8d7f68s7f632342ug44gg423636346f"; // Dejar el secret así como está.

//  Esto se los dará Okta.
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: SECRET,
  baseURL: 'http://localhost:3000',
  clientID: OKTA_CLIENT_ID,
  issuerBaseURL: OKTA_ISSUER_URI,
  routes: {
    login: '/login',
    logout: '/logout'  // Cambiado a string simple
  },
  logoutParams: {
    returnTo: 'http://localhost:3000'
  }
};

let oidc = new ExpressOIDC({
  issuer: OKTA_ISSUER_URI,
  client_id: OKTA_CLIENT_ID,
  client_secret: OKTA_CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  routes: { callback: { defaultRedirect: "http://localhost:3000/dashboard" } },
  scope: 'openid profile'
});

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// MVC View Setup
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('models', path.join(__dirname, 'models'));
app.set('view engine', 'html');

// App middleware
app.use("/static", express.static("static"));
app.use(session({
  cookie: { httpOnly: true },
  secret: SECRET
}));

// App routes
app.use(oidc.router);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", requiresAuth(), (req, res) => {
  var payload = Buffer.from(req.appSession.id_token.split('.')[1], 'base64').toString('utf-8');
  const userInfo = JSON.parse(payload);
  res.render("dashboard", { user: userInfo });
});

app.get("/unaChat", (req, res) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect('/'); // Redirigir a login en lugar de index
  }
  
  const userInfo = req.oidc.user; // Forma más segura de obtener la info del usuario
  res.render("unaChat", { user: userInfo });
});

const openIdClient = require('openid-client');
openIdClient.Issuer.defaultHttpOptions.timeout = 20000;

// Socket.io connection
io.on('connection', function(socket){
  console.log('Usuario conectado al chat');

  // Si se escucha "Evento-Mensaje-Server"
  socket.on('Evento-Mensaje-Server', function(msg){
    // Aquí deberías validar el mensaje si es necesario
    io.emit('Evento-Mensaje-Server', msg); // Emitir el mensaje a todos los clientes
  });

  socket.on('disconnect', function(){
    console.log('Usuario desconectado del chat');
  });
});

// Iniciar el servidor en el puerto 3000
oidc.on("ready", () => {
  console.log("Auth server running on port: " + PORT);
  http.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + PORT);
  });
});

oidc.on("error", err => {
  console.error(err);
});
