import React from 'react'
import renderer from 'react-test-renderer'
import { useStaticQuery } from 'gatsby'
import BlogList from '~components/pages/homepage/header-hero'

beforeEach(() => {
  useStaticQuery.mockImplementation(() => ({
    allCovidUsDaily: {
      nodes: [
        {
          date: 20200122,
          totalTestResultsIncrease: null
        },
        {
          date: 20200123,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200124,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200125,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200126,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200127,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200128,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200129,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200130,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200131,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200201,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200202,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200203,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200204,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200205,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200206,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200207,
          totalTestResultsIncrease: 1
        },
        {
          date: 20200208,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200209,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200210,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200211,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200212,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200213,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200214,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200215,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200216,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200217,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200218,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200219,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200220,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200221,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200222,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200223,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200224,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200225,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200226,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200227,
          totalTestResultsIncrease: 0
        },
        {
          date: 20200228,
          totalTestResultsIncrease: 7
        },
        {
          date: 20200229,
          totalTestResultsIncrease: 32
        },
        {
          date: 20200301,
          totalTestResultsIncrease: 80
        },
        {
          date: 20200302,
          totalTestResultsIncrease: 161
        },
        {
          date: 20200303,
          totalTestResultsIncrease: 245
        },
        {
          date: 20200304,
          totalTestResultsIncrease: 1070
        },
        {
          date: 20200305,
          totalTestResultsIncrease: 591
        },
        {
          date: 20200306,
          totalTestResultsIncrease: 795
        },
        {
          date: 20200307,
          totalTestResultsIncrease: 770
        },
        {
          date: 20200308,
          totalTestResultsIncrease: 871
        },
        {
          date: 20200309,
          totalTestResultsIncrease: 1796
        },
        {
          date: 20200310,
          totalTestResultsIncrease: 2412
        },
        {
          date: 20200311,
          totalTestResultsIncrease: 3748
        },
        {
          date: 20200312,
          totalTestResultsIncrease: 5137
        },
        {
          date: 20200313,
          totalTestResultsIncrease: 9056
        },
        {
          date: 20200314,
          totalTestResultsIncrease: 4518
        },
        {
          date: 20200315,
          totalTestResultsIncrease: 7658
        },
        {
          date: 20200316,
          totalTestResultsIncrease: 17661
        },
        {
          date: 20200317,
          totalTestResultsIncrease: 15609
        },
        {
          date: 20200318,
          totalTestResultsIncrease: 24639
        },
        {
          date: 20200319,
          totalTestResultsIncrease: 27400
        },
        {
          date: 20200320,
          totalTestResultsIncrease: 36161
        },
        {
          date: 20200321,
          totalTestResultsIncrease: 44753
        },
        {
          date: 20200322,
          totalTestResultsIncrease: 44597
        },
        {
          date: 20200323,
          totalTestResultsIncrease: 57135
        },
        {
          date: 20200324,
          totalTestResultsIncrease: 68613
        },
        {
          date: 20200325,
          totalTestResultsIncrease: 83487
        },
        {
          date: 20200326,
          totalTestResultsIncrease: 100464
        },
        {
          date: 20200327,
          totalTestResultsIncrease: 103070
        },
        {
          date: 20200328,
          totalTestResultsIncrease: 104366
        },
        {
          date: 20200329,
          totalTestResultsIncrease: 88780
        },
        {
          date: 20200330,
          totalTestResultsIncrease: 117450
        },
        {
          date: 20200331,
          totalTestResultsIncrease: 111094
        },
        {
          date: 20200401,
          totalTestResultsIncrease: 107582
        },
        {
          date: 20200402,
          totalTestResultsIncrease: 118023
        },
        {
          date: 20200403,
          totalTestResultsIncrease: 132232
        },
        {
          date: 20200404,
          totalTestResultsIncrease: 228797
        },
        {
          date: 20200405,
          totalTestResultsIncrease: 119659
        },
        {
          date: 20200406,
          totalTestResultsIncrease: 150730
        },
        {
          date: 20200407,
          totalTestResultsIncrease: 152745
        },
        {
          date: 20200408,
          totalTestResultsIncrease: 144433
        },
        {
          date: 20200409,
          totalTestResultsIncrease: 165833
        },
        {
          date: 20200410,
          totalTestResultsIncrease: 157745
        },
        {
          date: 20200411,
          totalTestResultsIncrease: 138547
        },
        {
          date: 20200412,
          totalTestResultsIncrease: 141768
        },
        {
          date: 20200413,
          totalTestResultsIncrease: 132993
        },
        {
          date: 20200414,
          totalTestResultsIncrease: 150416
        },
        {
          date: 20200415,
          totalTestResultsIncrease: 136833
        },
        {
          date: 20200416,
          totalTestResultsIncrease: 162126
        },
        {
          date: 20200417,
          totalTestResultsIncrease: 157920
        },
        {
          date: 20200418,
          totalTestResultsIncrease: 142315
        },
        {
          date: 20200419,
          totalTestResultsIncrease: 166458
        },
        {
          date: 20200420,
          totalTestResultsIncrease: 147512
        },
        {
          date: 20200421,
          totalTestResultsIncrease: 148079
        },
        {
          date: 20200422,
          totalTestResultsIncrease: 314182
        },
        {
          date: 20200423,
          totalTestResultsIncrease: 192012
        },
        {
          date: 20200424,
          totalTestResultsIncrease: 232225
        },
        {
          date: 20200425,
          totalTestResultsIncrease: 271256
        },
        {
          date: 20200426,
          totalTestResultsIncrease: 206403
        },
        {
          date: 20200427,
          totalTestResultsIncrease: 190443
        },
        {
          date: 20200428,
          totalTestResultsIncrease: 202233
        }
      ]
    },
    allCdcDaily: {
      nodes: [
        {
          dailyTotal: 4,
          dateCollected: "1/18"
        },
        {
          dailyTotal: 0,
          dateCollected: "1/19"
        },
        {
          dailyTotal: 7,
          dateCollected: "1/20"
        },
        {
          dailyTotal: 3,
          dateCollected: "1/21"
        },
        {
          dailyTotal: 10,
          dateCollected: "1/22"
        },
        {
          dailyTotal: 36,
          dateCollected: "1/23"
        },
        {
          dailyTotal: 53,
          dateCollected: "1/24"
        },
        {
          dailyTotal: 101,
          dateCollected: "1/25"
        },
        {
          dailyTotal: 79,
          dateCollected: "1/26"
        },
        {
          dailyTotal: 77,
          dateCollected: "1/27"
        },
        {
          dailyTotal: 65,
          dateCollected: "1/28"
        },
        {
          dailyTotal: 102,
          dateCollected: "1/29"
        },
        {
          dailyTotal: 256,
          dateCollected: "1/30"
        },
        {
          dailyTotal: 63,
          dateCollected: "1/31"
        },
        {
          dailyTotal: 311,
          dateCollected: "2/1"
        },
        {
          dailyTotal: 33,
          dateCollected: "2/2"
        },
        {
          dailyTotal: 132,
          dateCollected: "2/3"
        },
        {
          dailyTotal: 93,
          dateCollected: "2/4"
        },
        {
          dailyTotal: 107,
          dateCollected: "2/5"
        },
        {
          dailyTotal: 76,
          dateCollected: "2/6"
        },
        {
          dailyTotal: 93,
          dateCollected: "2/7"
        },
        {
          dailyTotal: 79,
          dateCollected: "2/8"
        },
        {
          dailyTotal: 38,
          dateCollected: "2/9"
        },
        {
          dailyTotal: 38,
          dateCollected: "2/10"
        },
        {
          dailyTotal: 97,
          dateCollected: "2/11"
        },
        {
          dailyTotal: 58,
          dateCollected: "2/12"
        },
        {
          dailyTotal: 48,
          dateCollected: "2/13"
        },
        {
          dailyTotal: 41,
          dateCollected: "2/14"
        },
        {
          dailyTotal: 55,
          dateCollected: "2/15"
        },
        {
          dailyTotal: 25,
          dateCollected: "2/16"
        },
        {
          dailyTotal: 35,
          dateCollected: "2/17"
        },
        {
          dailyTotal: 43,
          dateCollected: "2/18"
        },
        {
          dailyTotal: 69,
          dateCollected: "2/19"
        },
        {
          dailyTotal: 59,
          dateCollected: "2/20"
        },
        {
          dailyTotal: 252,
          dateCollected: "2/21"
        },
        {
          dailyTotal: 257,
          dateCollected: "2/22"
        },
        {
          dailyTotal: 69,
          dateCollected: "2/23"
        },
        {
          dailyTotal: 69,
          dateCollected: "2/24"
        },
        {
          dailyTotal: 63,
          dateCollected: "2/25"
        },
        {
          dailyTotal: 110,
          dateCollected: "2/26"
        },
        {
          dailyTotal: 203,
          dateCollected: "2/27"
        },
        {
          dailyTotal: 266,
          dateCollected: "2/28"
        },
        {
          dailyTotal: 371,
          dateCollected: "2/29"
        },
        {
          dailyTotal: 292,
          dateCollected: "3/1"
        },
        {
          dailyTotal: 669,
          dateCollected: "3/2"
        },
        {
          dailyTotal: 893,
          dateCollected: "3/3"
        },
        {
          dailyTotal: 1285,
          dateCollected: "3/4"
        },
        {
          dailyTotal: 1724,
          dateCollected: "3/5"
        },
        {
          dailyTotal: 1977,
          dateCollected: "3/6"
        },
        {
          dailyTotal: 1518,
          dateCollected: "3/7"
        },
        {
          dailyTotal: 1667,
          dateCollected: "3/8"
        },
        {
          dailyTotal: 3351,
          dateCollected: "03/09"
        },
        {
          dailyTotal: 3551,
          dateCollected: "3/10"
        },
        {
          dailyTotal: 4362,
          dateCollected: "3/11"
        },
        {
          dailyTotal: 6185,
          dateCollected: "3/12"
        },
        {
          dailyTotal: 6847,
          dateCollected: "3/13"
        },
        {
          dailyTotal: 6109,
          dateCollected: "3/14"
        },
        {
          dailyTotal: 5832,
          dateCollected: "3/15"
        },
        {
          dailyTotal: 10983,
          dateCollected: "3/16"
        },
        {
          dailyTotal: 11158,
          dateCollected: "3/17"
        },
        {
          dailyTotal: 10329,
          dateCollected: "3/18"
        },
        {
          dailyTotal: 10037,
          dateCollected: "3/19"
        },
        {
          dailyTotal: 9585,
          dateCollected: "3/20"
        },
        {
          dailyTotal: 5445,
          dateCollected: "3/21"
        },
        {
          dailyTotal: 4792,
          dateCollected: "3/22"
        },
        {
          dailyTotal: 8789,
          dateCollected: "3/23"
        },
        {
          dailyTotal: 8694,
          dateCollected: "3/24"
        },
        {
          dailyTotal: 9075,
          dateCollected: "3/25"
        },
        {
          dailyTotal: 9434,
          dateCollected: "3/26"
        },
        {
          dailyTotal: 9471,
          dateCollected: "3/27"
        },
        {
          dailyTotal: 6188,
          dateCollected: "3/28"
        },
        {
          dailyTotal: 5233,
          dateCollected: "3/29"
        },
        {
          dailyTotal: 10816,
          dateCollected: "3/30"
        },
        {
          dailyTotal: 11102,
          dateCollected: "3/31"
        },
        {
          dailyTotal: 10449,
          dateCollected: "4/1"
        },
        {
          dailyTotal: 11406,
          dateCollected: "4/2"
        },
        {
          dailyTotal: 10981,
          dateCollected: "4/3"
        },
        {
          dailyTotal: 6062,
          dateCollected: "4/4"
        },
        {
          dailyTotal: 5664,
          dateCollected: "4/5"
        },
        {
          dailyTotal: 6106,
          dateCollected: "4/6"
        },
        {
          dailyTotal: 469,
          dateCollected: "4/7"
        },
        {
          dailyTotal: 0,
          dateCollected: "4/8"
        }
      ]
    },
    allCovidUs: {
      nodes: [
        {
          posNeg: 5795728
        }
      ]
    }
  }))
})

describe('Components : Pages : Homepage : Blog list', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BlogList />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
