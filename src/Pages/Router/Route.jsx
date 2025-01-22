import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../../Layout/Main";
import Register from "./Register";
import Login from "../Login";
 
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'register',
            element:<Register></Register>
        },
        {
          path:'login',
          element:<Login></Login>
        }
      ]
    },
  ]);

  export default router;