import { CustomError } from "@/api/utils";


export function handleError(err: unknown) {

      if (err instanceof CustomError) {

            return { status: err.status, message: err.message };

      }

      console.error("Unexpected error: ", err);

      return { status: 500, message: `Unexpected error: ${err}` };

}