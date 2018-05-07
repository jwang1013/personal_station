$(document).ready(function() {
    var $window = $(window);
    var $elem = $("#skll");
    var $elemTL = $("#education");
 
    // function isScrolledIntoView($elem, $window) {
    //     var docViewTop = $window.scrollTop();
    //     var docViewBottom = docViewTop + $window.height();
    //     var elemTop = $elem.offset().top;
    //     var elemBottom = elemTop + $elem.height();
    //     return ((elemBottom <= docViewBottom));
    // }
 
    $(document).on("scroll", function () {
        // console.log($elem.offset().top <= $window.scrollTop() + $window.height()/2);
        if ($elem.offset().top <= $window.scrollTop() + $window.height() / 2) {
            $("#progress-java").addClass("p-java");
            $("#progress-javascript").addClass("p-javascript");
            $("#progress-html").addClass("p-html");
            $("#progress-css").addClass("p-css");
            $("#progress-react").addClass("p-react");
            $("#progress-angular").addClass("p-angular");
            $("#progress-node").addClass("p-node");
            $("#progress-npm").addClass("p-npm");
            $("#progress-android").addClass("p-android");
            $("#progress-web").addClass("p-web");
            $("#progress-app").addClass("p-app");
            $("#progress-db").addClass("p-db");
            var lang1 = {
                "java": "100%",
                "javascript": "80%",
                "html": "100%",
                "css": "90%",
                "react": "80%",
                "angular": "70%"
            };
            var lang2 = {
                "node": "70%",
                "npm": "60%",
                "android": "70%",
                "web": "95%",
                "app": "75%",
                "db": "55%"
            };
 
            var multiply1 = 1;
 
            $.each(lang1, function (language, pourcent) {
 
                var delay = 1000;
                var step = 300;
 
                setTimeout(function () {
                    $('#' + language + '-pourcent').html(pourcent);
                }, delay + step * multiply1);
 
                multiply1++;
 
            });
            var multiply2 = 1;
            $.each(lang2, function (language, pourcent) {
                var delay = 1000;
                var step = 300;
                setTimeout(function () {
                    $('#' + language + '-pourcent').html(pourcent);
                }, delay + step * multiply2);
                multiply2++;
            });
        }
        if ($elemTL.offset().top <= $window.scrollTop() + $window.height() / 2) {
            window.requestAnimationFrame(function() {
                document.querySelector('.timeline').classList.add('timeline--show');
            });
        }
    });

    
    
});

