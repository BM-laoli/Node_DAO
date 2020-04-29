const Mysql =  require('./02_通用的查询模型');


//开始实现具体的查询Model

module.exports = class Article extends Mysql {
    /**
     * 描述 查询所有的列表，这里是SQL的具体的实现方法
     * @date 2020-04-29
     * @returns {any} 返回值是查询出来的数据对象
     */
    static getList() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,`time`,thumbnail FROM article ORDER BY TIME DESC'
            this.query(sql).then(results => {//调用父类的查询方式
                resolve(results)
            }).catch(err => {
                console.log(`获取文章列表失败：${err.message}`)
                reject(err)
            })
        })
    }

   /**
     * 获取指定文章的详情
     * @param {integer} id 文章编号
     */
    static getArticleById(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT a.id,a.title,a.content,a.`time`,a.hits,a.`category_id`,c.`name`,a.`thumbnail`,a.`hot` FROM article a,category c WHERE a.`category_id` = c.`id` AND a.id = ?'
            this.query(sql, id).then(results => {//调用父类的查询方式
                resolve(results[0])
            }).catch(err => {
                console.log(`获取指定文章的详情失败：${err.message}`)
                reject(err)
            })
        })
    }
    
}