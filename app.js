const express = require('express');
const fs = require('fs');

const app = express();
app.all('*', function (_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.use(express.json());



app.get('/programs', (_req, res) => {
    const ret = fs.readFileSync('data.json','utf8');
    res.status(200).send(ret);
});

app.get('/get',(_req,res)=>{
  const dataJson = fs.readFileSync('data.json','utf8');
  const data = JSON.parse(dataJson);

  const currentProgram = data["programs"]
  .filter(e=>e.name === data["active"]) [0]
  
  res.status(200).send(currentProgram);
})

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
