import Signup from "../components/Signup";
import Signin from "../components/Signin";

const SignupPage = props => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      width: "80%",
      margin: "5% auto"
    }}
  >
    <Signin />
    <p>OR</p>
    <Signup />
  </div>
);

export default SignupPage;
