interface Props {
  className?: string;
}

const ScrollToBottom = ({ className }: Props) => {
  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleScroll}
      aria-label="Scroll Down To Bottom"
      title="Scroll to bottom"
      className={
        className ||
        "fixed bottom-5 right-5 rounded-full bg-green-950 p-3 text-white"
      }
    >
      ⬇️
    </button>
  );
};

export default ScrollToBottom;
