let gulp = require("gulp");
let pug = require("gulp-pug");
let sass = require("gulp-sass");
let browserSync = require("browser-sync");
let babel = require("gulp-babel");
let sourcemaps = require("gulp-sourcemaps");
let autoprefixer = require("gulp-autoprefixer");
let uglify = require("gulp-uglify");
let del = require("del");

gulp.task('clean', () => {
    return del('dist');
})

gulp.task('copy', () => {
    return gulp.src(['src/resources/**/*.*'])
        .pipe(gulp.dest('dist'))
});

gulp.task('pug', () => {
    return gulp.src('src/index.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('dist'))
});

gulp.task('scss', () => {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
            }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', () => {
    return gulp.src(['src/js/main.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
});


gulp.task('watch', () => {
    gulp.watch(['src/index.pug', 'src/pug/**/*.pug'], gulp.series('pug'));
    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch('src/resources/**/*.*', gulp.series('copy'));
});


gulp.task("build", gulp.series(["clean", "pug", "scss", "js", "copy"]));

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        files: ['dist/**/*.*']
    })
});


gulp.task('default', gulp.parallel('build', 'server', 'watch'));
