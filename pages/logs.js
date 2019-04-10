import Logs from "../components/Logs";
import PleaseSignIn from "../components/PleaseSignIn";

const LogsPage = props => (
  <div>
    <PleaseSignIn>
      <Logs />
    </PleaseSignIn>
  </div>
);

export default LogsPage;
