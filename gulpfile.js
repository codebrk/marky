'use strict';

const gulp         = require("gulp");
const browserify   = require("gulp-browserify");
const babel        = require("gulp-babel");
const rename       = require("gulp-rename");
const concat       = require("gulp-concat");
const uglify       = require("gulp-uglify");


process.env.NODE_ENV = 'production';

gulp.task("compile-js", () => {
    return gulp.src(["./src/index.js"])
        .pipe(browserify({
            "transform": [
                ["reactify", {"es6": true}]
            ]
        }).on("error", console.log))
        .pipe(rename("development.js"))
        .pipe(gulp.dest("./dist"));
});


gulp.task("concat-css", () => {
    return gulp.src(["./node_modules/codemirror/lib/codemirror.css",
        "./node_modules/codemirror/theme/material.css", "./src/marky.css"])
        .pipe(concat("master.css"))
        .pipe(gulp.dest("./dist"));
});


gulp.task("default", ["compile-js", "concat-css"], () => {
    return gulp.src("./dist/development.js")
        .pipe(babel({
            "presets": ["es2015"]
        }))
        .pipe(uglify())
        .pipe(rename("production.js"))
        .pipe(gulp.dest("./dist"));
});


gulp.task("watch", ["compile-js", "concat-css"], () => {
    gulp.watch(["./src/*.js", "./src/**/*.js"], ["compile-js"]);
    gulp.watch(["./src/*.css", "./src/**/*.css"], ["concat-css"]);
});