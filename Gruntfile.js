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

    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('develop', ['watch', 'concat']);
};