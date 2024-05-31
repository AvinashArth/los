import React from 'react';
import './Funnel.scss';

const HlpFunnel = ({data}) => {

  return (
    <div className="funnel">
      <div className="trapezoid-1">
        <div className='rect-data hover-effect'>
          <span>Total Leads</span>
          <div className="white-circle">
            <span>{data.all_cust}</span>
          </div>
          <span className='white-line'></span>
        </div>
      </div>
      <div className="trapezoid-2">
        <div className='rect-data hover-effect'>
          <span>Eligible</span>
          <div className="white-circle">
            <span>{data.total_disburse_lead}</span>
          </div>
        </div>
      </div>
      <div className="trapezoid-3">
        <div className='rect-data hover-effect'>
          <span>Offer Generated</span>
          <div className="white-circle">
            <span>{data.total_disburse_amount}</span>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default HlpFunnel
