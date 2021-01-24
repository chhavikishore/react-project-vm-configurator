import * as React from 'react';
import './SummaryTab.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

interface Props {
  vmDetails: VmDetails
  handleTabChange: Function
}

interface VmDetails {
  id: number,
  name: string,
  description: string,
  image: string,
  type: string,
  price: number,
  region?: string,
  memory?: string,
  cpu?: string,
  optimized?: string
}

const SummaryTab: React.FC<Props> = (props) => {
  return (
  <div className="SummaryTab" data-testid="SummaryTab">  
      {
        props.vmDetails.name !== undefined ?
        ( <React.Fragment>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"2%"}}>
              <div style={{fontSize:"1.5rem"}}><b>Image</b></div>
              <div style={{color:"blue"}} onClick={(event) => props.handleTabChange(event, 0)}><b>EDIT</b></div>
            </div>
            <Card className="vmCard" style={{marginBottom:"2%"}}>
              <CardMedia
                className="cardImage"
                image={props.vmDetails.image}
                title={props.vmDetails.name}
                />
              <CardContent className="vmCardContent">
                <h3>{props.vmDetails.name}</h3>
                <Typography color="textSecondary" gutterBottom>
                  {props.vmDetails.description}
                </Typography>  
              </CardContent>
              <CardContent className="vmCardRadioButton">
                <FormControl component="fieldset">
                  <RadioGroup aria-label={props.vmDetails.name} name={props.vmDetails.name} value={props.vmDetails.type}>
                    <FormControlLabel value={props.vmDetails.type} control={<Radio />} label={props.vmDetails.type} /> 
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </React.Fragment>
        ): null
      }
      {  
        props.vmDetails.optimized !== undefined ? 
        (
          <React.Fragment>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", paddingTop:"2%", width:"40%"}}>
              <div style={{fontSize:"1.5rem"}}><b>Instance</b></div>
              <div style={{color:"blue"}} onClick={(event) => props.handleTabChange(event, 1)}><b>EDIT</b></div>
            </div>
            <Card style={{marginBottom:"2%", width:"40%", display:'flex', flexDirection:'column'}}>
              <CardContent className="vmCardContent">
                <h3>{props.vmDetails.optimized}</h3>
                { props.vmDetails.memory !== undefined ?
                  <Typography color="textSecondary" gutterBottom>
                    {props.vmDetails.memory} RAM
                  </Typography> : null
                } 
                { props.vmDetails.cpu !== undefined ?
                  <Typography color="textSecondary" gutterBottom>
                    {props.vmDetails.cpu} CPU
                  </Typography> : null
                } 
                <Typography color="textSecondary" gutterBottom>
                  {props.vmDetails.optimized} performance
                </Typography>
              </CardContent>
            </Card>
          </React.Fragment>

        ) : null
      }
  </div>
)
}

export default SummaryTab;
