var gulp         =  require('gulp'),
    sass         =  require('gulp-ruby-sass'),
    autoprefixer =  require('gulp-autoprefixer'),
    minifycss    =  require('gulp-minify-css'),
    concat       =  require('gulp-concat'),
    rename       =  require('gulp-rename'),
    uglify       =  require('gulp-uglify'),
    clean        =  require('gulp-clean'),
    notify       =  require('gulp-notify'),

    livereload   =  require('gulp-livereload'),
		watch        =  require('gulp-watch'),
    scsslint     =  require('gulp-scss-lint'),
    cache        =  require('gulp-cached'),
    lr           =  require('tiny-lr'),
    server       =  lr(),

    packer       = require('gulp-packer'),
    streamify    = require('gulp-streamify'),
    size         = require('gulp-filesize'),
    image        = require('gulp-image')
    ;

//compile master scss
gulp.task('styles',function(){
	return gulp.src('assets/css/self/master.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(size())
    .pipe(gulp.dest('assets/css/self/'))
    .pipe(livereload())
    // .pipe(notify({ message: 'sass --> css complete' }));
});

//compile partial scss
gulp.task('partial',function(){
  return gulp.src('assets/css/self/slides/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(size())
    .pipe(gulp.dest('assets/css/self/'))
    .pipe(livereload())
    // .pipe(notify({ message: 'partial sass complete' }));
});

gulp.task('mscsslint', function() {
  gulp.src('child/css/master.scss')
    .pipe(cache('mscsslint'))
    .pipe(scsslint());
});

gulp.task('pscsslint', function() {
  gulp.src('assets/css/self/*.scss')
    .pipe(cache('pscsslint'))
    .pipe(scsslint());
});

// minify javascript task
gulp.task('scripts', function() {
    return gulp.src('assets/js/self/master.js')
      .pipe(concat('master.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest('assets/js/self/'))
        .pipe(livereload())
        // .pipe(notify({ message: 'Javascript completed' }));
});


gulp.task('html', function() {
  return gulp.src('index.html', {read: false})
    .pipe(watch())
    .pipe(livereload())
    pipe(notify({ message: 'index.HTML completed' }));
});

// gulp.task('php', function() {
//   return gulp.src('index.php', {read: false})
//     .pipe(watch())
//     .pipe(livereload())
//     pipe(notify({ message: 'index.PHP completed' }));
// });

gulp.task('image', function () {
  gulp.src('child/img/*')
    .pipe(image())
    .pipe(gulp.dest('child/img/'));
});


gulp.task('png', function () {
  gulp.src('child/img/png/*.png')
    .pipe(image())
    .pipe(gulp.dest('child/img/png/'));
});

gulp.task('svg', function () {
  gulp.src('child/img/svg/*.svg')
    .pipe(image())
    .pipe(gulp.dest('child/img/svg/'));
});

gulp.task('jpg', function () {
  gulp.src('child/img/svg/*.jpg')
    .pipe(image())
    .pipe(gulp.dest('child/img/jpg/'));
});

gulp.task('default',['styles','scripts'], function() {

  gulp.watch('child/css/slides/*.scss',function() {
   gulp.run('partial');
  });

  // gulp.watch('child/css/sub.scss',function() {
	//   gulp.run('partial');
	// });
  gulp.watch('assets/css/self/master.scss',function() {
    gulp.run('styles');
  });
  gulp.watch('assets/css/self/tool/*.scss',function() {
    gulp.run('styles');
  });

  gulp.watch('assets/css/self/slides/*.scss',function() {
    gulp.run('styles');
  });

  gulp.watch('assets/js/self/master.js',function() {
   gulp.run('scripts');
  });

  gulp.watch('index.html',function() {
   gulp.run('html');
  });
  //
  // gulp.watch('child/img/*.png',function() {
  //  gulp.run('png');
  // });
  // gulp.watch('child/img/*.svg',function() {
  //  gulp.run('svg');
  // });
  // gulp.watch('child/img/*.jpg',function() {
  //  gulp.run('jpg');
  // });

  // gulp.watch('wp-content/themes/html5blank-master/index.html',function() {
  // gulp.run('html');
  // });

  // gulp.watch('*.php',function() {
  //  gulp.run('php');
  // });

});
