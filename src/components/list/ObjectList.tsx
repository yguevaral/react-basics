import ObjectListRow from "./ObjectListRow";
import { IObject } from '../../models/IObjects';

export default function ObjectList(props: {objects: IObject[]}) {
    
    const {objects} = props;

    return (
        <>
            <h1>Lista de Objetos</h1>
            <ul>
                {objects.map((item, index) => {
                    return <ObjectListRow key={index} index={index} id={item.id ?? ''} name={item.name ?? ''} ></ObjectListRow>
                })}
            </ul>
        </>
    )
}
