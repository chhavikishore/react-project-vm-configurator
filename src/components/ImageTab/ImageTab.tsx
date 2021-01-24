import * as React from 'react';
import './ImageTab.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';
import linuxImage from '../../images/linux.png';
import windowsImage from '../../images/windows.png';

interface VmImage {
 id: number,
 name: string,
 description: string,
 price: number,
 image: string,
 type: Type[],
 regionsAvailability: string[]
}

interface Type {
  id: number,
  name: string
}

interface Props {
  region: string,
  handleVmSelect: Function
}

const ImageTab: React.FC<Props> = (props) => {
  const vmImage: VmImage[] = [
    {
      id: 1,
      name: "Linux 2 image", 
      description: "Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
      price: 243.61, 
      image: `${linuxImage}`,
      type: [{ id:11, name: "64-bit (x86)"},{ id:12, name: "64-bit (ARM)"}],
      regionsAvailability: ["us-east-1", "us-east-2", "us-west-1", "india-1"]
    },
    {
      id: 2,
      name: "Ubuntu Server 18.04 LTS",
      description: "Ubuntu Server comes with 5 years of support. It provides Ubuntu 18.04 tuned for optimal performance", 
      price: 243.61,
      image: `${linuxImage}`,
      type: [{ id:21, name:"64-bit (x86)"},{ id:22, name:"64-bit (ARM)"}],
      regionsAvailability: ["us-east-1", "us-east-2", "us-west-1", "india-1"]
    },
    {
      id: 3,
      name: "Red Hat Enterprise Linux 8",
      description: "Red Hat comes with 5 years of support. It provides Linux kernel 8 tuned for optimal performance",  
      price: 300,
      image: `${linuxImage}`,
      type: [{ id: 31, name:"64-bit (x86)"}, {id:32, name:"64-bit (ARM)"}],
      regionsAvailability: ["us-east-1", "us-east-2", "us-west-1", "india-1"]
    },
    {
      id: 4,
      name: "Microsoft Windows Server 2019 Base",
      description: "Microsoft Windows Server comes with 5 years of support. It provides Microsoft Windows Server 2019 tuned for optimal performance",  
      price: 338.77,
      image: `${windowsImage}`,
      type: [{id:41, name:"64-bit (ARM)"}],
      regionsAvailability: ["us-east-1", "us-east-2"]
    },
    {
      id: 5,
      name: "SUSE Linux Enterprise Server", 
      description: "SUSE Linux comes with 5 years of support. It provides Linux 18.04 tuned for optimal performance",  
      price: 200.22,
      image: `${linuxImage}`,
      type: [{ id:51, name:"64-bit (x86)"},{ id:52, name:"64-bit (ARM)"}],
      regionsAvailability: ["us-east-1", "us-east-2","us-west-1", "india-1"]
    }
  ]
  
  const [radioVal, setRadioValue] = React.useState(['64-bit (x86)','64-bit (x86)','64-bit (x86)',"64-bit (ARM)",'64-bit (x86)']);
  const { region, handleVmSelect } = props;
  
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((a) => a.map((ar,i) => event.target.id === i.toString() ? event.target.value : ar))
  };
    
  return (
    <div className="ImageTab" data-testid="ImageTab">
      {
        vmImage.map(vm => region === "" ?
        (
          <Card className="vmCard" key={vm.id} style={{margin:"2% 0%"}}>
            <CardMedia
              className="cardImage"
              image={vm.image}
              title={vm.name}
              />
            <CardContent className="vmCardContent">
              <h3>{vm.name}</h3>
              <Typography color="textSecondary" gutterBottom>
                {vm.description}
              </Typography>  
            </CardContent>
            <CardContent className="vmCardRadioButton">
              <FormControl component="fieldset">
                <RadioGroup aria-label={vm.name} id={vm.name} name={vm.name} value={radioVal[vm.id-1]} onChange={handleChangeRadio}>
                { 
                  vm.type.map(vmtype => (
                    <FormControlLabel value={vmtype.name} key={vmtype.id} control={<Radio id={`${vm.id-1}`}/>} label={vmtype.name} /> 
                    )) 
                }
                </RadioGroup>
                <Button variant="contained" color="primary" onClick={() => handleVmSelect(vm,radioVal[vm.id-1])}>Select</Button>
              </FormControl>
            </CardContent>
          </Card>
        ) : vm.regionsAvailability.map(vmregion => vmregion.includes(region) ? 
        (
          <Card className="vmCard"  key={vm.id} style={{margin:"2% 0%"}}>
            <CardMedia
              className="cardImage"
              image={vm.image}
              title={vm.name}
            />
            <CardContent className="vmCardContent">
              <h3>{vm.name}</h3>
              <Typography color="textSecondary" gutterBottom>
                {vm.description}
              </Typography>
            </CardContent>
            <CardContent className="vmCardRadioButton">
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <RadioGroup aria-label={vm.name} id={vm.name} name={vm.name} value={radioVal[vm.id-1]} onChange={handleChangeRadio}>
                { 
                  vm.type.map(vmtype => (
                    <FormControlLabel value={vmtype.name} key={vmtype.id} control={<Radio id={`${vm.id-1}`}/>} label={vmtype.name} /> 
                    )) 
                }
                </RadioGroup>
                <Button variant="contained" color="primary" onClick={() => handleVmSelect(vm,radioVal[vm.id-1])}>Select</Button>
              </FormControl>
            </CardContent>
          </Card>):null)
        )
      }
    </div>
  )
}


export default ImageTab;
