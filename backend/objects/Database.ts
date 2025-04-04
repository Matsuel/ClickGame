import mongoose from "mongoose";
import { Logger } from "../utils/Logger";

export class Database {
    public static instance: Database | null = null;
    private connectionString: string = process.env.MONGODB_URI || "mongodb://localhost:27017/clickgame";
    private logger = new Logger("Database.ts");

    private constructor() {}

    public static getInstance(): Database {
        if (this.instance === null) {
            this.instance = new Database();
        }
        return this.instance;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.connectionString);
            this.logger.info("Database connection successful");
        } catch (error) {
            this.logger.error("Database connection error:", error);
            throw new Error(`Database connection error: ${error}`);
        }
    }
    
}