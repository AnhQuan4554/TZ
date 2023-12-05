import { IsNotEmpty } from 'class-validator';

export class SiteDto {
  @IsNotEmpty()
  siteId: string;

  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty()
  siteName: string;

  @IsNotEmpty()
  GPSLocation: string;
}
