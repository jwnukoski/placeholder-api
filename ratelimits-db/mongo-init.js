db = db.getSiblingDB("ratelimits");
db.createCollection("ips");
db.ips.createIndex({ "_id": 1 }, { name: "ip clustered key" });
db.ips.insertOne({ "_id": "127.0.0.1", data: { "count": 0 } });