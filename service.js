const db = require("./mysql")
const jwt = require("./jwt")
const dayjs = require("dayjs")

//登录验证
exports.checkUser = (req, res) => {
  let info = req.body;
  let data = [info.name, info.name, info.password]
  let sql = "select user_id from user where user_name=? and (select count(*) from user where user_name=? and user_password=?) = 1";
  db.base(sql, data, result => {
    if (result[0] != undefined) {
      let userId = result[0].user_id
      let jwtId = jwt.createToken({ "userId": userId })
      if (userId != '') {
        res.json({
          code: 201,
          msg: "登陆成功！",
          token: jwtId
        })
      } else {
        return res.json({
          code: 507,
          msg: "账号或密码错误！"
        })
      }
    }else {
      return res.json({
        code: 507,
        msg: "账号或密码错误！"
      })
    }
  })
}

//获取个人信息
exports.getUserInfo = (req, res) => {
  let data = ''
  let token = req.headers.authorzation
  jwt.checkToken(token).then(resData => {
    data = resData.userId
    let sql = "select * from user where user_id=?"
    db.base(sql, data, result => {
      let call = result[0].user_call
      if (call != "") {
        res.json({
          code: 201,
          msg: "获取成功！",
          data: result[0]
        })
      } else {
        return res.json({
          code: 507,
          msg: "服务器错误！"
        })
      }
    })
  }).catch((err) => {
    console.log(err)
    return res.json({
      code: 507,
      msg: "服务器错误！"
    })
  })
}

//获取所有的用户信息
exports.getUser = (req, res) => {
  let data = ''
  let sql = "select * from user"
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "获取成功！",
      data: result
    })
  })
}

//添加用户
exports.addUser = (req, res) => {
  let data = req.body
  let sql = "insert into user set ?,user_state=1"
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "添加成功",
      result
    })
  })
}

//删除用户
exports.deleteUser = (req, res) => {
  let data = req.body.user_id
  let sql = "delete from user where user_id = ?"
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "删除成功",
      result
    })
  })
}

//批量删除用户
exports.batchDeleteUser = (req, res) => {
  let data = req.body;
  let sql = "delete from user where user_id in("
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      sql = sql + "?"
    } else {
      sql = sql + ",?"
    }
  }
  sql = sql + ");"
  db.base(sql, data, result => {
    if (result.affectedRows == data.length) {
      res.json({
        code: 201,
        msg: "删除成功"
      })
    } else {
      res.json({
        code: 500,
        msg: "删除失败"
      })
    }
  });
};

//编辑用户信息
exports.editUser = (req, res) => {
  let info = req.body
  let data = [info.user_name, info.user_password, info.user_phone, info.user_call, info.user_id]
  let sql = "update user set user_name = ?,user_password = ?,user_phone = ?,user_call = ? where user_id = ?";
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "编辑成功"
    })
  });
};

//改变用户状态
exports.changeState = (req, res) => {
  let info = req.body
  let data = [info.user_state, info.user_id]
  let sql = "update user set user_state = ? where user_id = ?";
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "编辑成功"
    })
  });
};

//获取所有的会员信息
exports.getMember = (req, res) => {
  let data = ''
  let sql = "select * from member where member_id != 0";
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "获取成功！",
      data: result
    });
  });
};

//添加会员
exports.addMember = (req, res) => {
  let data = req.body
  let sql = "insert into member set ?,create_time = now()";
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "添加成功",
      result
    })
  });
};

//删除会员
exports.deleteMember = (req, res) => {
  let data = req.body.member_id
  let sql = "delete from member where member_id = ?"
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "删除成功",
      result
    })
  })
}

//批量删除会员
exports.batchDeleteMember = (req, res) => {
  let data = req.body;
  let sql = "delete from member where member_id in("
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      sql = sql + "?"
    } else {
      sql = sql + ",?"
    }
  }
  sql = sql + ");"
  db.base(sql, data, result => {
    if (result.affectedRows == data.length) {
      res.json({
        code: 201,
        msg: "删除成功"
      })
    } else {
      res.json({
        code: 500,
        msg: "删除失败"
      })
    }
  })
}

//编辑会员信息
exports.editMember = (req, res) => {
  let info = req.body
  let data = [info.member_name, info.phone, info.member_id]
  let sql = "update member set member_name = ?,phone = ? where member_id = ?";
  db.base(sql, data, result => {
    console.log('编辑成功')
    res.json({
      code: 201,
      msg: "编辑成功"
    })
  });
};

