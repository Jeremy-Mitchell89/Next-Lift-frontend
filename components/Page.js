import React from "react";

class Page extends React.Component {
  render() {
    return (
      <div>
        <p>This is the Page</p>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
