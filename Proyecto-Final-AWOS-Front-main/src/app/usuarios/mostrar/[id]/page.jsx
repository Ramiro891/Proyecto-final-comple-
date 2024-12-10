export default async function Universidad({params}) {
  return (
      <>
          <h1>Univerdidades</h1>
          <p>{params.id}</p>
      </>
    );
}