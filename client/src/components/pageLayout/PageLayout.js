import { Outlet } from "react-router-dom";

import Header from "../../feature/header/Header";
import Footer from "../../feature/footer/Footer";

const PageLayout = ({ isAuthenticated }) => {

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Outlet />
      <Footer />
    </>
  );
};

export default PageLayout;
