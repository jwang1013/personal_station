var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var server = http.createServer(app);



app.use('/home', function(req, res){
    console.log('homepage is visited');
    res.sendFile(process.cwd()+'/personal_page/index.html');
});

app.use('/pomodoro_clock', function(req, res){
    console.log('pomodoro clock is visited');
    res.sendFile(process.cwd()+'/pomodoro_clock/index.html');
});

app.use('/random_quote', function(req, res){
    console.log('random quote machine is visited');
    res.sendFile(process.cwd()+'/random_quote_machine/index.html');
});

app.use('/simon_game', function(req, res){
    console.log('simon game is visited');
    res.sendFile(process.cwd()+'/simon_game/index.html');
});

app.use('/game_of_life', function(req, res){
    console.log('game of life is visited');
    res.sendFile(process.cwd()+'/game_of_life/public/index.html');
});

// app.use(express.static(path.join(__dirname + 'build')));

app.get('/', function(req, res){
    console.log('homepage is visited');
    res.sendFile(process.cwd()+'/personal_page/index.html');
});



// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// })

app.use('/p_p', express.static(process.cwd()+'/personal_page/public'));
app.use('/r_q',express.static(process.cwd()+'/random_quote_machine'));
app.use('/s_g',express.static(process.cwd()+'/simon_game'));
app.use('/p_c',express.static(process.cwd()+'/pomodoro_clock'));
app.use('/g_l/public',express.static(process.cwd()+'/game_of_life/public'));
app.use('/g_l/src',express.static(process.cwd()+'/game_of_life/src'));
app.use('/g_l/build', express.static(process.cwd()+'/game_of_life/build'));

// server.listen(process.env.PORT, process.env.IP, function() {
//     var addr = server.address();
//     console.log("Chat server listening at" + (addr.address||process.env.IP) + ":" + (addr.port||process.env.PORT));
// });
server.listen('8000');