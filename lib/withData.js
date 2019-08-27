import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";

function createClient({ headers }) {
  return new ApolloClient({
    uri: `https://lift-yoga-prod.herokuapp.com/`,
    // uri:
    //   process.env.NODE_ENV === "development"
    //     ? `http://localhost:4000`
    //     : "https://lift-yoga-prod.herokuapp.com/",
    request: operation => {
      operation.setContext({
        fetchOptions: { credentials: "include" },
        headers
      });
    }
  });
}

export default withApollo(createClient);
