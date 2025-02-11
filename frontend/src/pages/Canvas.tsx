import ReviewScreen from "./ReviewScreen";
import TestScreen from "./TestScreen";

const Canvas = () => {
  const isReview = window.location.pathname.includes("/review"); // ✅ Checks if the URL contains '/review'

  return (
    <div className="h-screen w-screen">
      {isReview ? <ReviewScreen /> : <TestScreen />}
    </div>
  );
};

export default Canvas;
