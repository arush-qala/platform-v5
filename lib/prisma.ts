/**
 * PRISMA CLIENT SINGLETON
 * 
 * TECHNICAL PURPOSE:
 * Creates a single Prisma Client instance that's reused across the application.
 * This prevents multiple database connections and improves performance.
 * 
 * NEXT.JS SPECIFIC PATTERN:
 * In development, Next.js hot-reloading can create multiple Prisma Client instances.
 * This pattern stores the client in a global variable to prevent this issue.
 * 
 * HOW IT WORKS:
 * 1. Check if Prisma Client already exists in global scope
 * 2. If yes, reuse it (prevents duplicate connections)
 * 3. If no, create new instance
 * 4. In development, store in global scope for hot-reload persistence
 * 
 * PRODUCTION BEHAVIOR:
 * In production, Next.js doesn't hot-reload, so we don't need to store
 * in global scope. Each server instance gets its own Prisma Client.
 * 
 * USAGE:
 * Import this singleton in API routes and server components:
 * import { prisma } from '@/lib/prisma'
 */

import { PrismaClient } from '@prisma/client'

/**
 * Type-safe global variable for Prisma Client
 * Used to store the client instance across hot-reloads in development
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Prisma Client Singleton
 * 
 * LOGIC:
 * - If global.prisma exists (development hot-reload), reuse it
 * - Otherwise, create new PrismaClient instance
 * - This ensures only one database connection pool per process
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

/**
 * Development Hot-Reload Protection
 * 
 * In development, Next.js hot-reloading can cause module re-evaluation.
 * By storing Prisma Client in global scope, we ensure the same instance
 * is reused across hot-reloads, preventing "too many connections" errors.
 * 
 * In production, this assignment is unnecessary but harmless.
 */
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