//会员充值
exports.memberRecharge = (req, res) => {
  let info = req.body
  let data = [info.balance + parseInt(info.recharge), info.member_id]
  let sql = "update member set balance = ? where member_id = ?";
  db.base(sql, data, result => {
    console.log('充值成功')
    res.json({
      code: 201,
      msg: "充值成功"
    })
  });
};

//生成充值记录
exports.setRecharge = (req, res) => {
  let info = req.body
  let data = [info.member_id, parseInt(info.recharge)]
  let sql = "insert into recharge set member_id = ?,recharge_money = ?,recharge_time = now()";
  db.base(sql, data, result => {
    return result
  });
};

//获取所有分区信息
let zoneInfo
exports.getZone = (req, res) => {
  let data = ''
  let sql = "select * from zone"
  db.base(sql, data, result => {
    zoneInfo = result
    res.json({
      code: 201,
      msg: "获取成功！",
      data: result
    })
  })
}

//添加分区
exports.addZone = (req, res) => {
  let data = req.body
  let sql = "insert into zone set ?"
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "添加成功",
      result
    })
  })
}

//删除分区
exports.deleteZone = (req, res) => {
  let data = req.body.zone_id
  let sql = "delete from zone where zone_id = ?"
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "删除成功",
      result
    })
  })
}

//编辑分区信息
exports.editZone = (req, res) => {
  let info = req.body
  let data = [info.zone_name, info.zone_money, info.zone_id]
  let sql = "update zone set zone_name = ?,zone_money = ? where zone_id = ?"
  db.base(sql, data, result => {
    console.log('编辑成功')
    res.json({
      code: 201,
      msg: "编辑成功"
    })
  })
}

//获取所有球桌信息
exports.getTable = (req, res) => {
  let data = ''
  let sql = "select * from pool_table"
  db.base(sql, data, result => {
    zoneInfo.map((items, indexs) => {
      items.tableInfo = []
      result.map((item, index) => {
        if(items.zone_id == item.zone_id) {
          item = JSON.stringify(item)
          item = JSON.parse(item)
          items.tableInfo.push(item)
        }
      })
    })
    res.json({
      code: 201,
      msg: "获取成功！",
      data: zoneInfo
    })
  })
}

//添加一个球桌
exports.addTable = (req, res) => {
  let data = req.body.zone_id
  let sql = "insert into pool_table set zone_id = ?,state = 0";
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "添加成功！"
    })
  })
}

//删除某个球桌
exports.deleteTable = (req, res) => {
  let data = req.body.table_id
  let sql = "delete from pool_table where table_id = ?"
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "删除成功！"
    })
  })
}

//球桌开始计时
exports.startTable = (req, res) => {
  let info = req.body
  let data = [info.state, info.table_id]
  let sql = "update pool_table set state = ?,start_time = now() where table_id = ?";
  db.base(sql, data, result => {
    console.log('开始计时')
    res.json({
      code: 201,
      msg: "开始计时"
    })
  });
};

//球桌结束计时
exports.stopTable = (req, res) => {
  let info = req.body
  let data = [info.state, info.table_id]
  let sql = "update pool_table set state = ?,start_time = null where table_id = ?";
  db.base(sql, data, result => {
    console.log('停止计时')
    res.json({
      code: 201,
      msg: "停止计时"
    })
  });
};

//会员用户扣费
exports.memberConsume = (req, res) => {
  let info = req.body
  let data = [info.consume_money, info.member_id]
  let sql = "update member set balance = balance - ? where member_id = ?";
  db.base(sql, data, result => {
    console.log('扣费成功')
  });
};

//生成消费记录
exports.setConsume = (req, res) => {
  let info = req.body
  let data = [info.member_id, info.consume_money, info.start_time, info.keep_time, info.table_id, info.zone_id]
  let sql = "insert into consume set member_id = ?,consume_money = ?,start_time = ?,stop_time = now(),keep_time = ?,table_id = ?,zone_id = ?";
  db.base(sql, data, result => {
    return result
  });
};

//获取所有消费信息
exports.getConsume = (req, res) => {
  let data = ''
  let sql = "select * from consume";
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "获取成功！",
      data: result
    });
  });
};

//删除单条消费记录
exports.deleteConsume = (req, res) => {
  let data = req.body.consume_id
  let sql = "delete from consume where consume_id = ?";
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "删除成功",
      result
    })
  });
};

