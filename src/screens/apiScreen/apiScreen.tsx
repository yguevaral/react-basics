import { useEffect, useState } from 'react'
import './apiScreen.css'
import getListOfObjetsFromAPI from '../../services/objects';
import ObjectList from '../../components/list/ObjectList';
import { IObject } from '../../models/IObjects';


function AppApiFetch() {

  const [objects, setobjects] = useState<IObject[]>([]);

  async function getListOfObjets() {

    const objgets = await getListOfObjetsFromAPI();
    setobjects(objgets);

  }

  useEffect(() => {
    getListOfObjets();
  }, [])

  /////////////////////////////////////////

  return (
    <>
      <input type="text" placeholder="Buscar..." />
      <div>Title</div>
      <div>Title</div>
      <div>Title</div>
      <div>...Loading</div>
      <div>Error</div>
      <br></br>
      {objects.length > 0 ? <ObjectList objects={objects} ></ObjectList> :<h1>Cargando Datos...</h1> }
    </>
  )
}

export default AppApiFetch
