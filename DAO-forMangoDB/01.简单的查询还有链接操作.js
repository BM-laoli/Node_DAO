const mongoose =  require('mongoose');

//mongoose的链接是一个异步的操作，返回的是一个promise对象,注意：由于我这里设置了数据的密码。所以你需要这样的来配置
mongoose.connect('mongodb://root:root@localhost/playground?authSource=admin', { useNewUrlParser: true })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'));

// 注意一下，我们的数据库的插入还有操作是另外的处理，逻辑这里我们只来学习一下如何封装这个DAO层
// 增
// 对于增加来说 1.设计集合规则，2.使用集合规则创建集合（这个集合其实就相当于表），向集合里面丢东西（这个就是表里面的字段）
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});//构建规则

//创建集合（表）
const Course = mongoose.model('Course', courseSchema); 

//插入数据
Course.create({name: 'Node基础', author: '老李', isPublish: true})
     .then(doc => console.log(doc))//如果插入成功数据库会给你放回这个数据
     .catch(err => console.log(err))

// 删，删除的语法也非常的简单，如果不加{}参数就表示删除{}表示的删除指定的匹配数据项目
 // 删除单个
//  Course.findOneAndDelete({}).then(result => console.log(result))
//  Course.findOneAndDelete({'_id':'5ea9130cd3db2c0b80593623'  }).then(result => console.log(result))
//  删除多个 返回，一个对象ok:1表示操作成功。n:表示删除四个
// Course.deleteMany({}).then(result => console.log(result))


// 改
// 更新单个
// Course.updateOne({查询条件}, {要修改的值}).then(result => console.log(result))
// 更新多个
// Course.updateMany({查询条件}, {要更改的值}).then(result => console.log(result))
// 查,这个查找的方式有很多规则有有很多这就不详细的说了，接下里我们把一些逻辑给封装到我们的DAO层去