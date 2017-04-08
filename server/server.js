const path = require('path');
const winston = require('winston');
const helmet = require('helmet');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(helmet());

/**
 * Installs routes that serve production-bundled client-side assets.
 * It is set up to allow for HTML5 mode routing (404 -> /dist/index.html).
 * This should be the last router in your express server's chain.
 */
const distPath = path.join(__dirname, '../dist');
const indexFileName = 'index.html';

app.use(express.static(distPath));

app.get('*', (req, res) => res.sendFile(path.join(distPath, indexFileName)));

app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${PORT}`);
});

