import './App.css';
import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ImageTab from './components/ImageTab/ImageTab';
import CostEstimation from './components/CostEstimation/CostEstimation';
import InstanceTab from './components/InstanceTab/InstanceTab';
import StorageNetworkTab from './components/StorageNetworkTab/StorageNetworkTab';
import SummaryTab from './components/SummaryTab/SummaryTab';

const BlackButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "black",
    '&:hover': {
      backgroundColor: "black",
    },
  },
}))(Button);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    color: "black"
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{background: "#E5E5E5"}}
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (children)}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
} 

function App() {
  const regions = ["us-east-1", "us-east-2", "us-west-1", "india-1"]; 
  const classes = useStyles();
  const [title, setTitle] = useState("Choose Image");
  const [tabValue, setTabValue] = useState(0);
  const [region, setRegion] = useState('');
  const [vmDetails, setVmDetails] = useState({})
  const [costDetails, setCostDetails] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [isDisabled, setDisabled] = useState([false, true, true, true, true]);

  const handleTabChange = (event, newValue) => {
    setDisabled((disabledArray) => ([...disabledArray.map((data,index) => index === newValue ? false : data)]))
    setTabValue(newValue);
    newValue === 0 ? setTitle('Choose Image') 
      : newValue === 1 ? setTitle('Choose Instance Type')
        : newValue === 2 ? setTitle('Choose Storage and Network')
          : newValue === 3 ? setTitle('Configure Security')
            : setTitle('Review and Launch')
  };

  const handleChangeRegion = (event) => {
    if(vmDetails.name !== undefined && vmDetails.name.includes("Windows") && (event.target.value === "india-1" || event.target.value === "us-west-1")){
      setRegion(event.target.value);
      setOpenDialog(true);
    } else {
      setRegion(event.target.value);
      setVmDetails((vm) => ({...vm, 
        region: event.target.value
      }));
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setRegion(vmDetails.region);
  }

  const handleDialogCloseYes = () => {
    setOpenDialog(false);
    setVmDetails({region});
    setCostDetails([]);
    setTotalCost(0);
    setTabValue(0)
    setTitle('Choose Image');
  }

  const handleVmSelect = (selectedVm, selectedVmType) => { //for the first Tab (Image Tab)
    setDisabled((disabledArray) => ([...disabledArray.map((data,index) => index === 1 ? false : data)]))
    setDisabled((disabledArray) => ([...disabledArray.map((data,index) => index === 4 ? false : data)]))
    setTabValue(1);
    setVmDetails((vm) => ({...vm, 
      id: selectedVm.id,
      name: selectedVm.name,
      description: selectedVm.description,
      image: selectedVm.image,
      type: selectedVmType,
      price: selectedVm.price,
      region
    }));
    const costArray = costDetails.length > 0 ? costDetails.map((costDetail,index) => index === 0 ? {name: selectedVm.name, price: selectedVm.price} : costDetail) : [{name: selectedVm.name, price: selectedVm.price}]
    setCostDetails(() => (costArray));
    setTotalCost(selectedVm.price);
  }

  const handleInstanceSelect = (instance) => { //for the second Tab (Instance Tab)
    if(instance === null){
      costDetails.map(costDetail => costDetail.name.includes("Memory - ") || costDetail.name.includes("CPU - ") ? setTotalCost(prevCost => prevCost-costDetail.price) : null)
      setCostDetails(() => ([...costDetails.map(costDetail => costDetail.name.includes("Memory - ") || costDetail.name.includes("CPU - ") ? null : costDetail).filter(data => data)]));
      let deletedMemory = vmDetails.memory !==undefined ? delete vmDetails.memory : null;
      let deleteCpu = vmDetails.cpu !==undefined ? delete vmDetails.cpu : null;
      let deleteOptimized = vmDetails.optimized !==undefined ? delete vmDetails.optimized : null;
    } else if(instance !== null){
      if(instance.memory !== '' && instance.cpu !== '' ){
        costDetails.map(costDetail => costDetail.name.includes("Memory - ") || costDetail.name.includes("CPU - ") ? setTotalCost(prevCost => prevCost-costDetail.price) : null)
        const memoryPrice = instance.memory === "64 GB" ? 40 : instance.memory === "32 GB" ? 20 : 0;
        const cpuPrice = instance.cpu === "16 Core" ? 40 : instance.memory === "8 Core" ? 20 : 0;
        setCostDetails(() => ([...costDetails.map(costDetail => costDetail.name.includes("Memory - ") || costDetail.name.includes("CPU - ") ? null : costDetail).filter(data => data), {name: `Memory - ${instance.memory}`, price: memoryPrice }, {name: `CPU - ${instance.cpu}`, price: cpuPrice}]));
        setTotalCost(totalCost => totalCost+memoryPrice+cpuPrice);
        setVmDetails((vm) => ({...vm, 
          memory: instance.memory,
          cpu: instance.cpu, 
          optimized: instance.optimized
        }));
      } else if (instance.memory !== '' && instance.cpu === '' ){
        costDetails.map(costDetail => costDetail.name.includes("Memory - ") ? setTotalCost(prevCost => prevCost-costDetail.price) : null)
        const memoryPrice = instance.memory === "64 GB" ? 40 : instance.memory === "32 GB" ? 20 : 0;
        setCostDetails(() => ([...costDetails.map(costDetail => costDetail.name.includes("Memory - ") ? null : costDetail).filter(data => data), {name: `Memory - ${instance.memory}`, price: memoryPrice }]));
        setTotalCost(totalCost => totalCost+memoryPrice);
        let deleteCpu = vmDetails.cpu !== undefined ? delete vmDetails.cpu : null;
        setVmDetails((vm) => ({...vm, 
          memory: instance.memory,
          optimized: instance.optimized
        }));
      } else if (instance.memory === '' && instance.cpu !== '' ){
        costDetails.map(costDetail => costDetail.name.includes("CPU - ") ? setTotalCost(prevCost => prevCost-costDetail.price) : null)
        const cpuPrice = instance.cpu === "16 Core" ? 40 : instance.memory === "8 Core" ? 20 : 0;
        setCostDetails(() => ([...costDetails.map(costDetail => costDetail.name.includes("CPU - ") ? null : costDetail).filter(data => data), {name: `CPU - ${instance.cpu}`, price: cpuPrice}]));
        setTotalCost(totalCost => totalCost+cpuPrice);
        let deletedMemory = vmDetails.memory !==undefined ? delete vmDetails.memory : null;
        setVmDetails((vm) => ({...vm, 
          cpu: instance.cpu, 
          optimized: instance.optimized
        }));
      }
    }
  }

  return (
    <React.Fragment>
      <header className="header">
        <Paper elevation={2}><h1 style={{marginTop:"0"}}>HVC</h1></Paper>
      </header>
      <div className="body">
        <section className="tabView">
          <div className="titleRegion">
            <h1 className="title">{title}</h1>
            <FormControl variant="outlined" className="region">
              <InputLabel id="region-label">Region</InputLabel>
              <Select
                labelId="region-label"
                id="region"
                value={region}
                onChange={handleChangeRegion}
                label="Region"
              >
              {
                regions.map(region => (<MenuItem value={region} key={region}>{region}</MenuItem>))
              }
              </Select>
            </FormControl>
          </div>
          <Paper className={classes.root}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              centered
            >
              <Tab label="1.Choose Image" {...a11yProps(0)} disabled={isDisabled[0]}/>
              <Tab label="2.Choose Instance Type" {...a11yProps(1)} disabled={isDisabled[1]}/>
              <Tab label="3.Choose Storage and Network" {...a11yProps(2)} disabled={isDisabled[2]}/>
              <Tab label="4.Configure Security" {...a11yProps(3)} disabled={isDisabled[3]}/>
              <Tab label="5.Review and Launch" {...a11yProps(4)} disabled={isDisabled[4]}/>
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <ImageTab region={region} handleVmSelect={handleVmSelect}/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <InstanceTab handleTabChange={handleTabChange} vmDetails={vmDetails} handleInstanceSelect={handleInstanceSelect}/>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <StorageNetworkTab handleTabChange={handleTabChange} vmDetails={vmDetails}/>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              Tab 4
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              <SummaryTab handleTabChange={handleTabChange} vmDetails={vmDetails}/>
            </TabPanel>
          </Paper>
        </section>
        <section className="priceCalculator">
          <CostEstimation costDetails={costDetails} totalCost={totalCost}/>
        </section>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Windows is only available in us-east-1. If you proceed you may lose data. Are you sure you want to proceed ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BlackButton onClick={handleDialogClose} color="primary" variant="contained">No</BlackButton>
          <Button variant="contained" color="primary" onClick={handleDialogCloseYes} autoFocus>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default App;
