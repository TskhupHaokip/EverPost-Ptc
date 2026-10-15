import ScrollToBottom from "../ScrollToBottom";


const FeedContents = () => {
    
  return (
    <div className="fixed bottom-75 right-75 z-50">
      <ScrollToBottom className="rounded-full  bg-white p-2 text-white hover:bg-green-400 active:bg-white"/>
    </div>
  );
};

export default FeedContents;
