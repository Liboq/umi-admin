// httpStatus.service.ts
import { Injectable, HttpException, HttpStatus, NestInterceptor } from '@nestjs/common'

@Injectable()
export class HttpStatusError {
    static fail(error, status = HttpStatus.BAD_REQUEST) {
        throw new HttpException({statusCode: status, message: '请求失败', error}, status)
    }
}
