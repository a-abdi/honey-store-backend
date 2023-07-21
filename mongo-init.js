db.createUser(
    {
        user: "honey",
        pwd: "recD5usp9DtHRWAcnw",
        roles: [
            {
                role: "readWrite",
                db: "honey-store-backend"
            }
        ]
    }
);