import React from 'react'
import DeadUrlsViewer from '../search-by-make/[make]/[model]/[category]/[subcategory]/Removals'
import FormRender from "../../components/FormRender"
import CarData from "../../public/lib/car-data.json"
import PartData from "../../public/lib/parts.json"
export default function Removals() {
    const modelsform = CarData;
    const postFilter = PartData;
    return (
        <div><DeadUrlsViewer />
            <div className='sm:max-w-xl lg:max-w-2xl md:max-w-xl xl:max-w-2xl xxl:max-w-2xl mx-auto xs:mx-3 xxs:mx-3 sm:mx-5'>
                <FormRender formsData={modelsform} postFilter={postFilter} page={`/`} />
            </div>
        </div>
    )
}
