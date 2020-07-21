const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const obsoleteImages = require('gulp-font-awesome-icons');

gulp.task('message', async function(){
    return console.log('Gulp is running..');
});

//Compile Sass
gulp.task('sass' , async function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js', 'node_modules/jquery/jquery.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch('src/sass/*.scss', gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('js', 'sass'));


// //minify js
// gulp.task('minify' , async function(){
//     gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// gulp.task('watch', async function(){
//     gulp.watch('src/sass/*.scss', gulp.series('sass'));
//     // gulp.watch('src/*.html', gulp.series('copyHTML'));
//     // gulp.watch('src/js/*.js', gulp.series('scripts'));
//     // gulp.watch('src/images/*', gulp.series('imageMin'));
// });

// function style() {
//     return gulp.src('./scss/**/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('./css'))
// }
//
// exports.style = style;

// //Copy all html files
// gulp.task('copyHTML' , async function(){
//     gulp.src('src/*.html')
//         .pipe(gulp.dest('dist'));
// });