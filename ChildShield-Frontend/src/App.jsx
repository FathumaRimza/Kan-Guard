import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Children from "./pages/Children";
import Reports from "./pages/Report";
import Schools from "./pages/Schools";


import ProtectedRoute from "./components/ProtectedRoute";

import Notifications from "./pages/Notifications";

import MissingChildren from "./pages/MissingChildren";
import Alert from "./pages/Alert";
import AnonymousSupport from "./pages/AnonymousSupport";







function App(){


return(

<BrowserRouter>


<Routes>


{/* Login Page */}

<Route

path="/"

element={<Login/>}

/>



{/* Register Page */}

<Route

path="/register"

element={<Register/>}

/>



{/* Dashboard */}

<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}

/>



{/* Children CRUD */}

<Route

path="/children"

element={

<ProtectedRoute>

<Children/>

</ProtectedRoute>

}

/>

<Route

path="/reports"

element={

<ProtectedRoute>

<Reports/>

</ProtectedRoute>

}

/>

<Route

path="/notifications"

element={

<ProtectedRoute>

<Notifications/>

</ProtectedRoute>

}

/>

<Route

path="/schools"

element={

<ProtectedRoute>

<Schools/>

</ProtectedRoute>

}

/>

<Route

path="/missingChildren"

element={

<ProtectedRoute>

<MissingChildren/>

</ProtectedRoute>

}

/>
<Route
path="/alerts"
element={
<ProtectedRoute>
<Alert/>
</ProtectedRoute>
}
/>

<Route

path="/anonymousSupport"

element={
<AnonymousSupport/>
}

/>

</Routes>


</BrowserRouter>

)


}


export default App;