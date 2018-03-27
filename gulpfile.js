var gulp = require('gulp'),								// 基本 gulp
	sass = require('gulp-sass'),						// 编译sass
	autoprefixer = require('gulp-autoprefixer'),		// css 添加前缀
	cssbeautify = require('gulp-cssbeautify'),			// css 美化
	sourcemaps = require('gulp-sourcemaps'),			// 资源地图
	concat = require('gulp-concat'),					// 合并文件
	uglify = require('gulp-uglify'),					// 压缩js
	pump   = require('pump'),							// 
	rename = require('gulp-rename'),					// 重命名文件
	minifyCss = require('gulp-minify-css');				// 压缩css文件

const scssUrl = './scss/**/*.scss';			// scss文件目录
const destCssUrl = './css';					// 编译后css文件所在目录
const jsUrl = './js/**/*.js';				// js源文件目录
const destJsUrl = './dist/js';				// js压缩后输出的目录
const cssUrl = './css/**/*.css';			// css源文件目录
const destMincssUrl = './dist/css';			// css压缩后输出的目录


/* 编译scss */
gulp.task('scss2css',function(){
	pump([
		gulp.src(scssUrl),														// 需要编译的scss路径
		sass({outputstyle:'expanded'}).on('error',sass.logError),				// 编译scss
		cssbeautify({															// css美化
			indent:'	',//缩进
			//openbrace:'separate-line',
			//autosemicolon: true
		}),
		autoprefixer({															// 添加前缀
			browsers:['last 2 versions', 'Android >= 4.0'],
			cascade:true,//美化
			remove:true//去掉不必要的前缀
		}),
		gulp.dest(destCssUrl)													// 输出编译好的css路径
	])
});

/* 合并和压缩css */
gulp.task('minCss',function(){
	pump([
		gulp.src(cssUrl),									// 需要编译的源文件目录
		sourcemaps.init(),									// 资源地图写入
		concat('all.css'),									// 合并文件
		rename({suffix:'.min'}),							// 重命名添加后缀.min
		minifyCss(),										// 压缩css
		sourcemaps.write('./'),								// 资源地图写出 './' 代表当前目录
		gulp.dest(destMincssUrl)							// 编译好之后文件输出路径
	])
});



/* 合并和压缩js */
gulp.task('minjs',function(){
	pump([
		gulp.src(jsUrl),				// 需要编译的源文件目录
		sourcemaps.init(),				// 资源地图写入
		concat('all.js',{				// 合并文件
			newLine:';'					// 合并插件的配置选项 新的一行增加 ';'
		}),
		rename({suffix:'.min'}),		// 重命名文件 
		uglify(),						// 压缩
		sourcemaps.write('./'),				// 资源地图写出 './' 代表当前目录
		gulp.dest(destJsUrl)			// 编译好输出的目录
	])
});



gulp.watch(scssUrl,['scss2css']);