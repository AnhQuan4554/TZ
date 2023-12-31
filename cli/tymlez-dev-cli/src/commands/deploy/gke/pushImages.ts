import execSH from 'exec-sh';

export async function pushImages({
  gcpProjectId,
  imageTag,
  imageName,
}: {
  gcpProjectId: string;
  imageTag: string;
  imageName: string;
}) {
  console.log('Pushing images to ', { gcpProjectId, imageTag });

  await pushImage({
    gcpProjectId,
    imageName,
    imageTag,
  });
}

async function pushImage({
  gcpProjectId,
  imageName,
  imageTag,
}: {
  gcpProjectId: string;
  imageName: string;
  imageTag: string;
}) {
  await execSH.promise(
    [
      `docker`,
      `tag`,
      imageName,
      `asia.gcr.io/${gcpProjectId}/${imageName}:${imageTag}`,
    ].join(' '),
  );

  await execSH.promise(
    [
      `docker`,
      `push`,
      `asia.gcr.io/${gcpProjectId}/${imageName}:${imageTag}`,
    ].join(' '),
  );

  await execSH.promise(
    [
      `docker`,
      `tag`,
      imageName,
      `asia.gcr.io/${gcpProjectId}/${imageName}:latest`,
    ].join(' '),
  );

  await execSH.promise(
    [`docker`, `push`, `asia.gcr.io/${gcpProjectId}/${imageName}:latest`].join(
      ' ',
    ),
  );
}
