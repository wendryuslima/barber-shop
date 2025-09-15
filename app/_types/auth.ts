import { User } from "@prisma/client"

export interface SessionUser extends User {
  id: string
  name: string | null
  email: string
  image: string | null
}

export interface ExtendedSession {
  user: SessionUser
  expires: string
}
