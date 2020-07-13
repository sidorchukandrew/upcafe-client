import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HoursService } from './hours.service';
import { BLOCKS, PICKUP_SETTINGS, AVAILABLE_TIMES } from 'src/app/db-server/hours-test-data';
import { PickupSettings } from '../models/PickupSettings';
import { HttpErrorResponse } from '@angular/common/http';
import { Block } from '../models/Block';
import { environment } from 'src/environments/environment';

xdescribe('HoursService', () => {

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

  it('should get time blocks for a given day', () => {

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

  it("should save a new time block", () => {
    const NEW_BLOCK: Block = {open: "16:00", close: "18:00", day: "Wednesday", id: "BLOCK_ID_1"};

    const TODAYS_DATE: string = new Date().toDateString();
    hoursService.postBlock(NEW_BLOCK, TODAYS_DATE).subscribe(savedBlock => {

      expect(savedBlock).toBeTruthy("The save did not succeed");

      expect(savedBlock.close).toBe("18:00");
      expect(savedBlock.open).toBe("16:00");
      expect(savedBlock.day).toBe("Wednesday");
      expect(savedBlock.id).toBe("BLOCK_ID_1");
    });

    const testRequest = httpTestingController.expectOne(req => req.url == environment.backendUrl + "/cafe/hours");

    expect(testRequest.request.method).toBe("POST");
    expect(testRequest.request.params.get("weekOf")).toBe(TODAYS_DATE);
    expect(testRequest.request.body.id).toBe("BLOCK_ID_1");

    testRequest.flush(NEW_BLOCK);
  });

  it("should provide an error message when save block request fails", () => {
    const NEW_BLOCK: Block = { open: "16:00", close: "18:00", day: "Wednesday", id: "BLOCK_ID_1" };
    const TODAYS_DATE: string = new Date().toDateString();

    hoursService.postBlock(NEW_BLOCK, TODAYS_DATE).subscribe(
      () => fail(),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe("Internal Server Error");
    });

    const testRequest = httpTestingController.expectOne(req => req.url == environment.backendUrl + "/cafe/hours");
    expect(testRequest.request.params.get("weekOf")).toBe(TODAYS_DATE);
    expect(testRequest.request.body.id).toBe("BLOCK_ID_1");

    testRequest.flush(NEW_BLOCK, {status: 500, statusText: "Internal Server Error"});
  });

  it("should get time blocks for a given week", () => {
    const WEEK_OF: string = new Date().toDateString();
    const BLOCKS: Array<Block> = [{
      open: "22:00",
      close: "23:00",
      day: "Monday",
      id: "BLOCK ID 1"
    }, {
      open: "8:00",
      close: "9:00",
      day: "Tuesday",
      id: "BLOCK ID 2"
      }, {
        open: "22:00",
        close: "23:00",
        day: "Wednesday",
        id: "BLOCK ID 3"
    }];

    hoursService.getBlocks(WEEK_OF).subscribe(result => {
      expect(result).toBeTruthy("No blocks were returned for the given week");
      const blocks: Array<Block> = result.blocks;

      expect(blocks.length).toBe(3);
      const blockOne = blocks[0];

      expect(blockOne.id).toBe("BLOCK ID 1");
      expect(blockOne.open).toBe("22:00");
      expect(blockOne.close).toBe("23:00");
      expect(blockOne.day).toBe("Monday");
    });

    const testRequest = httpTestingController.expectOne(req => req.url == environment.backendUrl + "/cafe/hours");
    expect(testRequest.request.method).toBe("GET");
    expect(testRequest.request.params.get("weekOf")).toBe(WEEK_OF);

    testRequest.flush({blocks: BLOCKS});
  });

  it("should delete a block given an id", () => {
    const ID_TO_DELETE = "BLOCK_ID_10";

    hoursService.deleteBlock(ID_TO_DELETE).subscribe(result => {
      expect(result).toBeFalsy("Something was returned");
    });

    const testRequest = httpTestingController.expectOne(req => req.url == environment.backendUrl + "/cafe/hours");
    expect(testRequest.request.method).toBe("DELETE");
    expect(testRequest.request.params.get("blockId")).toBe(ID_TO_DELETE);

    testRequest.flush(null);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
