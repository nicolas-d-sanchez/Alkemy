import './App.css';
import AuthProvider from './Auth/AuthProvider';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
