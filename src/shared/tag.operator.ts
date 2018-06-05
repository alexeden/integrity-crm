import { Observable, Subscriber } from 'rxjs';

const nextCss = `background-color: cyan; color: #000000; font-weight: bold;`;
const errorCss = `background-color: #f64040; color: #ffffff; font-weight: bold;`;
const completeCss = `background-color: rgb(24, 255, 148); color: #000000; font-weight: bold;`;

export const tag = (tagText: string, stringify = false) => {
  return <T>(source: Observable<T>) =>
    new Observable((observer: Subscriber<T>) => {
      let count = 0;
      return source.subscribe({
        next(x) {
          console.log(`%c${tagText} emission #${++count} `, nextCss, stringify ? JSON.stringify(x, null, 2) : x);
          observer.next(x);
        },
        error(err) {
          console.log(`%c${tagText} error after #${count} emissions `, errorCss, err);
          observer.error(err);
        },
        complete() {
          console.log(`%c${tagText} completed after #${count} emissions `, completeCss);
          observer.complete();
        },
      });
    });
};
