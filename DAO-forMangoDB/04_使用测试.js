//这里是模拟的是中间件，。如果这里有传参和之前的mysql的dao层是一样的操作直接把req身上的都写带下来就可以了

const User = require('./03_具体的模型实现层');

function getSet(queryMD){
    //在这里你可以取查询的要素做处理然后，处理完成之后才丢给查询
    //这里仅仅是为了演示，就不做具体的要素处理了，
    console.log('Jigru1');
    User.getUser(queryMD).then((result) => {

        console.log( result );//这样我们就查询成功了
    }).catch((err) => {
        console.log(err);
    });

}
//假设，我现在要设置username=admin的用用户，于是乎我就
getSet({"username":"admin"})


