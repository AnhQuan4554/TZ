import { IsNotEmpty } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty()
  projectName: string;

  @IsNotEmpty()
  projectDescription: string;

  @IsNotEmpty()
  projectType: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  standard: string;

  @IsNotEmpty()
  standardProjectId: string;

  standardProjectLink: string;
  plannedUNSDGImpacts: string;
}
