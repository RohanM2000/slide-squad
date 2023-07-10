import "./AboutUs.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function AboutUs () {
    return (
        <div className="about-us">
          <Link to={{ pathname: "https://github.com/RohanM2000/slide-squad" }} target="_blank">Slide Squad Github</Link>
          <Link to={{ pathname: "https://github.com/Jasvneet" }} target="_blank">Jasvneet Kaur</Link>
          <p>
            Frontend Lead. Majority contributor to styling, frontend components, third party library integration, and like feature's frontend and backend.
          </p>
          <Link to={{ pathname: "https://github.com/vincentpham123" }} target="_blank">Vincent Pham</Link>
          <p>
            Flex. Majority contributor to presentation features, image handling, and comment feature's frontend CRUD.
          </p>
          <Link to={{ pathname: "https://github.com/ahmedrazi-glitch" }} target="_blank">Ahmed Razi</Link>
          <p>
            Backend Lead. Majority contributor to backend routes, models, and validations for presentations.
          </p>
          <Link to={{ pathname: "https://github.com/RohanM2000" }} target="_blank">Rohan Mudumba</Link>
          <p>
            Team Lead. Majority contributor to presentation creation, storing, parsing, and logic.
          </p>
        </div>
      )
}