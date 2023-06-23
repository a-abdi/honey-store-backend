db.createUser(
    {
        user: "honey",
        pwd: "Gsj8Vhs185WW",
        roles: [
            {
                role: "readWrite",
                db: "honey-store-backend"
            }
        ]
    }
);