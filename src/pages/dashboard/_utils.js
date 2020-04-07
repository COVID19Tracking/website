import { timeFormat, timeParse } from 'd3-time-format'
import { format } from 'd3-format'

export const formatNumber = format(',.0f')
export const formatDate = timeFormat('%b. %d')
export const parseDate = timeParse('%Y%m%d')
