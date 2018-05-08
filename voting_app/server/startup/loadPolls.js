Meteor.startup( function () {
    if (Polls.find().count() === 0) {
        var polls = [
                { owner: "server-builtin",
                    title: "What OS do you use?",
                    results: { "Windows": 10,
                                "Linux": 25,
                                "OSX": 8},
                    votedBy: [],
                    date: "2017-05-12",
                    tVotes: 43
                },
                { owner: "server-builtin",
                    title: "What DE do you use?",
                    results: { "KDE": 20,
                                "Xfce": 20,
                                "Cinnamon": 8},
                    votedBy: [],
                    date: "2017-09-13",
                    tVotes: 48
                },
                { owner: "server-builtin",
                    title: "How many games did you buy?",
                    results: { 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10},
                    votedBy: [],
                    date: "2017-10-23",
                    tVotes: 55
                }
            ];
        for (var i = 0; i < polls.length; i++) {
            Polls.insert(polls[i]);
        }
    }
});