import {Component, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';

interface CalendarDay {
  date: Date | null;
  day: number | null;
  weekend: boolean;
}

@Component({
  selector: 'app-calendar-page',
  imports: [
    MatCard
  ],
  templateUrl: './calendar-page.html',
  styleUrl: './calendar-page.css',
})
export class CalendarPage implements OnInit {

  weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  days: CalendarDay[] = [];

  ngOnInit(): void {
    this.generateCalendar();
  }

  private generateCalendar(): void {
    this.days = [];

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

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
}
