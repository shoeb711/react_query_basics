import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserByMail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCourseByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependantQueries = ({ email }) => {
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByMail(email),
  });
  const channelId = user?.data?.channelId;

  const { data: courseData } = useQuery({
    queryKey: ["course", channelId],
    queryFn: () => fetchCourseByChannelId(channelId),
    enabled: !!channelId,
  });

  console.log("channelId =>", channelId);
  console.log("courseData =>", courseData);

  return <div>DependantQueries</div>;
};
export default DependantQueries;
