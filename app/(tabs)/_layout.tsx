import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

const TabLayout = () => {
  return (
      <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: "#5d656bff",
            tabBarStyle: {
                backgroundColor: "#0A3A40",
                borderColor: "#36454f"
            },
            tabBarLabelStyle:{
                fontSize: 12
            },
            headerStyle: {
                backgroundColor: '#0A3A40',
                shadowOpacity: 0,
                elevation: 0,
                height: 90
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: "center"
        }}      
      >
        <Tabs.Screen 
            name="shoppingLists" 
            options={{ 
                title:"Shopping Lists",
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons 
                        name={focused ? 'home-sharp' : 'home-outline'} 
                        color={color} 
                        size={24} 
                    />
                ),
            }} 
        />
        <Tabs.Screen 
            name="(list)" 
            options={{ 
                title:"Shopping List",
                tabBarIcon: ({ color, focused }) => (
                    <FontAwesome5 
                        name={focused ? 'list-alt' : 'list-ul'} 
                        color={color} 
                        size={24} 
                    />
                ),
            }} 
        />
        <Tabs.Screen 
            name="addPage" 
            options={{ 
                title: "Add",
                tabBarIcon: ({ color, focused }) => (
                    <AntDesign 
                        name={focused ? 'plussquare' : 'plussquareo'} 
                        color={color} 
                        size={24} 
                    />
                ),
            }}
        />
    </Tabs>
  )
}

export default TabLayout