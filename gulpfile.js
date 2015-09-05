var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default',['mytask1'],function(){
	console.log('my default task');
});
gulp.task('mytask1',['mytask2'],function(cb){
	console.log('task 1 output');
	cb();
});
gulp.task('mytask2',function(){
	console.log('task 2 output');
	//cb();
});

gulp.task('output1',function(){
	gulp.src('assets/vendor/bootstrap/**/*.js')
		.pipe(gulp.dest('output1'));
});

gulp.task('output2',['clean'],function(){
	gulp.src(['assets/vendor/**/*.js','assets/vendor/**/*.css'], { base: 'assets/' })
		.pipe(gulp.dest('output2'));
});

gulp.task('output3',function(){
	gulp.src(['assets/vendor/**/*.js','assets/vendor/**/*.css'], { base: 'assets/vendor/' })
		.pipe(gulp.dest('output3'));
});

gulp.task('output4',function(){
	gulp.src([
		'assets/vendor/angular-animate/*.js',
		'assets/vendor/angular/*.css'
		])
		.pipe(gulp.dest('output4'));
});

gulp.task('clean',function(cb){
	del(['output2/vendor/**', '!output2/vendor/']).then(function (paths) {
		console.log('Deleted files/folders:\n', paths.join('\n'));
		cb();
	});
});

gulp.task('watch',function(cb){
	gulp.watch('app/**',["concat-app"]);
});

gulp.task('concat-app',function(){
	gulp.src('app/**/*.module.js')
		.pipe(concat('app.module.js'))
		.pipe(gulp.dest('assets'))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('assets'));
	
	gulp.src(['app/**/*.js',"!app/**/*.module.js"])
		.pipe(concat('app.bundle.js'))
		.pipe(gulp.dest('assets'))
		.pipe(uglify({mangle:false}))
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('assets'));
});

gulp.task('concat-app-all',['concat-app'],function(){
	gulp.src(['assets/app.module.min.js','assets/app.bundle.min.js'])
		.pipe(concat('app.all.js'))
		.pipe(gulp.dest('assets'))
		.pipe(uglify({mangle:false}))
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('assets'));
});