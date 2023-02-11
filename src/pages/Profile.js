import { useUser,useLogout} from "@thirdweb-dev/react";
import { useDisconnect } from "@thirdweb-dev/react";

export default function Home() {
  const { isLoggedIn } = useUser();
  const {logout} = useLogout();
  console.log(useUser())
  const disconnect = useDisconnect();
  return (
    <div>
      <button onClick={disconnect}>Logout</button>
    </div>
  );
}