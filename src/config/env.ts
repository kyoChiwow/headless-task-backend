import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: string;
    DB_URL: string;
    GEMINI_API_KEY: string;
}

const loadEnvironmentVariables = () : EnvConfig => {
    const requiredEnvVars: string[] = ["PORT", "DB_URL", "GEMINI_API_KEY"];

    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            throw new Error(`Missing environment variable: ${envVar}`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY as string
    }
}

export const envVars = loadEnvironmentVariables();