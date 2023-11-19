'use client'

import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();

    return (
        <form onSubmit={async evt=> {
            evt.preventDefault();
            const title = evt.target.title.value;
            const body = evt.target.body.value;
            // const resp = await fetch('http://localhost:9999/topics/', {
            const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'topics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body})
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
            <h2>Create</h2>
            <p><input type="text" name="title" placeholder="title" /></p>
            <p><textarea name="body" placeholder="body"></textarea></p>
            <p><input type="submit" value="create" /></p>
        </form>
    )
}