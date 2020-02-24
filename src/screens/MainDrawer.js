import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainProducts from './MainProducts';
import MainCarts from './MainCarts';

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Products" component={MainProducts} />
      <Drawer.Screen name="Carts" component={MainCarts} />
    </Drawer.Navigator>
  );
}

export default MainDrawer;
