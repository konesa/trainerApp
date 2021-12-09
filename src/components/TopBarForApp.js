import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList'

/*============================ ORIGINALLY THIS CODE HAS BEEN COPIED FROM https://mui.com/components/tabs/ ======================*/
/*============================ NOT COMPLETELY MY OWN ORIGINAL WORK, BUT I MODIFIED PARTS OF IT  ================================*/

function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function TopBarForApps() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Customers" {...CustomerList} />
          <Tab label="Trainings" {...TrainingList} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CustomerList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TrainingList />    
      </TabPanel>
    </Box>
  );
}
