import React from 'react'

import SectionTitle from '../../components/section-title'

const Block = () => {

  return (
    <>
      <SectionTitle title="Block" subtitle="Account Blocked" />
      <div className="text-center text-2xl pt-32">
        Account is disabled. please contact admin <span className="text-blue-300">info@empowerr.ai</span>
      </div>
    </>
  )
}
export default Block
