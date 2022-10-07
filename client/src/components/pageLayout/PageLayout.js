import { Outlet } from "react-router-dom";

import Header from "../../feature/header/Header";
import Footer from "../../feature/footer/Footer";

export default function PageLayout ({
  isAuthenticated
}) {

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Outlet />
      <Footer />
    </>
  );
};
