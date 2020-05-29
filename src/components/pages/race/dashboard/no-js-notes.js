import React from 'react'
import {
  ComparableWarningContent,
  DisparityWarningContent,
} from './table-symbol-key'

export default () => (
  <div className="js-disabled">
    {DisparityWarningContent}
    {ComparableWarningContent}
  </div>
)
