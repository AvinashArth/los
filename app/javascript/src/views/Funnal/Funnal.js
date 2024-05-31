import React from 'react';
import { useState } from 'react';
import { Dropdown,Input } from 'reactstrap';
import './Funnel.scss';
import HlpFunnel from './HlpFunnel';

const Funnel = ({data, handleInput}) => {

  const [productType, setProductType] = useState('Credit');

  const handleProductInput = () => {
    setProductType(value);
  }

  return (
    <div className='leads-funnel'>
      <div className="card">
        <div className="card-body funnel-body">
          <div className="top-bar-funnel">
            <Dropdown
              list={['Credit', 'Insurance']}
              identifier={'product_type'}
              handleInput={handleProductInput}
              value={productType}
            />
            <Input 
              type={'date'}
              identifier={'funnel_date_range'}
              handleInput={handleInput}
            />
          </div>
          <div className="colored-funnel">
            
                <HlpFunnel data={data} />
              
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Funnel;
