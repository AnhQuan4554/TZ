import type { IProjectType } from './IProjectType';

export type IProject = {
  projectId: string; //Project Id - Unique identifier for the Project
  projectName: string; //Project Name - Descriptive name for the Project
  projectDescription: string; //Project Description - Short summary of the project
  projectType: IProjectType; //Project Type-Type of project
  country: string; //Country - Country code for the location of the project
  standard: string; //Standard - The name of the standards body this project is registered with
  standardProjectId: string; //Standard Project Id - The unique identifier allocated to the project by the standards body
  standardProjectLink?: string; //Standard Project Link - URL for the project as listed on the standards registry
  plannedUNSDGImpacts?: string; //Planned United Nations Sustainable Development Goal Impacts - List of UNSDGs that this project is expected to impact
  isPublished: boolean; //
};
