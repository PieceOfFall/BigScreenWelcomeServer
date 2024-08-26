// 引入express模块
const express = require('express');

// 创建一个express应用
const app = express();

// 解析JSON格式的请求体
app.use(express.json());

// 设置一个GET请求，响应一个简单的消息
app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

// 设置一个POST请求，接受JSON数据并返回
app.post('/data', (req, res) => {
  const receivedData = req.body; // 获取请求体中的数据
  res.json({
    message: 'Data received successfully!',
    data: receivedData
  });
});

// 设置服务器监听的端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
