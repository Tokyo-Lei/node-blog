var crypto = require('crypto'),
	User = require('../models/user.js');

module.exports = (app) => {
	//主页
	app.get('/', (req, res) => {

		res.render('index.html', {
			title: '主页',
			urls: req.url
		});
	});
	//注册
	app.get('/reg', function(req, res) {
		res.render('reg.html', {
			title: '注册',
			urls: req.url
		});
	});

	//注册提交
	app.post('/reg', (req, res, next) => {

		//console.log('post来了');
		
		let name = req.body.user_name,
			password = req.body.user_password,
			password_repeat = req.body['user_password_repeat'],
			email = req.body.user_email;
			
			
		if(password_repeat != password) {
			req.flash('error', '两次输入的密码不一致!');
			res.render('reg.html', {
				error: req.flash('error')
			});
			return res.end('/reg');
		}

        //生成密码的 md5 值
        let md5 = crypto.createHash('md5');
        password = md5.update(req.body.user_password).digest('hex');

        //console.log(password);
        
        

		//console.log(name+password+password_repeat+email);
//		return res.redirect('/login');
        return res.redirect('/');
		next();
	});

	//登录
	app.get('/login', function(req, res) {
		res.render('login.html', {
			title: '登录',
			urls: req.url
		});
	});
	//登录提交
	app.post('/login', function(req, res) {});
	//文章发表页
	app.get('/post', function(req, res) {
		res.render('post.html', {
			title: '发表'
		});
	});
	//文章发表
	app.post('/post', function(req, res) {});
	//退出
	app.get('/logout.html', function(req, res) {});

};