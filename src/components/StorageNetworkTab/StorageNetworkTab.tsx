import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import './StorageNetworkTab.css';

interface Props {
  handleTabChange: Function,
  vmDetails: any
}

const NetworkSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: 'grey',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const BlackButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "black",
    marginRight: "1rem",
    '&:hover': {
      backgroundColor: "black",
    },
  },
}))(Button);

const storageTypeArray = ["Magnetic disks", "SSD"];
const initialSliderMarksOthers = [{
    value: 0,
    label: '512 GB',
  },
  {
    value: 100,
    label: '1 TB',
  }]

const initialSliderMarksNtwrk = [{
    value: 0,
    label: '512 GB',
  },
  {
    value: 100,
    label: '2 TB',
  }]

const StorageNetworkTab: React.FC<Props> = (props) => {

  const { handleTabChange, vmDetails } = props;
  const [storageType, setStorageType] = React.useState('');
  const [encryptionChecked, setEncryptionChecked] = React.useState(true);
  const [backupChecked, setBackupChecked] = React.useState(true);
  const [capacityRangeMin, setCapacityRangeMin] = React.useState(0); 
  const [capacityRangeMax, setCapacityRangeMax] = React.useState(0);
  const [capacity, setCapacity] = React.useState('');
  const [remarks, setRemark] = React.useState('');
  const [networkSliderValue, setNetworkSliderValue] = React.useState(0);
  const [iops, setIops] = React.useState(0);

  const marks = vmDetails.optimized === "networkOptimized" ? initialSliderMarksNtwrk : initialSliderMarksOthers;
  
  const handleStorageTypeSelection = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStorageType(event.target.value as string);
    if(event.target.value === "Magnetic disks"){
      setCapacityRangeMin(40);
      setCapacityRangeMax(2000);
    } else if(event.target.value === "SSD"){
      setCapacityRangeMin(20);
      setCapacityRangeMax(512);
    }
  }

  const handleEncryptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEncryptionChecked(event.target.checked);
  };

  const handleBackupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackupChecked(event.target.checked);
  };

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(event.target.value as string);
    Number(event.target.value) > 500 ? setIops(1000) : (Number(event.target.value) >= 100 && Number(event.target.value) < 500 ? setIops(600) : setIops(100))
  }

  const handleRemarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemark(event.target.value as string);
  }

  const handleNetworkSliderChange = (event: any, newValue: number | number[]) => {
    setNetworkSliderValue(event.target.value as number);
  }

  return (
    <div className="StorageNetworkTab" data-testid="StorageNetworkTab">
      <Paper elevation={3} className="row">
        <div className="column">
          <b className="heading">Type</b>
          <FormControl variant="outlined" style={{width:"12rem"}}>
            <InputLabel id="typeLabel"></InputLabel>
            <Select
              labelId="typeLabel"
              id="type"
              value={storageType}
              onChange={handleStorageTypeSelection}
              label="type"
            >
            { 
              storageTypeArray.map((storageType: string, index) => (<MenuItem value={storageType} key={index}>{storageType}</MenuItem>)) 
            }
            </Select>
          </FormControl>
        </div>
        <div className="column">
          <b className="heading">Volume</b>
          <div>Root</div>
        </div>
        <div className="column" style={{width:"7rem"}}>
          <b className="heading">Capacity (GB)</b>
          <TextField type="number" id="capacity" InputProps={{ inputProps: { min: capacityRangeMin, max:  capacityRangeMax} }} value={capacity} onChange={handleCapacityChange} variant="outlined" />
        </div>
        <div className="column">
          <b className="heading">Encryption</b>
          <Checkbox checked={encryptionChecked} onChange={handleEncryptionChange} color="primary" inputProps={{ 'aria-label': 'encryption checkbox' }}/>
        </div>
        <div className="column">
          <b className="heading">IOPS</b>
          <div>{iops}</div>
        </div>
        <div className="column">
          <b className="heading">BackUp Required</b>
          <Checkbox checked={backupChecked} onChange={handleBackupChange} color="primary" inputProps={{ 'aria-label': 'back up checkbox' }}/>
        </div>
        <div className="column" style={{width:"10rem"}}>
            <b className="heading">Remarks</b>
            <TextField  id="remarks" className="textField" variant="outlined" value={remarks} onChange={handleRemarkChange}/>
        </div>
      </Paper>
      <Button variant="contained" color="primary" style={{margin:"1%"}}>Add Volume</Button>
      <div className="slider"> 
        <h4>Network Bandwidth Configuration</h4>
        <div>OutBound Traffic</div>
        <NetworkSlider valueLabelDisplay="auto" aria-label="network slider" defaultValue={0} marks={marks} onChange={handleNetworkSliderChange}/>
      </div>
      <footer className="footer">
        <BlackButton variant="contained" 
          onClick={(event) => { 
            handleTabChange(event, 1);
        }}>
          Back
        </BlackButton>
        <Button variant="contained" color="primary" style={{marginRight: "2rem"}} onClick={(event) => handleTabChange(event, 3)}>Proceed</Button>
      </footer>
    </div>
  )
};

export default StorageNetworkTab;
