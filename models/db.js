const mongoose = require('mongoose')
//// 连接mongodb
//mongoose.connect('mongodb://localhost/blog') //test是数据库名称
//// 实例化连接对象
//const db = mongoose.connection
//db.on('error', console.error.bind(console, '连接错误：'))
//db.once('open', (callback) => {
// console.log('MongoDB连接成功！！')
//})



//	建立数据库的连接状态
let db = mongoose.connect('mongodb://localhost/blog');
mongoose.connection.on('open',err=>{
	if (!err) {
		console.log('----数据库连接成功！----');
	}
})