import React from "react";
import withAuth from "security/withAuth";

const MyPage = () => <> My private page</>;

export default withAuth(MyPage);
