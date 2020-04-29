//引入第三方包
const mysql      = require('mysql');
//设置连接
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});

//打开连接
connection.connect();
 
//回调函数的版本，但是我们一般不怎么做,我们一般是使用的Prommise的方式，当然你也可以使用async的方式来获取异步的查询结果，看你喜好
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
