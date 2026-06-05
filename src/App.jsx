import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import ProtectedRoute from './Services/ProtectedRoute.jsx'
import MovieDetails from './Pages/MovieDetails.jsx'
import Watchlist from './Pages/Watchlist.jsx'
import Diary from './Pages/Diary.jsx'
import DiaryForm from './Components/DiaryForm.jsx'
import SearchResults from './Pages/SearchResults.jsx'
import Profile from './Pages/Profile.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/movies/:tmdbId",
    element:(
        <MovieDetails/>
    )
  },
  {
    path:"/watchlist",
    element:(
      <ProtectedRoute>
        <Watchlist/>
      </ProtectedRoute>
    )
  },
  {
    path:"/diary",
    element:(
      <ProtectedRoute>
        <Diary/>
      </ProtectedRoute>
    )
  },
  {
    path:"/add-diary/:tmdbId",
    element:(
      <ProtectedRoute>
        <DiaryForm/>
      </ProtectedRoute>
    )
  },
  {
    path:"/search",
    element:(
      <ProtectedRoute>
        <SearchResults/>
      </ProtectedRoute>
    )
  },
  {
    path:"/profile",
    element:(
      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
    )
  }
]);
function App() {

  return <RouterProvider router={router}/>
}

export default App
