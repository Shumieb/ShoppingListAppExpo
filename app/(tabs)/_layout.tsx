import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

const TabLayout = () => {
  return (
      <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: "#36454F",
            tabBarStyle: {
                backgroundColor: "#f4511e",
            },
            tabBarLabelStyle:{
                fontSize: 12
            },
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: "center"
        }}      
      >
        <Tabs.Screen 
            name="homePage" 
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
            name="listPage" 
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