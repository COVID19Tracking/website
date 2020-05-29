import React from 'react'
import {
  ComparableWarningContent,
  DisparityWarningContent,
} from './table-symbol-key'

export default () => (
  <div>
    <div id="table-disparity-key">
      <DisparityWarningContent />
    </div>
    <div id="table-comparable-key">
      <ComparableWarningContent />
    </div>
  </div>
)
