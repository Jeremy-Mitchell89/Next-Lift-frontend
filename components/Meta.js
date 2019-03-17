import React from "react";
import Head from "next/head";

class Meta extends React.Component {
  render() {
    return (
      <Head>
        <title>Lift Log</title>
        <link rel="shortcut icon" href="../static/barbell.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="stylesheet" type="text/css" href="/static/global.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      </Head>
    );
  }
}
export default Meta;
