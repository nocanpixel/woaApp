import { MainController } from './src/navigation/MainController';
import {PaperProvider} from 'react-native-paper'
export default function App() {

  return (
    <PaperProvider>
      <MainController/>
    </PaperProvider>
  );
}
