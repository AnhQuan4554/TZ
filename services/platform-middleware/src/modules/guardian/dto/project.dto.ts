import { IsNotEmpty, IsOptional, IsUrl, ValidateIf } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { PrimaryKey } from '@mikro-orm/core';

export class CreateProjectDto {
  @PrimaryKey({ type: 'uuid' })
  projectId: string;

  @IsNotEmpty({ message: 'Project Name should not be empty' })
  projectName: string;

  @IsNotEmpty({ message: 'Project Description should not be empty' })
  projectDescription: string;

  @IsNotEmpty({ message: 'Project Type should not be empty' })
  projectType: string;

  @IsNotEmpty({ message: 'Country should not be empty' })
  country: string;

  @IsNotEmpty({ message: 'Standard should not be empty' })
  standard: string;

  // @IsNotEmpty({ message: 'Standard Project Id should not be empty' })
  standardProjectId: string;

  @ValidateIf((o) => o.standardProjectLink)
  @IsUrl({}, { message: 'Standard Project Link must be an URL address' })
  standardProjectLink?: string;

  plannedUNSDGImpacts?: string;

  constructor() {
    this.projectId = uuidv4();
  }
}

export class UpdateProjectDto {
  projectId: string;

  @IsNotEmpty({ message: 'Project Name should not be empty' })
  projectName: string;

  @IsNotEmpty({ message: 'Project Description should not be empty' })
  projectDescription: string;

  @IsNotEmpty({ message: 'Project Type should not be empty' })
  projectType: string;

  @IsNotEmpty({ message: 'Country should not be empty' })
  country: string;

  @IsNotEmpty({ message: 'Standard should not be empty' })
  standard: string;

  // @IsNotEmpty({ message: 'Standard Project Id should not be empty' })
  standardProjectId: string;

  @ValidateIf((o) => o.standardProjectLink)
  @IsUrl({}, { message: 'Standard Project Link must be an URL address' })
  standardProjectLink?: string;

  @IsOptional()
  plannedUNSDGImpacts?: string;
}
