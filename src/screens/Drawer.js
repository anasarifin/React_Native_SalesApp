import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './Home';

const Drawer = createDrawerNavigator();

function Drawerx() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

export default Drawerx;
