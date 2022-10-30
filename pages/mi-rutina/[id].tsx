import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Box } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { User } from "models/user";
import { NextApiRequest } from "next";
import React, { ReactElement } from "react"
import { api } from "services/api";


const MiRutinaPage = ({ user }: { user: User }) => {
    return (
        <>
            <Header title="Mi Rutina" />
            <Box sx={{paddingLeft: "1rem"}}>
                <h2>{ user.routine.name }</h2>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Día</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Sets</TableCell>
                            <TableCell>Reps</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.routine.routineExercises.map((routineExercise) => (
                            <TableRow key={routineExercise.id}>
                                <TableCell>{routineExercise.day}</TableCell>
                                <TableCell>{routineExercise.exercise.name}</TableCell>
                                <TableCell>{routineExercise.sets}</TableCell>
                                <TableCell>{routineExercise.reps}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
    const [userResponse] = await Promise.all([
        api.get('/api/users/me', {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token
            }
        })
    ]);

    return {
        props: {
            user: userResponse.data,

            isProtected: true,
            userTypes: ["Admin", "User"],
        }
    };
}


MiRutinaPage.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default MiRutinaPage;


