# tweetbot 
#hostname = push.tapbots.com
#^https:\/\/push\.tapbots\.com\/tweetbot\/5\/verify_subscription url script-response-body https://raw.githubusercontent.com/isinglever/Adguard/main/JS/tweetbot.js

var obj = {
  "expires_at" : 1979176991,
  "can_trial" : true,
  "uuid" : "287AC048-FF26-491F-87CA-5EA948F8A80A"
};
$done({body: JSON.stringify(obj)});
