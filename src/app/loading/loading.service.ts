import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // concealing the loading subject, so outside world would get notified when the obs changed but will no longer
  // have the capability to emit the value from this obs
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoadingUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return undefined;
  }

  onLoadingOn() {
    this.loadingSubject.next(true);
  }

  onLoadingOff() {
    this.loadingSubject.next(false);
  }
}
