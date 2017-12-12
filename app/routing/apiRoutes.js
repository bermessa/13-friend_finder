var friends = require("../data/friends.js");

function apiRoutes(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    //Creates new friend
    app.post("/api/friends", function(req, res) {

        var newFriend = JSON.parse(req.body.data);
        var bestMatch = {
            name: "",
            image: "",
            friendDifference: 50
        };

        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;

            for (var j = 0; j < newFriend.scores.length; j++) {
                totalDifference += Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriend.scores[j]));
            }

            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = friends[i].name;
                bestMatch.image = friends[i].image;
                bestMatch.friendDifference = totalDifference;
            }
        }

        friends.push(newFriend);
        res.json(bestMatch);

    });

}

module.exports = apiRoutes;
