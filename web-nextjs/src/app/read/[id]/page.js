export default async function Read(props) {

    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+props.params.id, { cache: 'no-store' });
    const topic = await resp.json();

    return (
        <>
        <h4>{topic.title}</h4>
        {topic.body}
        </>
    )
}