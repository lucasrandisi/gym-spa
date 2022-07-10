import * as React from 'react';


export default function Header({ title } : { title: string }) {
    return (
        <div>
            <h1 style={{ padding: "1rem" }}>{title}</h1>
        </div>
    );
}