module.exports = function(grunt) {
    grunt.initConfig({
        concat:{
            base:{
                src:['src/patch.js', 'src/*/base.js'],
                dest:'build/baseline.js'
            },
            all:{
                src:['src/patch.js', 'src/*/base.js', 'src/*/plus.js'],
                dest:'build/all.js'
            }
        },
        umd:{
            files:['build/baseline.js', 'build/all.js']
        },
        uglify:{
            my_target:{
                files:{
                    'build/baseline.min.js':'build/baseline.js',
                    'build/all.min.js':'build/all.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // fixed umd
    grunt.registerMultiTask('umd', 'add umd format to sourcecode', function(arg1, args) {
        var umd_template = [
            "(function(root, factory) {",
            "    if(typeof define === 'function' && define.amd) {",
            "        define(factory);",
            "    }",
            "    else if(typeof exports === 'object') {",
            "        module.exports = factory();",
            "    }",
            "    else {",
            "        root.baseline = factory();",
            "    }",
            "})(this, function() {",
            "",
            "__include__",
            "",
            "});"
        ].join('\r\n');

        this.data.forEach(function(file) {
            var js_files = grunt.file.expand(file);
            js_files.forEach(function(path) {
                var content = umd_template.replace(/\_\_include\_\_/, grunt.file.read(path));
                grunt.file.write(path, content);
            });
        });
    });

    grunt.registerTask('build', ['concat', 'umd', 'uglify']);
    grunt.registerTask('develop', ['watch', 'concat']);
};