import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const FooterComponent = () => {
  const className: string =
    "animate-from-right text-customGreen h-8 w-8 hover:opacity-80 transition duration-200";
  return (
    <div className="flex gap-4 absolute items-center right-[10%] bottom-[5%] hover:cursor-pointer z-50">
      <a href={"https://github.com/TKPending/ChessGameV2"} target={"_blank"}>
        <FontAwesomeIcon icon={faGithub} className={className} />
      </a>
      <a href={`mailto:tony-koke@outlook.com`}>
        <FontAwesomeIcon icon={faEnvelope} className={className} />
      </a>
    </div>
  );
};

export default FooterComponent;
