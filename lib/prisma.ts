import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";
import { cache } from "react";

// Mock Prisma client for when database is not available
const mockPrismaClient = {
  chat: {
    create: async () => { throw new Error('Database not configured'); },
    findUnique: async () => null,
    findFirst: async () => null,
    update: async () => { throw new Error('Database not configured'); },
  },
  message: {
    create: async () => { throw new Error('Database not configured'); },
    findUnique: async () => null,
    findMany: async () => [],
    createMany: async () => { throw new Error('Database not configured'); },
  },
  generatedApp: {
    create: async () => { throw new Error('Database not configured'); },
    findUnique: async () => null,
  },
} as any;

export const getPrisma = cache(() => {
  // Check if we're in build time or if DATABASE_URL is not properly configured
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'preview') {
    return mockPrismaClient;
  }
  
  if (!process.env.DATABASE_URL || 
      process.env.DATABASE_URL.includes('placeholder') || 
      process.env.DATABASE_URL.includes('your-database-url')) {
    console.warn('Database not configured, using mock client');
    return mockPrismaClient;
  }
  
  try {
    const neon = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaNeon(neon);
    return new PrismaClient({ adapter });
  } catch (error) {
    console.warn('Failed to initialize Prisma client, using mock client:', error);
    return mockPrismaClient;
  }
});