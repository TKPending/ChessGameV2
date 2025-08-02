import Button from "@/app/components/Button";

type LandingButtonsContainerProps = {
  handlePageChange: (page: boolean) => void;
};

const LandingButtonsContainer = ({
  handlePageChange,
}: LandingButtonsContainerProps) => {
  return (
    <div className="mt-4 flex items-center justify-center gap-8">
      <Button
        text="Read the Rules"
        className="border-customGreen border-2 text-customGreen hover:bg-opacity-90 w-auto rounded-full px-4 hover:bg-customGreen hover:text-white transition duration-300"
        onClick={() => handlePageChange(false)}
      />
      <Button
        text="Play Now"
        className="bg-customGreen text-white hover:bg-opacity-90"
        onClick={() => handlePageChange(true)}
      />
    </div>
  );
};

export default LandingButtonsContainer;
