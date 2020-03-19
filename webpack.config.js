var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title) {
	return {
		template: './src/view/' + name + '.html', //模板文件路径
		filename: 'view/' + name + '.html', //输出的 HTML 文件名
		favicon: './favicon.ico',
		title: title, //用来生成页面的 title 元素
		inject: true, //所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中
		hash: true, //将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件
		chunks: ['common', name] //允许只添加某些块
	};
};

config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'result': ['./src/page/result/index.js'],
		'user-login': ['./src/page/user-login/index.js'],
		'user-register': ['./src/page/user-register/index.js'],
		'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
		'user-center': ['./src/page/user-center/index.js'],
		'user-center-update': ['./src/page/user-center-update/index.js'],
		'user-pass-update': ['./src/page/user-pass-update/index.js'],
		'list': ['./src/page/list/index.js'],
		'detail': ['./src/page/detail/index.js'],
		'cart': ['./src/page/cart/index.js'],
		'order-confirm': ['./src/page/order-confirm/index.js'],
		'order-list': ['./src/page/order-list/index.js'],
		'order-detail': ['./src/page/order-detail/index.js'],
		'payment': ['./src/page/payment/index.js'],
		'about': ['./src/page/about/index.js']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.tiancaikai.xyz/mmall-fe/dist/',
		filename: 'js/[name].js' //[name]是文件名字是entry的键值
	},
	externals: {
		'jquery': 'window.jQuery'
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=100&name=resource/[name].[ext]',
				options: {
					esModule: false
				}
			},
			{
				test: /\.string$/,
				loader: "html-loader",
				query: {
					// 需要压缩
					  minimize : true,
					  // 压缩的时候 不要删除引号
					  removeAttributeQuotes : false
				}
			}
		]
	},
	resolve: {
		alias: {
			node_modules: __dirname + '/node_modules',
			util: __dirname + '/src/util',
			page: __dirname + '/src/page',
			service: __dirname + '/src/service',
			image: __dirname + '/src/image'
		}
	},
	plugins: [
		// 把css单独打包到文件里
		new ExtractTextPlugin("css/[name].css"),
		// html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
		new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
		new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
		new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
		new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
		new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
		new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
		new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '确认订单')),
		new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
		new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
		new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
		new HtmlWebpackPlugin(getHtmlConfig('about', '关于页面'))
	],
	//独立通用模块
	optimization: {
		splitChunks: {
			//只抽离属于动态引入的文件
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			automaticNameMaxLength: 30,
			name: true,
			cacheGroups: {
				commons: {
					name: "common",
					filename: "js/base.js",
					chunks: "initial",
					minChunks: 2,
					minSize: 0
				}
			}
		}
	}
}

if ('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8098/');
}

module.exports = config;
