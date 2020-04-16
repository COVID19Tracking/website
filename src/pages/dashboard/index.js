import React from 'react'
import Layout from '../../components/layout'
import CDCComparisonContainer from './_CDCComparisonContainer'
import MapContainer from './_MapContainer'
import StateCumulativeTestsContainer from './_StateCumulativeTestsContainer'
import StateCumulativeDeathsContainer from './_StateCumulativeDeathsContainer'
import UsCumulativeDeathsContainer from './_UsCumulativeDeathsContainer'
import UsPositiveAndTotalTestsContainer from './_UsPositiveAndTotalTestsContainer'

import './dashboard.scss'

const DashboardPage = () => {
  return (
    <Layout title="Visual Dashboard">
      <strong>
        <p>
          Explore visualizations from the COVID Tracking Project dataset and
          guidance to help you present the data clearly and accurately.
        </p>
      </strong>
      <p>
        Complete, up-to-date testing and outcomes data is essential to a
        successful public health response to the US COVID-19 outbreak, but that
        data{' '}
        <a href="https://covidtracking.com/why-it-matters">
          is not being published by the Centers for Disease Control and
          Prevention (CDC)
        </a>
        or any other governmental entity.
      </p>
      <p>
        The COVID Tracking Project exists to help fill that gap. We collect the
        best available testing and patient-outcomes data from every US state and
        territory and the District of Columbia, with full daily updates to the
        entire dataset.
      </p>
      <p>
        <strong>Please note:</strong> Our data will always be an undercount. We
        can only track tests that states report, and not all states report all
        tests. More significantly, per-capita testing levels in the US remain
        low, which means that an unknown but probably very large number of
        people are sick, but aren&rsquo;t being tested. But this is the data we
        can collect, and it provides the most detailed information available
        about the shape and relative severity of outbreaks in US states and
        territories.
      </p>
      <CDCComparisonContainer />
      <p>
        According to our data, US metropolitan areas have been hit the hardest.
        New York leads the rest of the country in the number of positive cases
        by more than 120,000, followed by New Jersey, Massachusetts, and
        Louisiana.
      </p>
      <p>
        Because COVID-19 testing and reporting are inconsistent among states,
        it&rsquo;s easy to misinterpret the data. That makes it especially
        important to create clear and accurate visualizations. Otherwise even
        simple and minimalistic graphics can be misleading. If you plan to
        display data from the COVID Tracking Project yourself, please closely
        follow these design and visualization guidelines.
      </p>
      <strong>Consider normalizing the data.</strong>
      <p>
        If you&rsquo;re creating a{' '}
        <a href="http://seeingdata.org/taketime/inside-the-chart-choropleth-map/">
          choropleth map
        </a>{' '}
        (where each state is shaded in proportion to a statistical variable),
        make sure you encode a population-controlled rate, such as
        &ldquo;positive tests per one million people.&rdquo; If you want to show
        absolute numbers, such as the number of new positive cases per day, use
        a{' '}
        <a href="http://seeingdata.org/taketime/inside-the-chart-proportional-symbol-map/">
          symbol map
        </a>
        .
      </p>
      <strong>Choose colors carefully.</strong>
      <p>
        Readers are likely experiencing some latent anxiety, so do your best to
        neither make light of the situation nor be alarmist about it. One
        application of this is in your color choice: You don&rsquo;t want your
        map&rsquo;s color scheme or design to minimize the situation by being
        overly playful or lighthearted. You also don&rsquo;t want to select
        colors that suggest the worst possible outcome.
      </p>
      <MapContainer />
      <strong>Include the denominator.</strong>
      <p>
        Testing is one of the most important tools in controlling an outbreak.
        When universal testing is implemented, people who are infected with the
        virus can be isolated from folks who test negative. This functions as a
        targeted social distancing technique and can help slow the outbreak.
      </p>
      <p>
        Charting the number of positive tests alone is often problematic. Simple
        case counts show where people are being tested, not necessarily where
        people are sick. To illustrate the point, a state that reports three
        cases of COVID-19 after testing 2,000 people is probably in a different
        stage of its outbreak than a state that reports three cases but has only
        tested 20 people. But if all you have is a case count, those states look
        exactly the same. That is why we need to include the total number of
        tests as a denominator.
      </p>
      <UsPositiveAndTotalTestsContainer />
      <strong>Be mindful when comparing states.</strong>
      <p>
        By comparing positive tests to total tests in each state and territory,
        we can get a sense of how widespread a state’s testing regime might be
        (while keeping in mind that{' '}
        <a href="https://www.census.gov/data/tables/2010/dec/density-data-text.html">
          population densities vary widely across the country
        </a>
        ).
      </p>
      <StateCumulativeTestsContainer />
      <strong>Don’t ignore data uncertainty.</strong>
      <p>
        Though this is a national crisis, each US state or territory reports its
        data differently. We track numbers provided by each state, but the
        quality and frequency of{' '}
        <a href="https://covidtracking.com/about-tracker/#data-quality-grade">
          reports vary widely
        </a>
        . Transparency is crucial. Be honest about what is in the data that you
        are charting and what isn’t. Footnotes and annotations can help you make
        these disclaimers. We publish details about inconsistencies in data
        reporting{' '}
        <a href="https://covidtracking.com/data">
          for every state and territory
        </a>
        .
      </p>
      <strong>Use absolute numbers for death counts.</strong>
      <p>
        An organized, collective, and timely response from the government and
        other authorities is a key factor in saving lives. One metric you can
        use to measure the response’s effectiveness is the number of deaths
        attributed to the virus per day and/or per state or territory.
      </p>
      <p>
        We recommend using total numbers for plotting deaths to compare one US
        state or territory against another. In this case, adjusting per capita
        adds a layer of abstraction to the graphic. This reduces the
        data&rsquo;s power and the reader&rsquo;s comprehension. It’s easier to
        picture 200 fatalities than 0.0001 fatalities per capita, as{' '}
        <a href=" https://twitter.com/janinegibson/status/1244519429825802240">
          John Burn-Murdoch
        </a>
        , a data journalist at the <em>Financial Times</em>, pointed out.
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <UsCumulativeDeathsContainer />
        <StateCumulativeDeathsContainer />
      </div>
      <strong>Remember that even death counts are uncertain.</strong>
      <p>
        Data that tracks COVID-19 death counts is still a gray area. Though some
        experts prefer to measure the pandemic&rsquo;s severity using the number
        of deaths instead of total cases, several factors could bias COVID-19
        mortality data.
      </p>
      <p>
        There are some concerns that official death statistics may overcount
        COVID-19 fatalities by assuming any patient who tests positive for the
        virus was killed by it. But Marc Lipsitch, a Harvard University
        epidemiologist, told{' '}
        <a href="https://factcheck.org/2020/04/social-media-posts-make-baseless-claim-on-covid-19-death-toll/">
          FactCheck.org
        </a>
        &nbsp;that &ldquo;the number of such cases will be small.&rdquo;
        Undercounting is a bigger problem, he says. &ldquo;A greater issue is
        errors in the other direction.&rdquo;
      </p>
      <p>
        If people die from COVID-19 before they are tested, their death might
        not be included in the official tally. For example, a{' '}
        <a href="https://gothamist.com/news/surge-number-new-yorkers-dying-home-officials-suspect-undercount-covid-19-related-deaths">
          WNYC/Gothamist investigation
        </a>{' '}
        found that as of Tuesday, April 7, around 200 New Yorkers had died at
        home every day without access to testing and medical treatment.
        That&rsquo;s 10 times higher than NYC&rsquo;s typical at-home death
        rate. These deaths are likely caused by COVID-19. If this effect is
        widespread in the United States, that means official statistics
        undercount the disease’s fatality rate.
      </p>
      <p>
        To get better grounding when interpreting death rates, consider
        comparing COVID-19 mortality rates for a given location since the
        beginning of the outbreak to fatalities during the same period in
        previous years.
      </p>
      <strong>Be clear and honest.</strong>
      <p>
        While news is moving faster than ever to keep up with the pace of the
        pandemic spread, designers and visualization experts&rsquo; goal is to
        present COVID-19 data in a clear and honest way. Provide context, and
        consider the tips above to avoid common pitfalls in data reporting as we
        seek to inform people during this time of crisis.
      </p>
      <strong>Notes</strong>
      <p>
        We derive the total value by adding together the positive and negative
        value for each state. This is to account for differences in how states
        reporting pending tests
      </p>
      <p>
        We changed the way we report California data on April 1. We synced up
        with the{' '}
        <a href="https://public.tableau.com/views/COVID-19PublicDashboard/Covid-19Public?:embed=y&:display_count=no&:showVizHome=no">
          states&rsquo;s data dashboard
        </a>
        , whereas previously we had published testing updates from other
        sources. This led to a drop in California&rsquo;s reported cases and
        deaths in our dataset on April 1, since the state&rsquo;s data lags
        behind our previous sources.
      </p>
      <p>
        <strong>Source:</strong> The COVID Tracking Project
      </p>
      <p>
        Graphics and development by Jeremia Kimelman, Gabe O&rsquo;Leary, Melba
        Madrigal, Vijay Sharwar, Aaron Mullan, Nathan Selikoff, Alice Goldfarb,
        Jane Friedhoff, Norman Wang, Daniel Gilbert
      </p>
      <p>Visual editing by Júlia Ledur</p>
      <p>Text editing by Hannah Waters</p>
    </Layout>
  )
}

export default DashboardPage
