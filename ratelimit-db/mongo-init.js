db = db.getSiblingDB("ratelimits");
db.createCollection("ips", 
    { 
        clusteredIndex: { "key": { _id: 1 }, "unique": true, "name": "ip clustered key" }, 
        expireAfterSeconds: 86400 
    }
);
db.ips.insertOne({ "_id": "127.0.0.1", data: "init" });