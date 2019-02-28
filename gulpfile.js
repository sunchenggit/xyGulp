var gulp 			= require('gulp'),								// 基本 gulp
	sass 			= require('gulp-sass'),							// 编译sass
	autoprefixer 	= require('gulp-autoprefixer'),					// css 添加前缀
	cssbeautify 	= require('gulp-cssbeautify'),					// css 美化
	pump   			= require('pump');						    	//

const scssUrl 		= './scss/**/*.scss';							// scss文件目录
const destCssUrl 	= './css';										// 编译后css文件所在目录


/* 编译scss */
gulp.task('scss2css',function(){
	pump([
		gulp.src(scssUrl),														// 需要编译的scss路径
		sass({outputstyle:'expanded'}).on('error',sass.logError),				// 编译scss
		cssbeautify({															// css美化
			indent:'	',
		}),
		autoprefixer({															// 添加前缀
			browsers:['last 2 versions', 'Android >= 4.0'],
			cascade:true,//美化
			remove:true//去掉不必要的前缀
		}),
		gulp.dest(destCssUrl)													// 输出编译好的css路径
	])
});

gulp.watch(scssUrl,['scss2css']);