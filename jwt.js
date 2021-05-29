const jwt = require('jsonwebtoken');
const screat = toString(Math.floor(Math.random()*10000));

function createToken(payload){
	//产生token
	//可加其他字段
	return jwt.sign(payload,screat,{expiresIn: '12h'})   //设置过期时间12h
}

//验证token
function checkToken(token){
	return new Promise((resolve,reject)=>{
		jwt.verify(token,screat,(err,data)=>{
			if (err) {
				reject('token 验证失败')
			} else {
				resolve(data)
			}
		})
	})
}
 
module.exports={
	createToken,checkToken
}

