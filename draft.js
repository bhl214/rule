var obj = JSON.parse($response.body);

obj= {
  "active_expires_at" : "2021-11-20T00:00:00Z",
  "is_subscription_active" : true,
  "active_subscription_type" : "premium",
  "is_blocked" : false
};

$done({body: JSON.stringify(obj)});

// Descriptions