import * as React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Colors} from '../../context/theme/colors';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function TabBarOption({
  icon,
}: {
  icon: ImageSourcePropType;
}): BottomTabNavigationOptions {
  return {
    tabBarIcon: ({focused}) => (
      <View
        style={{
          backgroundColor: focused ? Colors.WHITE : Colors.OLIVE_GREEN,

          borderRadius: 5,
        }}>
        {icon && (
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? Colors.OLIVE_GREEN : Colors.WHITE,
            }}
            source={icon}
          />
        )}
      </View>
    ),
  };
}

export default function TabbedNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: Colors.OLIVE_GREEN,
          },
          header: () => (
            <View
              style={{
                backgroundColor: Colors.WHITE,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
              }}>
              <View style={{flex: 3}}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={require('../../../assets/images/logo.png')}
                />
              </View>
              <View style={{flex: 7}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: Colors.BLACK,
                    fontSize: 30,
                  }}>
                  بلدية الكويت
                </Text>
              </View>
            </View>
          ),
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={() =>
            TabBarOption({
              icon: require('../../../assets/images/icons/home.png'),
            })
          }
        />
        <Tab.Screen
          name="Inbound"
          component={SettingsScreen}
          options={() =>
            TabBarOption({
              icon: require('../../../assets/images/icons/up-arrow.png'),
            })
          }
        />
        <Tab.Screen
          name="Outbound"
          component={SettingsScreen}
          options={() =>
            TabBarOption({
              icon: require('../../../assets/images/icons/down-arrow.png'),
            })
          }
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={() =>
            TabBarOption({
              icon: require('../../../assets/images/icons/user.png'),
            })
          }
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
