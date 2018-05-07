$(document).ready(function() {
    var countS = 25;
    $("#session").html(countS);
    var countB = 5;
    $("#break").html(countB);
    var pos = "pomodoro";
    var countLama;
    var posLama;
    var count;
    $("#stats").html(pos);
    var running = false;
    var inSession = false;
  
    var clock = $(".timer").FlipClock(0, {
      countdown: true,
      clockFace: "MinuteCounter",
      autoStart: false,
      callbacks: {
        interval: function() {
          if (clock.getTime() == 0) {
            if (pos == "Work") {
              clock.setTime(countB * 60);
              clock.start();
              pos = "Break";
              $("#stats").html(pos);
            } else if (pos == "Break") {
              clock.setTime(countS * 60);
              clock.start();
              pos = "Work";
              $("#stats").html(pos);
            }
          }
        }
      }
    });
    $("#sessInc").on("click", function() {
      if (!running && $("#session").html() > 0) {
        countS = parseInt($("#session").html());
        countS += 1;
        $("#session").html(countS);
      }
    });
    $("#sessDec").on("click", function() {
      if (!running && $("#session").html() > 1) {
        countS = parseInt($("#session").html());
        countS -= 1;
        $("#session").html(countS);
      }
    });
  
    $("#breakInc").on("click", function() {
      if (!running && $("#break").html() > 0) {
        countB = parseInt($("#break").html());
        countB += 1;
        $("#break").html(countB);
      }
    });
    $("#breakDec").on("click", function() {
      if (!running && $("#break").html() > 1) {
        countB = parseInt($("#break").html());
        countB -= 1;
        $("#break").html(countB);
      }
    });
    $("#start").on("click", function() {
      running = true;
      if (!inSession) {
        inSession = true;
        $("#start").html("pause");
        if (count != countS || clock.getTime() == 0) {
          clock.setTime(countS * 60);
          pos = "Work";
          $("#stats").html(pos);
        } else {
          pos = posLama;
          $("#stats").html(pos);
        }
        count = countS;
        clock.start();
      } else {
        inSession = false;
        $("#start").html("resume");
        clock.stop();
        countLama = clock.getTime();
        posLama = $("#stats").html();
      }
      console.log("countLama = " + countLama);
      console.log("posLama = " + posLama);
    });
    $("#clear").on("click", function() {
      inSession = false;
      running = false;
      $("#start").html("start");
      clock.stop();
      pos = "pomodoro";
      $("#stats").html(pos);
      clock.setTime(0);
    });
  });
  