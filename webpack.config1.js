var htmlWebpackPlugin=require('html-webpack-plugin');//生成的js名字后面跟着版本号，自动添加到html里面

module.exports={
    entry:{
        main:'./src/script/main',
        a:'./src/script/a',
        b:'./src/script/b',
    },
    output:{
        path:__dirname+'/dist',
        filename:'js/[name]-[chunkHash].js',
        publicPath:'http://cdn.com/'//项目上线的时候需要
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'index.html',
            filename:'a.html',
            inject:false,//参数可以为false，将不会自动引用
            // inject:'head',//参数可以为false，将不会自动引用
            title:'webpack is good',
            date:new Date(),
            chunks:['main','a'],
            // excludeChunks:['b']//除掉指定的chunk，其他都会引入到页面
            minify:{
                removeComments:true,  //删除注释
                // collapseWhitespace:true  //删除空格
            }//对html文件进行压缩
        }) , //生成的js名字后面跟着版本号，自动添加到html里面
        new htmlWebpackPlugin({
            template:'index.html',
            filename:'b.html',
            inject:false,//参数可以为false，将不会自动引用
            // inject:'body',//参数可以为false，将不会自动引用
            title:'this is b.html',
            chunks:['main','b'],
            minify:{
                // removeComments:true,  //删除注释
                collapseWhitespace:true  //删除空格
            }//对html文件进行压缩
        })
    ]
}