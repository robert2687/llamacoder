import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";
import { cache } from "react";

export const getPrisma = cache(() => {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('placeholder')) {
    throw new Error('DATABASE_URL environment variable is not properly configured');
  }
  
  const neon = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaNeon(neon);
  return new PrismaClient({ adapter });
});
