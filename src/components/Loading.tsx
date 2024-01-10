import load from "/tenor.gif";
const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-secondColors">
      <div className="font-extrabold text-white">
        <img src={load} className="w-auto" alt="load" />
        <h1 className="text-center text-lg">Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
