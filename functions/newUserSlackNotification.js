'use latest'

var slack = require('slack-notify')(process.env['SLACK_WEBHOOK_URL'])

module.exports = event => {
  slack.send({
    text: `Hey team :wave: - ${event.data.User.node
      .name} registered for an account on AcousticSelector.com`,
    unfurl_links: 1
  })
}
