/* eslint-disable */
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const port = 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const httpsOptions = {
  key: fs.readFileSync('./https-certs/localhost-key.pem'),
  cert: fs.readFileSync('./https-certs/localhost.pem')
}

const devProxy = {
  '/api': {
    target: 'http://localhost:8080',
    ws: true
  }
}

app.prepare().then(() => {
  const xp = express();

  if (dev) {
    Object.keys(devProxy).forEach(function (context) {
      xp.use(context, createProxyMiddleware(devProxy[context]))
    })
  }

  xp.all('*', (req, res) => handle(req, res))

  createServer(httpsOptions, xp).listen(port, (err) => {
    if (err) throw err
    console.log('ready - started server on url: https://localhost:' + port)
  })
})
