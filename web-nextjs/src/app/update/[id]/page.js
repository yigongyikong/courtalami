'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id)
            .then((resp) => resp.json())
            .then(result => {
                console.log(result)
                setTitle(result.title);
                setBody(result.body);
            });
    }, []);

    return (
        <form onSubmit={async evt => {
            evt.preventDefault();
            const title = evt.target.title.value;
            const body = evt.target.body.value;
            const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body })
            });
            // .then(res => res.json())
            // .then(res => {
            //     console.log(res);
            // })

            const topic = await resp.json();
            // console.log("file: page.js:19 ~ Create ~ topic:", topic);
            router.push(`/read/${topic.id}`);
            router.refresh();
        }}>
            <h2>Update</h2>
            <p><input type="text" name="title" placeholder="title" value={title} onChange={e=>setTitle(e.target.value)}/></p>
            <p><textarea name="body" placeholder="body" value={body} onChange={e=>setBody(e.target.value)}></textarea></p>
            <p><input type="submit" value="update" /></p>
        </form>
    )
}