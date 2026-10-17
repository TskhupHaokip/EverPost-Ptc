import HomeHeader from "../components/Home/HomeHeader";
import { useCurrentUser } from "../contexts/UserContext";
import type { FakeFutureProps } from "../models/model";

const Home = () => {
  const { user: CurrentUser } = useCurrentUser();

  const FakeFuture: FakeFutureProps = {
    user_id: CurrentUser?.id ?? 1,
    target_id: 2,
    messages: "This is a fake test message",
    CheckAvailability: new Date("2026-10-20T10:00:00"),
    triggerDate: new Date("2026-10-21T12:00:00"),
  };

  return (
    <div className="p-1">
      <HomeHeader />

      <h2>Fake Future Data</h2>
      <p>User ID: {FakeFuture.user_id}</p>
      <p>Target ID: {FakeFuture.target_id}</p>
      <p>Message: {FakeFuture.messages}</p>
      <p>Check Availability: {FakeFuture.CheckAvailability.toLocaleString()}</p>
      <p>Trigger Date: {FakeFuture.triggerDate.toLocaleString()}</p>
    </div>
  );
};

export default Home;
