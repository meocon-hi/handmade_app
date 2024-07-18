import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// nho import :v
import HomeScreen from "./screens/HomeScreen";
import { Provider } from 'react-redux';
import store from './store';
import StackNavigator from './StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
   <StackNavigator/>
    <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginLeft:20,
    marginTop:40,
    flex: 1,
    backgroundColor: "white",
  },
});
