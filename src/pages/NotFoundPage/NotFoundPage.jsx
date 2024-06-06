import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h2>
        Sorry Page Not Found. Please Go To <Link to="/">Home Page</Link>!
      </h2>
    </div>
  );
}
