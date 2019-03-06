import React from "react";
import { MY_LOGS_QUERY } from "./Logs";
import User from "./User";
import { Query } from "react-apollo";
import { StyledButton } from "./styles/Inputs";

class PreloadMovements extends React.Component {
  state = {
    selected: ""
  };
  render() {
    return (
      <User>
        {({ data: { me }, error }) => {
          return (
            <Query query={MY_LOGS_QUERY} variables={{ id: me.id }}>
              {({ data, error, loading }) => {
                return (
                  <form>
                    <select
                      onChange={e => {
                        console.log(e.target.id);
                        e.preventDefault();
                        this.setState({ selected: [e.target.value] });
                      }}
                      value={this.state.selected}
                    >
                      {console.log(data)}
                      {data.myLogs.map(log => {
                        return (
                          <option key={log.id} id={log.id}>{`${log.title}, ${
                            log.date
                          }`}</option>
                        );
                      })}
                    </select>
                    <StyledButton>Add Movements</StyledButton>
                  </form>
                );
              }}
            </Query>
          );
        }}
      </User>
    );
  }
}

export default PreloadMovements;
