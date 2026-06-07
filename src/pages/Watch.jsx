import { Link } from "react-router-dom";

export function WatchListPage() {
  return (
    <div>
      <h1>WatchListPage</h1>
     <ul>
        <li>
         <Link to="/watch/1">Watch game 1</Link>
        </li>
     </ul>
    </div>
  );
}