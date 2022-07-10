import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { NextApiRequest } from "next/types";
import React from "react";
import withAuth from "security/withAuth";
import { api } from "services/api";
import { User } from "services/user.service";


function Clientes({clientes} : { clientes: Array<User>}) {
    return (
        <AuthLayout>
            <Header title="Miembros" />
        </AuthLayout>
    );
    
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
    const response = await api.get('/api/users', {
        headers: {
            Authorization: 'Bearer ' + req.cookies.access_token
        }
    });

    return {
        props: {
            clientes: response.data
        }
    };
}

export default withAuth(Clientes);