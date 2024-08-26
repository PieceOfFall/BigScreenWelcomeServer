// 引入express模块
const express = require('express');
const fs = require('fs');

// 创建一个express应用
const app = express();

// 解析JSON格式的请求体
app.use(express.json());

// 设置一个GET请求，响应一个简单的消息
app.get('/get', (_, res) => {
    const ret = fs.readFileSync('data.json','utf8');
    
    res.status(200).send(ret)
});

// 设置一个POST请求，接受JSON数据并返回
app.post('/set', (req, res) => {
  const data = req.body; 

  const jsonData = JSON.stringify(data, null, 2); 
  fs.writeFileSync('data.json', jsonData, 'utf8');

  res.status(201).json({
    message: 'Data received successfully!',
    data
  });
});

// 设置服务器监听的端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

