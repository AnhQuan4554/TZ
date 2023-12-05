export class Settings {
  static apiKey = process.env.NEW_RELIC_USER_API_KEY || '';

  static clientLabel = process.env.NEW_RELIC_LABELS || '';
  static clientPrefix = this.clientLabel
    .split(';')
    .map((x) => x.split(':').pop())
    .join('-');

  static policyName = `${Settings.clientPrefix}-guardian`;
  static accountId = 3497631;
  static slackChannel = process.env.NEW_RELIC_SLACK_CHANNEL_NAME || '';
  static env = `${Settings.clientPrefix}-tymlez-guardian-extensions`;
}
