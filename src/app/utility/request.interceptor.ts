import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../service/auth.service";
import {CryptoService} from "../service/crypto.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private cryptoService: CryptoService
  ) {
  }

  skipUrls: string[] = [
    '/refresh-token',
    '/authenticate'
  ]

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cryptoService.token;
    if (token && !this.skipUrls.some(url => request.url.includes(url))) {
      request = this.addTokenToRequest(request, token);
    }

    if (this.skipUrls.some(url => request.url.includes(url))) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401 && !request.url.includes('/refresh-token')) {
          return this.authService.refreshToken().pipe(
            switchMap(response => {
              this.authService.updateToken(response.token);

              const updatedRequest = this.addTokenToRequest(request, this.cryptoService.token);
              return next.handle(updatedRequest);
            }),
            catchError(err => {
              this.authService.logout();
              return throwError(err);
            })
          )
        }
        return throwError(error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
