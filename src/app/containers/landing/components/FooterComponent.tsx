import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const FooterComponent = () => {
  return (
    <div className="flex gap-4 absolute items-center right-[10%] bottom-[10%] hover:cursor-pointer z-50">
      <a href={"https://github.com/TKPending/ChessGameV2"} target={"_blank"}>
        <FontAwesomeIcon
          icon={faGithub}
          className="animate-from-right text-customGreen h-6 w-6"
        />
      </a>
      <a href={`mailto:tony-koke@outlook.com`}>
        <FontAwesomeIcon
          icon={faEnvelope}
          className="animate-from-right text-customGreen h-6 w-6"
        />
      </a>
    </div>
  );
};

export default FooterComponent;
