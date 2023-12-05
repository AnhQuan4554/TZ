// this wrapper entrypoint to make sure environment variable are loaded before run main application.
require('@tymlez/backend-libs/bootstrap')
  .bootstrapEnvironment()
  .then(() => {
    console.log('start main application');
    require('./dist/main');
  })
  .catch(() => {
    console.log(
      'Fail to load environment var, continue to start main application',
    );
    require('./dist/main');
  });
