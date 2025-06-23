// src/app/pipes/format-time.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true // Declare as standalone pipe
})
export class FormatTimePipe implements PipeTransform {

  /**
   * Transforms a total number of seconds into a formatted MM:SS string.
   * @param totalSeconds The total number of seconds.
   * @returns Formatted time string (MM:SS).
   */
  transform(totalSeconds: number | null | undefined): string {
    if (totalSeconds === null || totalSeconds === undefined || totalSeconds < 0) {
      return '00:00'; // Handle null, undefined, or negative time
    }

    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;

    const paddedMinutes: string = String(minutes).padStart(2, '0');
    const paddedSeconds: string = String(seconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
  }
}
