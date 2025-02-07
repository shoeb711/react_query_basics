import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

const RQFriends = () => {
  useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  return <div>RQFriends</div>;
};
export default RQFriends;
