// 顯示網址的版本
const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 3001;

// 健康檢查 - 顯示網址信息
app.get('/health', (req, res) => {
  const hostname = os.hostname();
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  
  res.json({
    status: 'healthy',
    message: '台灣房東系統 API 正在運行！',
    server_info: {
      hostname: hostname,
      public_url: `${protocol}://${host}`,
      server_time: new Date().toISOString(),
      node_version: process.version,
      platform: process.platform
    },
    endpoints: {
      health: '/health',
      test: '/api/test',
      info: '/api/info'
    },
    version: '1.0.0'
  });
});

// 顯示詳細信息
app.get('/api/info', (req, res) => {
  const fullUrl = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  
  res.json({
    success: true,
    data: {
      request: {
        method: req.method,
        url: req.url,
        full_url: fullUrl,
        headers: {
          host: req.headers.host,
          'x-forwarded-host': req.headers['x-forwarded-host'],
          'x-forwarded-proto': req.headers['x-forwarded-proto']
        }
      },
      server: {
        hostname: os.hostname(),
        port: port,
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime()
      },
      zeabur_info: '如果你的網址包含 .zeabur.app，這就是你的公開網址'
    }
  });
});

// 測試端點
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API 測試成功！',
    tip: '訪問 /api/info 查看你的公開網址',
    data: {
      server: '台灣房東-越南租客系統',
      time: new Date().toISOString(),
      ready: true
    }
  });
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`🚀 伺服器啟動成功！`);
  console.log(`🌐 內部網址: http://localhost:${port}`);
  console.log(`✅ 健康檢查: http://localhost:${port}/health`);
  console.log(`📋 網址信息: http://localhost:${port}/api/info`);
  console.log(`\n💡 提示：在 Zeabur 中，你的公開網址會顯示在專案頁面`);
  console.log(`   訪問 /api/info 可以查看請求的完整網址`);
});