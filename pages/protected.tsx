import React from "react";
import withAuth from "security/withAuth";

const MyPage = () => <> My private page only for admins</>;

export default withAuth(MyPage, ["USER"]);
