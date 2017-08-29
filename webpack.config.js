var htmlWebpackPlugin=require('html-webpack-plugin');//生成的js名字后面跟着版本号，自动添加到html里面
var path=require("path");
module.exports={
    // context:'/my-webpack',
    entry:{
        main:'./loader/app',
    },
    output:{
        path:__dirname+'/dist',
        filename:'js/[name]-bundle.js',
        // publicPath:'http://cdn.com/'//项目上线的时候需要
    },
    module:{
      loaders:[//使用babel
          { //js的loader
              test:/\.js$/,//处理js文件
              loader:'babel-loader',
              include:path.resolve(__dirname,'/loader/'),
              exclude:path.resolve(__dirname,'node_modules'),
              // query:{
              //     presets:['lastest']  //可以在package.json里面指定，但必须安装依赖   npm install --save-dev babel-preset-latest
              // }
          }
          // {//css 的loader
          //     test:/\.css$/,//处理css文件
          //     loader:'style-loader!css-loader!postcss-loader',
          // }
      ],
        rules:[{
            test:/\.(less|css)$/,//处理css文件
            use: [
                'style-loader',
                {loader: 'css-loader',options: { importLoaders: 1 }},
                // {loader: 'postcss-loader', options: { parser: 'sugarss', exec: true } }
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('postcss-import')(),
                            require('autoprefixer')({
                                broswers: ['last 5 versions']
                            })
                            // require('stylelint')(),
                        ]
                    }
                },
                {
                    loader: 'less-loader',
                    options:{
                        strictMath: true,
                        noIeCompat: true
                    }
                },
                // {
                //     loader:'postcss-loader',
                //     options:{
                //         plugins:[
                //             require('autoprefixer')({
                //                 broswers: ['last 5 versions']
                //             })
                //         ]
                //     }}
            ]
        },{
            test:/\.html$/,
            use:'html-loader'
        },{
            test:/\.ejs|tpl$/,
            use:'ejs-loader'
        },{
          test: /\.(gif|png|jpe?g|svg)$/i,
          loaders:[
            'url-loader?limit=1&name=assets/[name]--[hash:5].[ext]',
            'image-webpack-loader??bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        }
        // {
        //   test:/\.(png|jpg|gif|svg)$/,
        //   loader:'file-loader',
        //   query:{
        //     name:'assets/[name]--[hash:5].[ext]'
        //   }
        // },
        // {
        //   test:/\.(png|jpg|gif|svg)$/,
        //   loader:'url-loader',//url-loader 和file-loader不能一起用
        //   query:{
        //     limit:30000000,
        //     name:'assets/[name]--[hash:5].[ext]'
        //   }
        // }
      ],
    },
    // postcss:[
    //     require('autoprefixer')({
    //         broswers:['last 5 versions']
    //     })
    // ],
    //
    plugins:[
        new htmlWebpackPlugin({
            template:'loader.html',
            filename:'loader.html',
            inject:'body',//参数可以为false，将不会自动引用
            // inject:'head',//参数可以为false，将不会自动引用
            title:'webpack is good',
            // excludeChunks:['b']//除掉指定的chunk，其他都会引入到页面
            minify:{
                removeComments:true,  //删除注释
                // collapseWhitespace:true  //删除空格
            }//对html文件进行压缩
        })
    ]
}
