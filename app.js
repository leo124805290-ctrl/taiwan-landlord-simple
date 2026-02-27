// 超級簡單版本 - 100% 能成功
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// 健康檢查
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: '台灣房東系統 API 正在運行！',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 測試端點
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API 測試成功！',
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
  console.log(`🌐 訪問地址: http://localhost:${port}`);
  console.log(`✅ 健康檢查: http://localhost:${port}/health`);
  console.log(`🧪 API 測試: http://localhost:${port}/api/test`);
});