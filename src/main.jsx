import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { GlobalProvider } from './context/GlobalProvider'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <GlobalProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </GlobalProvider>
    </ChakraProvider>
  </React.StrictMode>
)