var gulp = require('gulp'),								// 基本 gulp
	sass = require('gulp-sass'),						// 编译sass
	autoprefixer = require('gulp-autoprefixer'),		// css 添加前缀
	cssbeautify = require('gulp-cssbeautify'),			// css 美化
	sourcemaps = require('gulp-sourcemaps'),			// 资源地图
	concat = require('gulp-concat'),					// 合并文件
	uglify = require('gulp-uglify'),					// 压缩js
	pump   = require('pump'),							// 
	rename = require('gulp-rename');					// 重命名文件

const scssUrl = './scss/**/*.scss';			// scss文件目录
const destCssUrl = './css';					// 编译后css文件所在目录
const jsUrl = './js/**/*.js';				// js源文件目录
const destJsUrl = './dist/js';				// js压缩后输出的目录



/* 编译scss */
gulp.task('scss2css',function(){
	return gulp.src(scssUrl)
		.pipe(sourcemaps.init())
		.pipe(sass({outputstyle:'expanded'}).on('error',sass.logError))
		.pipe(cssbeautify({
			indent:'	',//缩进
			//openbrace:'separate-line',
			//autosemicolon: true
		}))
		.pipe(autoprefixer({
			browsers:['last 2 versions', 'Android >= 4.0'],
			cascade:true,//美化
			remove:true//去掉不必要的前缀
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(destCssUrl))
});

/* 合并和压缩js */
gulp.task('minjs2',function(){
	pump([
		gulp.src(jsUrl),
		sourcemaps.init(),
		concat('all.js',{
			newLine:';'					// 合并插件的配置选项 新的一行增加 ';'
		}),
		rename({suffix:'.min'}),			// 重命名文件 
		uglify(),
		sourcemaps.write(),
		gulp.dest(destJsUrl)
	])
});


gulp.watch(scssUrl,['scss2css']);