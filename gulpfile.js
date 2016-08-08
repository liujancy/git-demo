'use instrict';

//1、less编译、压缩、合并
//2、js文件合并、压缩、混淆（压缩，缩短变量名）
//3、img复制
//4、html压缩

//在gulpfile中先载入gulp包，因为这个包提供了一些API

var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');

//任务1,less合并没有太大必要，一般预处理css都可以import导入
gulp.task('style',function(){
	//这里是在执行style任务时自动执行
	gulp.src('src/style/*.less')
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/style'))
		.pipe(browserSync.reload({
			stream:true
		}));  //目标文件名不用自己写，编译的时候会自己添加
		
})


//任务2 
var uglify = require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
	    .pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({
			stream:true
		}));
});

//图片复制任务

gulp.task('img',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
			stream:true
		}));
})

//4 
var html = require(('gulp-htmlmin'));
gulp.task('html',function(){
	gulp.src('src/*.html')
		.pipe(html({collapseWhitespace:true}))//需要传入参数，不穿参数的话会原样输出
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream:true
		}));
})

var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({
		 server: {
     		 baseDir: ['dist']
    	},
		
	},function(err,bs){
		console.log(bs.options.getIn(["urls","local"]));
	});

	gulp.watch('src/style/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['img']);
	gulp.watch('src/*.html',['html']);
})