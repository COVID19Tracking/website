import React from 'react'

export default function UsAreaChartContainer() {
  return (
    <section>
      <div>
        <h4>Total cumulative deaths by day in the US</h4>
      </div>
      <div>
        <p>
          Organized, collective, and timely response from the government and
          other authorities is a key factor in saving lives. One metric, though
          a sober one, we can use to measure the response’s effectiveness is the
          number of deaths attributed to the virus per day, and even per state.
        </p>
        <p>
          We recommend using total numbers for plotting deaths to compare one
          U.S. state against another. In this case, adjusting per capita adds a
          layer of abstraction to the story, making the numbers less graspable
          and powerful. It’s easier to picture 200 fatalities than 0.0001
          fatalities per capita, as John Burn-Murdoch, a data journalist at the
          Financial Times, pointed out.
        </p>
        <p>
          However, data tracking deaths attributed to the novel coronavirus is
          still a big gray area. Because a lot of hospitals are full, not
          everyone is receiving medical treatment and fatalities due to the
          virus might not be showing up in coronavirus statistics.
        </p>
        <p>
          Italian authorities say there’s a significant number of people who
          have died but whose deaths were not linked to the coronavirus. That
          could be because they died at home or nursing homes without access to
          testing and medical treatment.
        </p>
        <p>
          A good solution is comparing the number of deaths at a certain
          location since the beginning of the outbreak to fatalities in that
          same period in previous years.
        </p>
        <p>
          Using confirmed cases to track the severity of the virus in one state
          is misleading as some states are not reporting positive cases due to
          lack of testing.
        </p>
      </div>
    </section>
  )
}
