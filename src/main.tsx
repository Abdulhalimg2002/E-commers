
import ReactDOM from "react-dom/client";
import { ChakraProvider,defaultSystem } from "@chakra-ui/react";

import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./app/store";
import InterC from "./service/interC";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render( 
  <QueryClientProvider client={queryClient}>
<Provider store={store}> 
  <InterC>

  
    <ChakraProvider value={defaultSystem} >
      
     
      <App />
      
    </ChakraProvider>
 
  </InterC>
  </Provider>
   </QueryClientProvider>
);
