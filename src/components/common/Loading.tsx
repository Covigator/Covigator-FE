import { SyncLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full mt-60 gap-y-3">
      <div className="text-h4 text-bk-70 ">Loading...</div>
      <SyncLoader color="#616161" speedMultiplier={0.3} size={12} />
    </div>
  );
};

export default Loading;
