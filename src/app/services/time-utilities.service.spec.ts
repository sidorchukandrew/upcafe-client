import { TimeUtilitiesService } from "./time-utilities.service";
import { TestBed } from '@angular/core/testing';

describe('TimeUtilities', () => {

  let timeUtils: TimeUtilitiesService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        TimeUtilitiesService
      ]
    });

    timeUtils = TestBed.get(TimeUtilitiesService);
  });

  it('should return the period', () => {

    const result = timeUtils.appendPeriod("13:00");
    expect(result).toBe("PM");
  });

  it('should get the week\'s Sunday', () => {
    pending();
  });

  it('should get the week\'s Monday', () => {
    pending();
  });

  it('should get the day of the week based on the number', () => {

    const result = timeUtils.getDayBasedOnNumber(1);

    expect(result).toBe("Monday", "Unknown day number");
  });

  it('should convert the time to 12 hour day time', () => {
    const result = timeUtils.convertTime("13:00");

    expect(result).toBe("1:00");
  });

  it('should get the hours portion of the time of a given time', () => {
    const result = timeUtils.parseHour("22:00");
    expect(result).toBe(22);
  });

  it('should get the minutes portion of the time of a given time', () => {
    const result = timeUtils.parseMinutes("11:45");
    expect(result).toBe(45);
  });
});
