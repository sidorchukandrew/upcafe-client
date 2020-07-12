import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HoursService } from './hours.service';
import { BLOCKS, PICKUP_SETTINGS, AVAILABLE_TIMES } from 'src/app/db-server/hours-test-data';
import { PickupSettings } from '../models/PickupSettings';
import { HttpErrorResponse } from '@angular/common/http';

describe('HoursService', () => {

  let hoursService: HoursService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HoursService
      ]
    });

    hoursService = TestBed.get(HoursService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  xit('should get time blocks for a given day', () => {

    hoursService.getBlocksForDay(new Date().toDateString()).subscribe(blocks => {
      expect(blocks).toBeTruthy("No courses were returned");

      const block = blocks.find(block => block.id == "BLOCK ID 1");

      expect(block.open).toBe("22:00");
      expect(block.close).toBe("23:00");
      expect(block.day).toBe("Monday");
    });

    const testRequest = httpTestingController.expectOne(req => req.url == "https://upcafe-api.azurewebsites.net/cafe/hours");

    expect(testRequest.request.method).toBe("GET");
    expect(testRequest.request.params.get("day")).toBe(new Date().toDateString());

    testRequest.flush(BLOCKS);
  });


  it("should get the pickup settings", () => {

    hoursService.getPickupSettings().subscribe(settings => {


      expect(settings).toBeTruthy("The settings object returned was null");

      expect(settings.id).toBe("1");
      expect(settings.pickupOnOpen).toBe(true);
      expect(settings.pickupOnClose).toBe(true);
      expect(settings.intervalBetweenPickupTimes).toBe("10");
    });

    const testRequest = httpTestingController.expectOne("https://upcafe-api.azurewebsites.net/cafe/settings/pickup");
    testRequest.flush(PICKUP_SETTINGS);
  });

  it("should load available pickup times from the backend", () => {

    hoursService.loadAvailablePickupTimesFromApi().subscribe(times => {
      expect(times).toBeTruthy("No times were returned");

      expect(times.length).toBe(5);

      expect(times[0].time).toBe("10:10");
      expect(times[1].time).toBe("10:20");
      expect(times[2].time).toBe("10:30");
      expect(times[3].time).toBe("10:40");
      expect(times[4].time).toBe("10:50");
    });

    const testRequest = httpTestingController.expectOne(req => req.url == "https://upcafe-api.azurewebsites.net/cafe/hours");

    expect(testRequest.request.method).toBe("GET");
    expect(testRequest.request.params.get("search")).toBe("available");

    testRequest.flush(AVAILABLE_TIMES);
  });


  it("should update the pickup settings", () => {

    const CHANGES: PickupSettings = {id: "1", intervalBetweenPickupTimes: "15", pickupOnClose: false, pickupOnOpen: true};
    hoursService.updatePickupSettings(CHANGES).subscribe(updated => {
      expect(updated.id).toBe("1");
      expect(updated.intervalBetweenPickupTimes).toBe("15");
      expect(updated.pickupOnClose).toBe(false);
      expect(updated.pickupOnOpen).toBe(true);
    });

    const req = httpTestingController.expectOne("https://upcafe-api.azurewebsites.net/cafe/settings/pickup");
    expect(req.request.method).toBe("PUT");
    expect(req.request.body.intervalBetweenPickupTimes).toBe("15");

    req.flush(CHANGES);
  });

  it("should give an error if update pickup settings fails", () => {

    const CHANGES: PickupSettings = { id: "1", intervalBetweenPickupTimes: "15", pickupOnClose: false, pickupOnOpen: true };
    hoursService.updatePickupSettings(CHANGES).subscribe(
      () => fail("The update pickup settings request should've failed"),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      })


      const testRequest = httpTestingController.expectOne("https://upcafe-api.azurewebsites.net/cafe/settings/pickup");

      expect(testRequest.request.method).toBe("PUT");

      testRequest.flush(CHANGES, {status: 500, statusText: "Internal Server Error"});
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
