$(document).ready(function () {
    getQuote();
    var randomQuote = "";
    var author = "";
    function getQuote() {
        document.getElementById('newQuote').disabled = true;
        var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
        $.getJSON(url, function (data) {
            randomQuote = data.quoteText;
            author = data.quoteAuthor;
        });

        var timeAnimation = 500;
        $('.quotes').fadeOut(timeAnimation, function () {
            $(".quotes").fadeIn(timeAnimation);
            typeWrite();
        });

        var i = 0;
        var speed = 50;
        function typeWrite() {
            if (i < randomQuote.length) {
                if (i == 0) {
                    $('#quote').html("");
                    $('.author').html("");
                }
                document.getElementById("quote").innerHTML += randomQuote.charAt(i);
                i++;
                setTimeout(typeWrite, speed);
            }
            else if (i == randomQuote.length) {
                document.getElementById('newQuote').disabled = false;
                if (author.length == 0) author = "Anonymous";
                $('.author').html('-' + author);
            }
        }
    }


    $("#newQuote").click(function () {
        getQuote();
    });
    $("#twitter").on("click", function () {
        window.open("https://twitter.com/intent/tweet?text=" + randomQuote + " " + "-" + author);
    });
    $("#tumblrIcon").on("click", function () {
        window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=' + author + '&content=' + randomQuote + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
    });
});
  
  