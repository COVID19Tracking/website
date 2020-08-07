import React from 'react'
import TableauChart from '~components/charts/tableau'
import Total from '~components/common/landing-page/total'
import { Col, Row } from '~components/common/grid'
import { FormatNumber } from '~components/utils/format'
import DownloadLinks from '~components/pages/data/ltc/download-links'
import Layout from '~components/layout'

export default () => (
  <Layout title="Long-term Care" path="/data/ltc">
    <h2>Current outbreak</h2>
    <Row>
      <Col width={[4, 6, 4]}>
        <Total label="Cases" number={<FormatNumber number={0} />} />
      </Col>
      <Col width={[4, 6, 4]}>
        <Total label="Deaths" number={<FormatNumber number={0} />} />
      </Col>
      <Col width={[4, 6, 4]}>
        <Total label="Facilities" number={<FormatNumber number={0} />} />
      </Col>
    </Row>
    <DownloadLinks />

    <p>Some content</p>
    <TableauChart
      id="ltc-1"
      height={700}
      viewUrl="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCare/FigMap?:language=en&:display_count=y&publish=yes&:origin=viz_share_link"
      viewUrlMobile="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCaremobile/FigMap?:language=en&:display_count=y&publish=yes&:origin=viz_share_link"
    />
    <TableauChart
      id="ltc-2"
      height={1600}
      viewUrl="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCare/SummaryTable?:language=en&:display_count=y&:origin=viz_share_link"
      viewUrlMobile="https://public.tableau.com/views/WebsiteCharts-CTPLong-TermCaremobile/SummaryTable?:language=en&:display_count=y&:origin=viz_share_link"
    />
  </Layout>
)
