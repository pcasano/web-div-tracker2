import {Component, computed, inject, OnInit} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Company, CompanyService } from '../shared/company.service';


interface CalendarDay {
  date: Date | null;
  day: number | null;
  weekend: boolean;
}

@Component({
  selector: 'app-calendar-page',
  imports: [
    MatCard,
  ],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.css',
})
export class CalendarPage implements OnInit {

  private readonly companyService = inject(CompanyService);

  readonly dividends = this.companyService.dividends;

  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  days: CalendarDay[] = [];

  currentMonthYear = '';

  ngOnInit(): void {
    this.companyService.loadDividends();
    this.generateCalendar();
  }

  private generateCalendar(): void {
    this.days = [];

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    this.currentMonthYear = today.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Monday = 0, Sunday = 6
    const firstWeekday = (firstDay.getDay() + 6) % 7;

    // Empty cells before the first day
    for (let i = 0; i < firstWeekday; i++) {
      this.days.push({
        date: null,
        day: null,
        weekend: false
      });
    }

    // Days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const weekday = (date.getDay() + 6) % 7;

      this.days.push({
        date,
        day,
        weekend: weekday >= 5
      });
    }
  }

  readonly dividendDates = computed(() => {
    return new Set(this.dividends().map(d => d.dividendPaymentDate));
  });

  hasDividend(day: CalendarDay): boolean {
    if (!day.date) {
      return false;
    }

    const d = String(day.date.getDate()).padStart(2, '0');
    const m = String(day.date.getMonth() + 1).padStart(2, '0');
    const y = day.date.getFullYear();

    return this.dividendDates().has(`${d}.${m}.${y}`);
  }

  dividendsForDay(day: CalendarDay): Company[] {
    if (!day.date) {
      return [];
    }

    const date = day.date.toLocaleDateString('de-DE');

    return this.dividends().filter(
      dividend => dividend.dividendPaymentDate === date
    );
  }

  getDividendCount(day: CalendarDay): number {
    if (!day.date) {
      return 0;
    }

    const d = String(day.date.getDate()).padStart(2, '0');
    const m = String(day.date.getMonth() + 1).padStart(2, '0');
    const y = day.date.getFullYear();

    const date = `${d}.${m}.${y}`;

    return this.dividends().filter(
      dividend => dividend.dividendPaymentDate === date
    ).length;
  }
}
