var gulp = require("gulp");
var gutil = require("gulp-util");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("copy", function() {
    gulp.src("*.html").pipe(gulp.dest('client'));
});
gulp.task("log", function() {
    gutil.log("==My logging task");
});
gulp.task("deploy", function(){
    gulp.src("node_modules/d3/build/d3.js").pipe(gulp.dest("client/app/library/"));
});
gulp.task("compress-js", function() {
    gulp.src("app.js").pipe(uglify()).pipe(concat('app-min.js')).pipe(gulp.dest('client/js'));
});
gulp.task("default", ["copy", "log", "compress-js","deploy"]);
