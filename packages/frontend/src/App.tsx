import { Navbar, Sidebar, Footer } from "./components/layout/index";
import Router from "./constants/Router";
import AuthProvider from "./contexts/AuthContext";
import DataProvider from "./contexts/DataContext";
import NotifyProvider from "./contexts/NotifyContext";

export default () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-sun-200 dark:bg-moon-300">
      <NotifyProvider>
        <AuthProvider>
          <DataProvider>
            <Navbar />
            <div className="flex w-full h-[calc(100%-60px)]">
              <Sidebar />
              <div className="overflow-y-scroll w-full">
                <Router />
              </div>
              <Footer />
            </div>
          </DataProvider>
        </AuthProvider>
      </NotifyProvider>
    </div>
  );
};
