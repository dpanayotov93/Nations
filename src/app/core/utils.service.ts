import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class UtilsService {

  constructor(private datePipe: DatePipe) { }

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

  nationDates(start, end): string {
    // Display single-day nations as "Jan 7, 2018"
    // Display multi-day nations as "Aug 12, 2017 - Aug 13, 2017"
    const startDate = this.datePipe.transform(start, 'mediumDate');
    const endDate = this.datePipe.transform(end, 'mediumDate');

    if (startDate === endDate) {
      return startDate;
    } else {
      return `${startDate} - ${endDate}`;
    }
  }

  nationDatesTimes(start, end): string {
    // Display single-day nations as "1/7/2018, 5:30 PM - 7:30 PM"
    // Display multi-day nations as "8/12/2017, 8:00 PM - 8/13/2017, 10:00 AM"
    const _shortDate = 'M/d/yyyy';
    const startDate = this.datePipe.transform(start, _shortDate);
    const startTime = this.datePipe.transform(start, 'shortTime');
    const endDate = this.datePipe.transform(end, _shortDate);
    const endTime = this.datePipe.transform(end, 'shortTime');
    console.log(start, end);
    if (startDate === endDate) {
      return `${startDate}, ${startTime}`;
    } else {
      return `${startDate}, ${startTime} - ${endDate}, ${endTime}`;
    }
  }
  
  tabIs(currentTab: string, tab: string): boolean {
    // Check if current tab is tab name
    return currentTab === tab;
  }

  displayCount(guests: number): string {
    // Example usage:
    //  attending this event
    const persons = guests === 1 ? ' person' : ' people';
    return guests + persons;
  }

  showPlusOnes(guests: number): string {
    // If bringing additional guest(s), show as "+n"
    if (guests) {
      return `+${guests}`;
    }
  }

  booleanToText(bool: boolean): string {
    // Change a boolean to 'Yes' or 'No' string
    return bool ? 'Yes' : 'No';
  }  

}