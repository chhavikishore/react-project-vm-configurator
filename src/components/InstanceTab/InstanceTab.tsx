import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import './InstanceTab.css';

interface Config {
  'generalPurpose': memoryCpu,
  'storageOptimized': memoryCpu,
  'computeOptimized': memoryCpu,
  'networkOptimized': memoryCpu 
}

interface memoryCpu {
  memory: string[],
  vcpu: string[]
}

interface Props {
  handleTabChange: Function
  vmDetails: any,
  handleInstanceSelect: Function
}

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    button: {
      marginTop: theme.spacing(2),
      padding: "1% 1.5%",
      background: "white"
    },
    buttonSelected: {
      marginTop: theme.spacing(2),
      padding: "1% 1.5%",
      background: "white",
      borderColor: "blue",
      color: "blue"
    }
  }),
);

const InstanceTab: React.FC<Props> = (props) => {

  const memoryCpu: Config = {
    'generalPurpose': {
      memory: ["256 MB", "512 MB", "1 GB", "2 GB", "4 GB"],
      vcpu: ["1 Core", "2 Core", "4 Core"]
    },
    'storageOptimized': {
      memory: ["16 GB", "32 GB", "64 GB"],
      vcpu: ["1 Core", "8 Core", "16 Core"]
    },
    'computeOptimized': {
      memory: ["16 GB", "32 GB", "64 GB"],
      vcpu: ["1 Core", "2 Core", "8 Core", "16 Core"]
    },
    'networkOptimized': {
      memory: ["256 MB", "512 MB", "1 GB", "2 GB", "4 GB", "16 GB", "32 GB", "64 GB"],
      vcpu: ["1 Core", "2 Core", "4 Core", "8 Core", "16 Core"]
    }
  }
  
  const classes = useStyles();
  const { handleTabChange, vmDetails, handleInstanceSelect} = props;
  const [configName, setConfigName] = React.useState(vmDetails.optimized !== undefined ? vmDetails.optimized : 'generalPurpose');
  const [memory, setMemoryDetails] = React.useState(vmDetails.memory !== undefined ? vmDetails.memory:'');
  const [cpu, setCpuDetails] = React.useState(vmDetails.cpu !== undefined ? vmDetails.cpu : '');
  const [openDialogBox, setOpenDialogBox] = React.useState(false);
  const [dialogContent, setDialogBoxContent] = React.useState('');
  const [temporaryConfig, setTemporaryConfig] = React.useState('');
  const initialSelectedArray = [{name:'generalPurpose', selected:true},{name:'computeOptimized', selected:false},{name:'storageOptimized', selected:false},{name:'networkOptimized', selected:false}]
  const selectedArray= vmDetails.optimized !== undefined ? initialSelectedArray.map((data) => data.name === vmDetails.optimized ? {...data, selected: true} : {...data, selected:false}) : initialSelectedArray;
  const [selected, setSelected] = React.useState(selectedArray);

  const handleConfigButton = (name: string) => {
    setTemporaryConfig(name);
    if(memory !== '' && cpu === '') {
      Object.entries(memoryCpu).map((value) => {
        if(value[0] === name && !value[1].memory.includes(memory)) {
          setDialogBoxContent(`${memory} is not available for ${name}. Are you sure you want to proceed?`);
          setOpenDialogBox(true);
        } else if(value[0] === name && value[1].memory.includes(memory)) {
          const selectArray = selected.map((data) => data.name === name ? {...data, selected: true } : {...data, selected: false});
          setSelected(selectArray);
          setConfigName(name)
          setMemoryDetails('');
          setCpuDetails('');
          handleInstanceSelect(null);  
        }
        return null;
      })
    } else if(memory === '' && cpu !== '') {
      Object.entries(memoryCpu).map((value) => {
        if(value[0] === name && !value[1].vcpu.includes(cpu)) {
          setDialogBoxContent(`${cpu} is not available for ${name}. Are you sure you want to proceed?`);
          setOpenDialogBox(true);
        } else if(value[0] === name && value[1].vcpu.includes(cpu)) {
          const selectArray = selected.map((data) => data.name === name ? {...data, selected: true } : {...data, selected: false});
          setSelected(selectArray);
          setConfigName(name)
          setMemoryDetails('');
          setCpuDetails('');
          handleInstanceSelect(null);  
        }
        return null;
      })
    } else if(memory !== '' && cpu !== '') {
      Object.entries(memoryCpu).map((value) => {
        if(value[0] === name && !value[1].memory.includes(memory) && !value[1].vcpu.includes(cpu)) {
          setDialogBoxContent(`${memory} and ${cpu} is not available for ${name}. Are you sure you want to proceed?`);
          setOpenDialogBox(true);
        } else if(value[0] === name && value[1].memory.includes(memory) && !value[1].vcpu.includes(cpu)) {
          setDialogBoxContent(`${cpu} is not available for ${name}. Are you sure you want to proceed?`);
          setOpenDialogBox(true);
        } else if(value[0] === name && !value[1].memory.includes(memory) && value[1].vcpu.includes(cpu)) {
          setDialogBoxContent(`${memory} is not available for ${name}. Are you sure you want to proceed?`);
          setOpenDialogBox(true);
        } else if(value[0] === name && value[1].memory.includes(memory) && value[1].vcpu.includes(cpu)){
          const selectArray = selected.map((data) => data.name === name ? {...data, selected: true } : {...data, selected: false});
          setSelected(selectArray);
          setConfigName(name)
          setMemoryDetails('');
          setCpuDetails('');
          handleInstanceSelect(null);                                     
        }
        return null;
      })
    } else { 
      const selectArray = selected.map((data) => data.name === name ? {...data, selected: true } : {...data, selected: false});
      setSelected(selectArray);
      setConfigName(name)
    }
  }

  const handleDialogBoxClose = () => {
    const selectArray = selected.map((data) => data.name === configName ? {...data, selected: true } : {...data, selected: false});
    setSelected(selectArray);
    setConfigName(configName);
    setOpenDialogBox(false);
  }

  const handleDialogBoxCloseYes = () => {
    setMemoryDetails('');
    setCpuDetails('');
    handleInstanceSelect(null);
    const selectArray = selected.map((data) => data.name === temporaryConfig ? {...data, selected: true } : {...data, selected: false});
    setSelected(selectArray);
    setConfigName(temporaryConfig);
    setOpenDialogBox(false);
  }

  return (
    <div className="InstanceTab" data-testid="InstanceTab">
      <section className="configButtons">
        <Button className={selected[0].selected ? classes.buttonSelected : classes.button} variant="outlined" disableRipple  id="generalPurpose" onClick={() => handleConfigButton("generalPurpose")}><b>General Purpose</b></Button>
        <Button className={selected[1].selected ? classes.buttonSelected : classes.button} variant="outlined" disableRipple  id="computeOptimized" onClick={() => handleConfigButton("computeOptimized")}><b>CPU Optimized</b></Button>
        <Button className={selected[2].selected ? classes.buttonSelected : classes.button} variant="outlined" disableRipple  id="storageOptimized" onClick={() => handleConfigButton("storageOptimized")}><b>Storage Optimized</b></Button>
        <Button className={selected[3].selected ? classes.buttonSelected : classes.button} variant="outlined" disableRipple  id="networkOptimized" onClick={() => handleConfigButton("networkOptimized")}><b>Network Optimized</b></Button>
      </section>
      <section style={{marginLeft: "2rem"}}>
        <h3>Create Configuration</h3>
        <div>
          { memoryCpu.hasOwnProperty(configName) ? 
          (<React.Fragment>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="cpuLabel">CPU Cores</InputLabel>
              <Select
                labelId="cpuLabel"
                id="cpu"
                value={cpu}
                onChange={(event) => {
                    setCpuDetails(event.target.value as string);
                    handleInstanceSelect({ memory, cpu: event.target.value, optimized:configName })
                  }
                }
                label="CPU"
              >
              { 
                Object.entries(memoryCpu).map((value) => value[0] === configName ? 
                value[1].vcpu.map((vcpu: string) => (<MenuItem value={vcpu}>{vcpu}</MenuItem>))
                 : null)  
              }
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="memoryLabel">Memory</InputLabel>
              <Select
                labelId="memoryLabel"
                id="memory"
                value={memory}
                onChange={(event) => {
                    setMemoryDetails(event.target.value as string)
                    handleInstanceSelect({ memory: event.target.value, cpu, optimized:configName })
                  }
                }
                label="Memory"
              >
              { 
                Object.entries(memoryCpu).map((value) => value[0] === configName ? 
                value[1].memory.map((memory: string) => (<MenuItem value={memory}>{memory}</MenuItem>))
                 : null)  
              }
              </Select>
            </FormControl>
          </React.Fragment>) : null
         }
        </div>
      </section>
      <footer className="footer">
        <BlackButton variant="contained" 
          onClick={(event) => { 
            handleTabChange(event, 0); 
            handleInstanceSelect(null);
        }}>
          Back
        </BlackButton>
        <Button variant="contained" color="primary" style={{marginRight: "2rem"}} onClick={(event) => { if(cpu !=='' && memory !== ''){handleTabChange(event, 2)}}}>Proceed</Button>
      </footer>
      <Dialog
        open={openDialogBox}
        onClose={handleDialogBoxClose}
        aria-labelledby="alertBox-dialog-title"
        aria-describedby="alertBox-dialog-memory-cpu-warning"
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alertBox-dialog-memory-cpu-warning">{dialogContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <BlackButton onClick={handleDialogBoxClose} color="primary" variant="contained">No</BlackButton>
          <Button variant="contained" color="primary" onClick={handleDialogBoxCloseYes} autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InstanceTab;
