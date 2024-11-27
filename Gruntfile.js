module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Limpeza de diretórios desnecessários, como o node_modules
        clean: ['prebuild', 'dist', 'node_modules'], 

        // Compilação LESS
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less',
                },
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less',
                },
            },
        },

        // Substituição no HTML
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css',
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ],
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/',
                    },
                ],
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css',
                        },
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './scripts/main.min.js',
                        },
                    ],
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/',
                    },
                ],
            },
        },

        // Minificação do HTML para produção
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html': 'src/index.html',
                },
            },
        },

        // Observação de mudanças nos arquivos
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development'],
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev'], // Atualiza o HTML no dev
            },
        },

        // Minificação de arquivos JS
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    });

    // Carregar plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');

    // Tarefas
    grunt.registerTask('default', ['watch']); // Ambiente de desenvolvimento
    grunt.registerTask('build', ['clean', 'less:production', 'htmlmin:dist', 'replace:dist', 'uglify']); // Produção
};
