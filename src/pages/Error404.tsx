import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Error404() {
  return (
    <div>
      <Header />
      <div id="error404">
        <div id="number404">404</div>
        <p><span>Oups! La page que</span> <span className="lineBreak">vous demandez n'existe pas.</span></p>
        <div>
          <Link to="/site_cine/">Retourner à la page d'accueil</Link>
        </div>
      </div>
    </div>
  );
}
