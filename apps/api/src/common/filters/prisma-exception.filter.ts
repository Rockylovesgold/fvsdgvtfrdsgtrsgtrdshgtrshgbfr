import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception.code === "P2002") {
      response.status(409).json({
        statusCode: 409,
        message: "Unique constraint violation"
      });
      return;
    }
    if (exception.code === "P2025") {
      response.status(404).json({
        statusCode: 404,
        message: "Requested resource was not found"
      });
      return;
    }

    response.status(400).json({
      statusCode: 400,
      message: "Database operation failed"
    });
  }
}
