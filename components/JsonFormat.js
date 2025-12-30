"use client"
import React, { useEffect, useState } from 'react'
import jsonData from "../public/lib/car-data.json"
export default function JsonFormat() {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const transformed = transformVehicleData(jsonData);
        setFormData(transformed);
    }, []);
    function transformVehicleData(data) {
        const vehicleData = {};

        data.forEach(item => {
            const { make, model, year } = item;

            if (!vehicleData[make]) {
                vehicleData[make] = {};
            }

            if (!vehicleData[make][model]) {
                vehicleData[make][model] = [];
            }

            year.forEach(y => {
                const yearStr = y.toString();
                if (!vehicleData[make][model].includes(yearStr)) {
                    vehicleData[make][model].push(yearStr);
                }
            });
        });

        Object.keys(vehicleData).forEach(make => {
            Object.keys(vehicleData[make]).forEach(model => {
                vehicleData[make][model].sort((a, b) => parseInt(b) - parseInt(a));
            });
        });

        return vehicleData;
    }
    return (
        <div><div style={{ padding: '20px' }}>
            <pre style={{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '5px',
                overflow: 'auto'
            }}>
                {formData ? JSON.stringify(formData, null, 2) : 'Loading...'}
            </pre>
        </div></div>
    )
}
