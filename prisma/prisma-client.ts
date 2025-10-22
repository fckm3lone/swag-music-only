import {Prisma, PrismaClient} from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


export async function withRetry<T>(operation: () => Promise<T>, maxAttempts = 3, delayMs = 1000): Promise<T> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await operation();
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2024') {
                console.warn(`Retry ${attempt}/${maxAttempts} after P2024 error`);
                if (attempt === maxAttempts) throw error;
                await new Promise((resolve) => setTimeout(resolve, delayMs));
            } else {
                throw error; // Пробрасываем не-P2024 ошибки сразу
            }
        }
    }
    // Если цикл завершился без возврата, выбрасываем ошибку
    throw new Error('withRetry: Maximum attempts reached without success');
}

export default prisma;
