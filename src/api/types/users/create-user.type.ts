import { ExpirationUnits } from "@/api/enums"


export type CreateUser = {

      email: string

      hashedPassword: string

      expiresInUnit: ExpirationUnits

      expiresInValue: string

}