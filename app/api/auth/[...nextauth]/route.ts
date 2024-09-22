import { authOptions } from "@/app/_lib/auth"
import NextAuth from "next-auth"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextAuth(req, res, authOptions)
  } catch (error) {
    console.error("Erro na autenticação:", error)
    res.status(500).json({ error: "Erro na autenticação" })
  }
}

export { handler as GET, handler as POST }
