import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header>
      <nav className={css.headerNav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </nav>
    </header>
  );
}
