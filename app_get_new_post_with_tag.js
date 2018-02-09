// steem.api.getDiscussionsByHot(tag, limit)  // hot (인기글) posts of the tag
// steem.api.getDiscussionsByTrending(tag, limit) // trending(대세글) posts of the tag
'use strict';

const steem = require('steem')
steem.api.setOptions({ url: 'https://api.steemit.com' });

// search post by tag
var query = {
    "tag": "kr",
    "limit": 10
}

steem.api.getDiscussionsByCreated( query, function (err, posts) {
    if (err == null) {
        for (var i = 0; i < posts.length; i++) {
            var str = "[" + (i + 1) + "] " + posts[i].created + ' ; ' + posts[i].author + ' ; '
                      + posts[i].permlink + ' ; ' + posts[i].title + ' ; ' + posts[i].pending_payout_value
            console.log(str)
        }
    }
    else {
        console.log(err.message.split("{}")[0])
    }
});
