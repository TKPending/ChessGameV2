import FooterComponent from "@/app/containers/landing/components/FooterComponent";
import LandingHeader from "@/app/containers/landing/components/LandingHeader";
import LandingButtonsContainer from "@/app/containers/landing/containers/LandingButtonsContainer";

const LandingPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-12">
      <LandingHeader />
      <LandingButtonsContainer />
      <FooterComponent />
    </div>
  );
};

export default LandingPage;
