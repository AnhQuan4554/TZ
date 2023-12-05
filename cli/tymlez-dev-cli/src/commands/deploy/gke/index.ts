import assert from 'assert';
// import { updateTerraformVariables } from 'cli/tymlez-dev-cli/src/libs';
import execSH from 'exec-sh';
import { patchGuardianServiceTF } from '../backend/terraform';
import { pushImages } from './pushImages';


export async function deploy(imageName: string) {
  const { ENV, CLIENT_NAME, GIT_SHA, GUARDIAN_TF_WS_NAME } = process.env;
  assert(ENV, `ENV is missing`);
  assert(ENV !== 'local', `Cannot deploy to local`);
  assert(CLIENT_NAME, `CLIENT_NAME is missing`);
  assert(GUARDIAN_TF_WS_NAME, `GUARDIAN_TF_WS_NAME is missing`);

  const imageTag = GIT_SHA ?? Date.now().toString();
  const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID || ''
  
  await execSH.promise(
    [
      'docker',
      'build',
      '-t',
      imageName,
      '-f Dockerfile',
      '--progress plain',
      '../..', 
    ].join(' '),
    );
    
    await execSH.promise(['gcloud', 'auth', 'configure-docker'].join(' '));
    
    await pushImages({
      gcpProjectId: GCP_PROJECT_ID,
      imageTag,
      imageName,
    });
    
    // patch terraform vars
    await patchGuardianServiceTF(GUARDIAN_TF_WS_NAME, imageName, imageTag)
  

  
}
