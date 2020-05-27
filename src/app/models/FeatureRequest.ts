import { User } from './User';

export class FeatureRequest {

  reporter: User;
  id?: number;
  dateReported: Date;
  page?: string;
  description: string;
}
