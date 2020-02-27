'use latest'

var slack = require('slack-notify')(process.env.SLACK_WEBHOOK_URL)

module.exports = event => {
  const reportType = event.data.Report.node.isAssessment
    ? 'assessment'
    : 'test report'

  slack.send({
    unfurl_links: 1,
    attachments: [
      {
        fallback: `Hey team! :wave: There is a new acoustic ${reportType} available :tada:. https://acousticselector.com/reports/${event
          .data.Report.node.id}`,
        color: '#36a64f',
        pretext: `Hey team! :wave: There is a new acoustic ${reportType} available :tada:. https://acousticselector.com/reports/${event
          .data.Report.node.id}`,
        title: `${event.data.Report.node.core.thickness} ${event.data.Report
          .node.core.manufacturer.name} ${event.data.Report.node.core
          .name} (${event.data.Report.node.core.fireRating})`,
        title_link: `https://acousticselector.com/reports/${event.data.Report
          .node.id}`,

        fields: [
          {
            title: 'dBRw',
            value: `${event.data.Report.node.dbrw}`,
            short: false
          },
          {
            title: 'Core',
            value: `${event.data.Report.node.core.thickness} ${event.data.Report
              .node.core.manufacturer.name} ${event.data.Report.node.core
              .name}`,
            short: false
          },
          {
            title: 'Door Type',
            value: `${event.data.Report.node.doorType}`,
            short: false
          },
          {
            title: 'Fire Rating',
            value: `${event.data.Report.node.core.fireRating}`,
            short: false
          },
          {
            title: 'Products tested',
            value: `...`,
            short: false
          }
        ]
      }
    ]
  })
}