//批量删除消费记录
exports.batchDeleteConsume = (req, res) => {
  let data = req.body;
  let sql = "delete from consume where consume_id in("
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      sql = sql + "?"
    } else {
      sql = sql + ",?"
    }
  }
  sql = sql + ");"
  db.base(sql, data, result => {
    if (result.affectedRows == data.length) {
      res.json({
        code: 201,
        msg: "删除成功"
      })
    } else {
      res.json({
        code: 500,
        msg: "删除失败"
      })
    }
  });
};

//获取所有充值信息
exports.getRecharge = (req, res) => {
  let data = ''
  let sql = "select * from recharge";
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "获取成功！",
      data: result
    });
  });
};

//删除单条充值记录
exports.deleteRecharge = (req, res) => {
  let data = req.body.recharge_id
  let sql = "delete from recharge where recharge_id = ?"
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "删除成功",
      result
    })
  })
}

//批量删除充值记录
exports.batchDeleteRecharge = (req, res) => {
  let data = req.body
  let sql = "delete from recharge where recharge_id in("
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      sql = sql + "?"
    } else {
      sql = sql + ",?"
    }
  }
  sql = sql + ");"
  db.base(sql, data, result => {
    if (result.affectedRows == data.length) {
      res.json({
        code: 201,
        msg: "删除成功"
      })
    } else {
      res.json({
        code: 500,
        msg: "删除失败"
      })
    }
  })
}

//获取近半年每个月的营业额
exports.getTurnover = (req, res) => {
  let sql = "SELECT date_format( start_time, '%Y-%m' ) month,sum( consume_money ) turnover FROM consume WHERE start_time BETWEEN date_sub( LAST_DAY( CURDATE() ), INTERVAL 6 MONTH ) AND now() GROUP BY month ORDER BY month ASC";
  db.base(sql, null, result => {
    const turnoverList = []
    let now = dayjs()
    for (let i = 0; i < 6; i++) {
      let nowStr = now.format('YYYY-MM')
      let turnover = result.find(item => item.month === nowStr)
      turnoverList.unshift(turnover || { month: nowStr, turnover: 0 })
      now = now.subtract(1, 'M')
    }
    res.json({
      code: 201,
      msg: "获取成功！",
      data: turnoverList
    })
  })
}

//获取每个球桌使用的总时长
exports.getDuration = (req, res) => {
  let data = ''
  let sql = "select table_id, sum(keep_time)sum_time from `consume` group by table_id order by table_id asc";
  db.base(sql, data, result => {
    res.json({
      code: 201,
      msg: "获取成功！",
      data: result
    });
  });
};

//获取近半年每个月办理会员的人数
exports.getAddmun = (req, res) => {
  let data = ''
  let sql = "SELECT date_format( create_time, '%Y-%m' ) month,COUNT( member_id ) number FROM member WHERE create_time BETWEEN date_sub( LAST_DAY( CURDATE() ), INTERVAL 6 MONTH ) AND now() GROUP BY month ORDER BY month ASC"
  db.base(sql, data, result => {
    const addmun = []
    let now = dayjs()
    for (let i = 0; i < 6; i++) {
      let nowStr = now.format('YYYY-MM')
      let number = result.find(item => item.month === nowStr)
      addmun.unshift(number || { month: nowStr, number: 0 })
      now = now.subtract(1, 'M')
    }
    res.json({
      code: 201,
      msg: "获取成功！",
      data: addmun
    });
  });
};

//获取近半年每个月会员充值总和
exports.getInmoney = (req, res) => {
  let data = ''
  let sql = "SELECT date_format( recharge_time, '%Y-%m' ) month,sum(recharge_money)sum_money FROM recharge WHERE recharge_time BETWEEN date_sub( LAST_DAY( CURDATE() ), INTERVAL 6 MONTH ) AND now() GROUP BY month ORDER BY month ASC"
  db.base(sql, data, result => {
    const inmoney = []
    let now = dayjs()
    for (let i = 0; i < 6; i++) {
      let nowStr = now.format('YYYY-MM')
      let sum_money = result.find(item => item.month === nowStr)
      inmoney.unshift(sum_money || { month: nowStr, sum_money: 0 })
      now = now.subtract(1, 'M')
    }
    res.json({
      code: 201,
      msg: "获取成功！",
      data: inmoney
    });
  });
};
