import './assets/style/styles.scss';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { ItemDetails } from './pages/ItemDetails';
import { ItemApp } from './pages/ItemApp';
import { Search } from './pages/Search';
import { Home } from './pages/Home';

import { AppHeader } from './cmps/AppHeader';
import { SideNav } from './cmps/SideNav';
import { Footer } from './cmps/Footer';
import { Genre } from './pages/Genre';
import { EditPlaylist } from './pages/EditPlaylist';
import { Login } from './pages/Login';

export function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main className="app-container">
          <Switch>
            <Route component={Genre} path="/genre/:id" />
            <Route component={EditPlaylist} path="/editItem/:id?" />
            <Route component={ItemDetails} path="/item/:id" />
            <Route component={ItemApp} path="/item" />
            <Route component={Search} path="/search" />
            <Route component={Login} path="/login/:status?" />
            <Route component={Home} path="/" exact />
            <Redirect from="*" to="/" />
          </Switch>
        </main>
        <SideNav />
        <Footer />
      </div>
    </Router>
  );
}
