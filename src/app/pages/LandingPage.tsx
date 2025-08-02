import FooterComponent from "@/app/containers/landing/components/FooterComponent";
import LandingHeader from "@/app/containers/landing/components/LandingHeader";
import LandingButtonsContainer from "@/app/containers/landing/containers/LandingButtonsContainer";
import LandingPlayerContainer from "@/app/containers/landing/containers/LandingPlayerContainer";

const LandingPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-12">
      <LandingHeader />

      {/* <div className="h-20 w-20 bg-light-tile"></div> */}

      {/* <LandingPlayerContainer /> */}
      <LandingButtonsContainer />
      <FooterComponent />
    </div>
  );
};

export default LandingPage;
