const mongoose = require("mongoose");

connectToDatabase=()=> {
    try {
        const connection = process.env.MONGO_URL;

        if (!connection) {
            throw new Error("MONGO_URL is not defined in .env file");
        }

        mongoose.connect(connection);

        console.log("✅ Database connected");
    } catch (error) {
        console.error("❌ Database connection error:", error.message);
        process.exit(1); // exit the app if DB fails
    }
}

module.exports = connectToDatabase;
