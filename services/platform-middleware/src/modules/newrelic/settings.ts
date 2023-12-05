export class Settings {
  static apiKey = process.env.NEW_RELIC_USER_API_KEY || '';
  static clientLabel = process.env.NEW_RELIC_LABELS || '';
  static clientPrefix = this.clientLabel
    .split(';')
    .map((x) => x.split(':').pop())
    .join('-');

  static policyName = `${this.clientPrefix}-platform`;
  static accountId = 3497631;
  static browserMonitorName = `${this.clientPrefix}-browser-monitor`;
  static slackChannel =
    process.env.NEW_RELIC_SLACK_CHANNEL_NAME || 'platform-apm-notifications';
}
