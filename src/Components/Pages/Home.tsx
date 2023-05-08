import Featured from "../CoreComponents/Featured";
import HotPost from "../CoreComponents/HotPost";
import RecentPost from "../CoreComponents/RecentPost";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col justify-center gap-20">
      <Featured />
      <HotPost />
      <RecentPost />
    </div>
  );
}
