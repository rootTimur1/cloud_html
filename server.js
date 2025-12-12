// server.js - Простой сервер для main.html
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - Запрос: ${req.method} ${req.url}`);

  // Если запрос к корню или к main.html
  if (req.url === '/' || req.url === '/main.html') {
    const filePath = path.join(__dirname, 'main.html');

    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // Если файл не найден, создаем его с вашим HTML
          const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>test</title>
</head>
<body>
    <h1>Hello! test</h1>
</body>
</html>`;

          fs.writeFile(filePath, defaultHtml, (writeErr) => {
            if (writeErr) {
              res.writeHead(500);
              res.end('Error creating main.html');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(defaultHtml);
            }
          });
        } else {
          res.writeHead(500);
          res.end('Server Error');
        }
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache'
        });
        res.end(content);
      }
    });
  } else {
    // Для других маршрутов показываем 404 или редирект
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Redirecting...</title>
                <meta http-equiv="refresh" content="2;url=/">
            </head>
            <body>
                <h1>Page not found</h1>
                <p>Redirecting to main page in 2 seconds...</p>
                <p><a href="/">Click here</a> to go immediately</p>
            </body>
            </html>
        `);
  }
});

server.listen(PORT, () => {
  console.log(`
    ====================================
    Сервер запущен!
    ====================================
    Откройте в браузере: http://localhost:${PORT}
    Файл: main.html
    ====================================
    Нажмите Ctrl+C для остановки сервера
    ====================================
    `);
});

// Обработка завершения работы
process.on('SIGINT', () => {
  console.log('\nСервер остановлен');
  process.exit(0);
});