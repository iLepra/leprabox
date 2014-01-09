// define config
requirejs.config({
    paths: {
        'jquery': '../bower_components/jquery/jquery.min',
        'jquerymobile': '../bower_components/jquery-mobile/dist/jquery.mobile.min',
    },
    shim: {
        'jquerymobile': ['jquery'],
    }
});
