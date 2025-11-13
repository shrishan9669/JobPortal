import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "./prisma/schema.prisma", // relative path fix
  migrations: {
    path: "./prisma/migrations", // relative path fix
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
