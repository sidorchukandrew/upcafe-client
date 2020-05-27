import { User } from './User';

export class BugReport {

  reporter: User;
  dateReported: Date;
  platform: string;
  browser: string;

  expectation ?: string;
  actual ?: string;
  page?: string;
  extraInformation?: string;

  id?: number;

}
