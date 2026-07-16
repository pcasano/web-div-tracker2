import { Injectable, signal } from '@angular/core';
import {delay, of} from 'rxjs';
import {MOCK_DIVIDENDS} from './mock-dividends';

export interface Company {
  id: string;
  name: string;
  dividendPaymentDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  readonly dividends = signal<Company[]>([]);

  loadDividends(): void {
    of(MOCK_DIVIDENDS)
      .pipe(delay(1000)) // Simulate server latency
      .subscribe(dividends => this.dividends.set(dividends));
  }

}
