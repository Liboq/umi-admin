import { Injectable, HttpException, HttpStatus, NestInterceptor, ExecutionContext,CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'


@Injectable()
export class HttpStatusSuccess implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler) :Observable<any> {
        return next.handle().pipe(map(data => {
            return {
                statusCode: HttpStatus.OK,
                message: '请求成功',
                data
            }
        }))
    }
}
