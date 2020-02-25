import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';
import CustomDrawer from '../components/Drawer';

const Drawer = createDrawerNavigator();

function drawerContent() {
  return <CustomDrawer />;
}

function Drawerx() {
  return (
    <Drawer.Navigator drawerContent={drawerContent}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

export default Drawerx;
