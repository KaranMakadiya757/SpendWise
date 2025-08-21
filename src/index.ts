import "dotenv/config";
import connectDB from "./DB/DBConnection";
import { app } from "./app";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 5001, () => {
            console.log(`server running on ${process.env.PORT} ✅`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error !!! ❌", err);
    });
