import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export async function GET() {
  try {
    await prisma.account.deleteMany()
    await prisma.session.deleteMany()
    await prisma.user.deleteMany()
    return new Response("Database cleared - now delete this file and try login again")
  } catch(e){
    return new Response("No Prisma DB found, error: " + e.message)
  }
}
