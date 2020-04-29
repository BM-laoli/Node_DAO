const mysql = require('mysql')

/**
 * 数据模型的基类
 * 封装了数据库操作
 */
module.exports = class Model {
    // 连接对象
    static conn = null

    /**
     * 初始化数据连接操作
     */
    static connection() {
        Model.conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '123',
            database: 'blog'
        })
        Model.conn.connect(err => {
            if (err) {
                console.log(`数据库连接失败：${err.message}`)
            }
        })
    }

    /**
     * 关闭数据库连接,注意，你需要及时的关闭查询数据流，比秒消耗性能
     */
    static end() {
        if (null != Model.conn) {
            Model.conn.end()
        }
    }

    /**
     * 通用查询方法
     * @param {string} sql 要执行的SQL语句
     * @param {Array} params 给SQL语句的占位符,以后由具体的Model决定具体的传入参数
     */
    static query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection()//调用连接
            //开始查询
            Model.conn.query(sql, params, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                
                }
            })
            //关闭流
            this.end()
        })
    }
}