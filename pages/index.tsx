import React, { useState } from "react";
import LoginForm from "./login";

function Home() {
	const [isLogged] = useState<boolean>(false);

	return isLogged ? <div>Logeado</div> : <LoginForm />;
}

export default Home;
