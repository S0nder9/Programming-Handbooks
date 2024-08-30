// Глава 8: Отладка и тестирование JWT
// Подглава 8.3: Логирование и мониторинг JWT

// Логирование и отслеживание использования JWT (JSON Web Tokens) является важной частью обеспечения безопасности и отладки веб-приложений.
// В этой подглаве мы рассмотрим методы логирования и мониторинга JWT, а также инструменты, которые помогут вам в этом.

// Логирование использования JWT:
// 1. Логирование токенов
// Логирование информации о JWT позволяет отслеживать запросы и выявлять возможные проблемы. Важно помнить, что хранение полных токенов в логах может быть небезопасным.
// Вместо этого лучше логировать информацию о токене, такую как время создания, время истечения и идентификатор пользователя.
const jwt = require('jsonwebtoken');

app.use((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      console.log(`Token valid for user: ${decoded.userId}`);
    } catch (err) {
      console.error('Token verification failed:', err);
    }
  }
  next();
});

// 2. Логирование ошибок
// Логирование ошибок, связанных с JWT, может помочь в диагностике проблем с аутентификацией и авторизацией.
app.use((err, req, res, next) => {
  if (err.name === 'JsonWebTokenError') {
    console.error('JWT Error:', err.message);
    res.status(401).send('Invalid Token');
  } else {
    next(err);
  }
});

// Инструменты для мониторинга и анализа JWT в производственной среде:
// 1. Системы мониторинга
// Использование систем мониторинга, таких как Prometheus или Grafana, позволяет отслеживать метрики, связанные с JWT, например, количество успешных и неудачных аутентификаций.
const prometheus = require('prom-client');
const jwtErrors = new prometheus.Counter({
  name: 'jwt_errors_total',
  help: 'Total number of JWT errors',
});

app.use((err, req, res, next) => {
  if (err.name === 'JsonWebTokenError') {
    jwtErrors.inc();
    next(err);
  } else {
    next(err);
  }
});

// 2. Логирование в облаке
// Облачные платформы, такие как AWS CloudWatch или Azure Monitor, предлагают возможности для централизованного логирования и анализа.
// Это позволяет собирать логи из различных источников и анализировать их в одном месте.
const cloudwatch = require('aws-sdk/clients/cloudwatchlogs');
const cloudwatchLogs = new cloudwatch({ region: 'your-region' });

const logStreamName = 'your-log-stream';
const logGroupName = 'your-log-group';

app.use((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    cloudwatchLogs.putLogEvents({
      logGroupName,
      logStreamName,
      logEvents: [
        {
          message: `Token used: ${token}`,
          timestamp: Date.now(),
        },
      ],
    }, (err) => {
      if (err) {
        console.error('Failed to log to CloudWatch:', err);
      }
    });
  }
  next();
});

// 3. Анализ логов
// Для анализа логов можно использовать инструменты, такие как ELK Stack (Elasticsearch, Logstash, Kibana) или Splunk.
// Они позволяют выполнять сложные запросы и визуализировать данные для получения инсайтов.
const { Client } = require('@elastic/elasticsearch');
const elasticClient = new Client({ node: 'http://localhost:9200' });

app.use((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    elasticClient.index({
      index: 'jwt-logs',
      body: {
        message: `Token used: ${token}`,
        timestamp: new Date(),
      },
    }, (err) => {
      if (err) {
        console.error('Failed to log to Elasticsearch:', err);
      }
    });
  }
  next();
});

// Итог:
// Логирование и мониторинг JWT помогают обеспечить безопасность приложения, позволяя отслеживать использование токенов и выявлять проблемы.
// Используйте различные инструменты для эффективного мониторинга и анализа, чтобы поддерживать производственные системы в рабочем состоянии.
