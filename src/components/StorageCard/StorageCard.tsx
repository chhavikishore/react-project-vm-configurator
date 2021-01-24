import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import './StorageCard.css';

const storageTypeArray = ["Magnetic disks", "SSD"];

interface Props {
  handleStorageTypeSelection : Function,
  capacityRangeMin : number,
  capacityRangeMax : number,
  handleCapacityChange: Function,
  handleEncryptionChange: Function,
  handleBackupChange: Function,
  handleRemarkChange: Function
}

const StorageCard: React.FC<Props> = (props) => {
  
  const { 
    handleStorageTypeSelection,
    capacityRangeMin,
    capacityRangeMax,
    handleCapacityChange,
    handleEncryptionChange,
    handleBackupChange,
    handleRemarkChange
  } = props;

  return (
  <Paper elevation={3} className="row">
    {/* <div className="column">
      <b className="heading">Type</b>
      <FormControl variant="outlined" style={{width:"12rem"}}>
        <InputLabel id="typeLabel"></InputLabel>
        <Select
          labelId="typeLabel"
          id="type"
          value=''
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
      <div>Ext</div>
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
    </div> */}
  </Paper>
)
}

export default StorageCard;
