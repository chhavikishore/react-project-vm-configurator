import * as React from 'react';
import './CostEstimation.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider } from '@material-ui/core';
import { useState } from 'react';

interface CostEstProps {
  costDetails : Details[],
  totalCost: number
}

interface Details {
  name: string,
  price: number
}

const CostEstimation: React.FC<CostEstProps> = (props) => {

  return (
  <div className="CostEstimation" data-testid="CostEstimation">
    <Card>
      <CardContent>
        <h3>Cost Estimates</h3>
        {
          props.costDetails.length > 0 ? props.costDetails.map((priceDetail: Details) => (
              <div className="details" key={priceDetail.name}>
                <div className="vmName"><b>{priceDetail.name}</b></div>
                <div>{`$${priceDetail.price}`}</div>
              </div>
            )
          ) : null
        }
        
        <Divider/>
        {
          props.costDetails.length > 0 ?
          (<div className="totalPrice"><h3>${props.totalCost}/mo</h3></div>) : null
        }
      </CardContent>
    </Card>
  </div>
  )
};

export default CostEstimation;
