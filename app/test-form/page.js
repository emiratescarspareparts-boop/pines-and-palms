import React from 'react'
import FormSonnet from '../../components/FormSonnet'
import CarData from "../../public/lib/car-data.json"
import PartsData from "../../public/lib/parts.json"
import FormOnly from '../../components/FormOnly';

export default function TestForm() {
    const modelforms = CarData;
    const partsposts = PartsData;
    return (
        <div>
            <FormSonnet formsData={modelforms} postFilter={partsposts} />
            <FormOnly formsData={modelforms} />
        </div>
    )
}
