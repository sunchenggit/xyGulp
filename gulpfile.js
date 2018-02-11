var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssbeautify = require('gulp-cssbeautify'),
	sourcemaps = require('gulp-sourcemaps');

//源文件路径
const url = './scss/**/*.scss';
//输出文件路径
const desturl = './css';

/*gulp.task('default',function(){
	//默认的代码都放在这里
	console.log('Hello world!');
});*/

gulp.task('scss2css',function(){
	return gulp.src(url)
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
		.pipe(gulp.dest(desturl))
});
gulp.watch(url,['scss2css']);