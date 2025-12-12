// server.js - Простой сервер
const http = require('https://');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`Запрос: ${req.method} ${req.url}`);

  // Всегда показываем приветственную страницу
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test</title>
</head>
<body>
    <h1>Hello! test</h1>
</body>
</html>`;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlContent);
});

server.listen(PORT, () => {
  console.log(`
====================================
Сервер запущен!
====================================
Откройте в браузере: http://localhost:${PORT}
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