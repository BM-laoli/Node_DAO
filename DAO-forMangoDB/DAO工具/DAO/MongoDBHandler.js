module.exports =  class MongoDB {
    //构造器
    constructor(collectionName) {
        this.MongoClient = require('mongodb').MongoClient;
        this.url =  "mongodb://root:root@localhost/";
        this.dbName = "blogs_2node_kaifa";
        //由于我们的表设计到了多表的操作，所以表（集合）是要变来变去的，所以这里改成由具体的实现传入

        //具体的操作是那项表交与用户具体实现，
        this.collection = collectionName;
    }

    //不要加入static ，如果加入就变成静态的了，实例的对象就用不了这些静态的方法了

    //链接
     connect(url,callback){
        if (!url) {
            return;
        }
        this.MongoClient.connect(url, function(err, db) {
                callback(err, db);
                db.close();//关闭流
        });
    }

     /**
      * 描述 插入单条数据
      * @date 2020-04-29
      * @param {any} oneObj
      * @param {any} callback
      * @returns {any}
      */
     insertOne(oneObj, callback) {
        let dbName = this.dbName;
        let collection = this.collection;
        console.log('this.d');
        this.connect(this.url, function(err, db) {
            var client = db.db(dbName);
            client.collection(collection).insertOne(oneObj, function(err, res) {
                if (err) throw err;
                if (callback) {
                    callback(err, res);
                }
            });
        });
    }

    /**
     * 描述 增加多条数据
     * @date 2020-04-29
     * @param {any} objs
     * @param {any} callback
     * @returns {any}
     */
    insertMany(objs, callback) {
        if (!Array.isArray(objs)) {
            throw new Error("非数组，类型不匹配!");
            return;
        }
        let dbName = this.dbName;
        let collection = this.collection;
        this.connect(this.url, function(err, db) {
            var client = db.db(dbName);
            client.collection(collection).insertMany(objs, function(err, res) {
                if (err) throw err;
                if (callback) {
                    callback(err, res);
                }
            });
        });
    }

    
    /**
     * 描述 查询操作
     * @date 2020-04-29
     * @param {any} whereStr
     * @param {any} callback
     * @returns {any}
     */
    find (whereStr, callback) {
        let dbName = this.dbName;
        let collection = this.collection;
        this.connect(this.url, function(err, db) {
            if (err) throw err;
            var client = db.db(dbName);
            //开始传入指定的查询条件
            client.collection(collection).find(whereStr).toArray(function(err, result) {
                if (err) throw err;
                if (callback) {
                    callback(err, result);
                }
            });
        });
    }


    /**
     * 描述 移出操作
     * @date 2020-04-29
     * @param {any} whereStr
     * @param {any} callback
     * @returns {any}
     */
    remove(whereStr, callback) {
        let dbName = this.dbName;
        let collection = this.collection;
        this.connect(this.url, function(err, db) {
            if (err) throw err;
            console.log("移除成功");
            var client = db.db(dbName);
            client.collection(collection).remove(whereStr, function(err, result) {
                if (err) throw err;
                console.log(result);
                if (callback) {
                    callback(err, result);
                }
            });
        });
    }


    /**
     * 描述 更新一条数据
     * @date 2020-04-29
     * @param {any} query
     * @param {any} updateData
     * @returns {any}
     */
    updateOne(query, updateData, callback) {
        let dbName = this.dbName;
        let collection = this.collection;
        this.connect(this.url, function(err, db) {
            if (err) throw err;
            var client = db.db(dbName);
            client.collection(collection).updateOne(query, updateData, function(err, result) {
                if (err) throw err;
                if (callback) {
                    callback(err, result);
                }
            });
        });
    }

    
    /**
     * 描述 更新多条数据
     * @date 2020-04-29
     * @param {any} query
     * @param {any} updateData
     * @returns {any}
     */
    updateMany(query, updateData, callback) {
        let dbName = this.dbName;
        let collection = this.collection;
        this.connect(this.url, function(err, db) {
            if (err) throw err;
            var client = db.db(dbName);
            client.collection(collection).updateMany(query, updateData, function(err, result) {
                if (err) throw err;
                if (callback) {
                    callback(err, result);
                }
            });
        });
    }
    

}

