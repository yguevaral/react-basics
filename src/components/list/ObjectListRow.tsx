

export default function objectListRow(props: {index: number, id: string, name: string}) {
    const {index, id, name} = props;
  return (
    <li key={index}>{id} - {name}</li>
  )
}
