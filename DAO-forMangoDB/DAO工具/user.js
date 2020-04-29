//示例话具体的表（集合）操作对象
const MongoDB =  require('./DAO/MongoDBHandler');
//实例化dao层,并且给它指定的表
setCollection =  new MongoDB('setCollection')

module.exports =  class User{
    static getUser(queryMD){
        return new Promise((resolve,reject)=>{
            setCollection.insertOne(queryMD,(err,result)=>{
                if(result){
                    resolve(result)
                }else{  
                    reject(err)
                }
            })
        })
    }
    static updataMany(queryMD){
        return new Promise((resolve,reject)=>{
            setCollection.updataMany(queryMD,(err,result)=>{
                if(result){
                    resolve(result)
                }else{  
                    reject(err)
                }
            })
        })
    }

}