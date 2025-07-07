import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.tsx'
import StackList from './components/StackList.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <StackList/>
    </Provider>
)
