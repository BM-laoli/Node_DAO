//实现具体的查询逻辑
const Articel = require('./03_具体的Model查询');

//一、模拟查询
//注意这里有两种实现方式,1/单独的查询
function  getArticleById(id){
     Articel.getArticleById(id).then((results) => { 
        console.log(results);
}).catch((err) => {
    });
}
getArticleById(8)


// 二、实际的使用
//如果数据是从 路由Router过来
function getArticleById (req, res, next)  {
//然后再路由里，我只需要这样用就行了，直接从req里面解构过来,需要说明一些
// let id = req.params.id,这个用于处理get /:?这样的数据，?的具体数据，就能从req.params里面弄出来
// let id = req.body,这个用于处理POST这样的数据，具体数据，就能从req.body里面弄出来
    let id = req.params.id  
    Article.getArticleById(id).then(results => {
        req.article = results
        next()//放行
    }).catch(err => {
        next(err)
    })
}


//假设我们这里有一个路由,事实上我们并没有，模拟一下
// articleApp就是我们的路由对象
articleApp.get('/:id', [getArticleById], (req, res) => {
    let { article } = req//由于我们之前的中间件已经把结果存到了req里面，这样我们就能直接拿了
    //如果是模板渲染可以这样来干
    // res.render('article', { article: article })//如果你需要做API接口于是乎你可以以JSON形式丢出去
    res.send( JSON.stringify( { article: article } ) )
})
