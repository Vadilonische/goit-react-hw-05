import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Navigation() {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </nav>
    </header>
  );
}
