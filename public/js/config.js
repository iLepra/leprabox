// define config
requirejs.config({
    paths: {
        'jquery': '../bower_components/jquery/jquery.min',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'requireLib': '../bower_components/requirejs/require',
    },
    shim: {
        'bootstrap': ['jquery'],
    },
    include: ["requireLib"],
});
