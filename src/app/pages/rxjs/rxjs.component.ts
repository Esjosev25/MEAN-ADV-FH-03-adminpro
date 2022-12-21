import { Component, OnDestroy } from '@angular/core';
import {
  filter,
  interval,
  map,
  Observable,
  retry,
  Subscription,
  take,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnDestroy {
  public internalSub: Subscription;
  constructor() {
    // this.retornaObservable()
    //   .pipe(retry())
    //   .subscribe(
    //     (valor) => {
    //       console.log('subs:', valor);
    //     },
    //     (error: any) => console.log(error),
    //     () => console.log('obsterimnado')
    //   );

    this.internalSub = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.internalSub.unsubscribe();
  }
  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      //take(10),
      map((valor) => valor + 1),
      filter((valor) => valor % 2 === 0)
    );
  }
  retornaObservable() {
    let i = -1;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i == 2) {
          console.log('1 =2');
          observer.error('i llego a dos');
        }
      }, 1000);
    });
  }
}
