"use client";

import React, {useEffect, useRef, useState} from "react";
import "tabulator-tables/dist/css/tabulator.min.css";
import {RowComponent, TabulatorFull as Tabulator} from "tabulator-tables";

const TreeGrid = () => {
    const tableRef = useRef<HTMLDivElement | null>(null); // 테이블을 렌더링할 DOM 요소 참조
    const tableInstance = useRef<Tabulator | null>(null); // ✅ 타입 지정 (Tabulator | null)
    const [tableData, setTableData] = useState([
        {
            name: "Oli Bob",
            location: "United Kingdom",
            gender: "male",
            col: "red",
            dob: "14/04/1984",
            _children: [
                { name: "Mary May", location: "Germany", gender: "female", col: "blue", dob: "14/05/1982" },
                { name: "Christine Lobowski", location: "France", gender: "female", col: "green", dob: "22/05/1982" },
                {
                    name: "Brendon Philips",
                    location: "USA",
                    gender: "male",
                    col: "orange",
                    dob: "01/08/1980",
                    _children: [
                        { name: "Margret Marmajuke", location: "Canada", gender: "female", col: "yellow", dob: "31/01/1999" },
                        { name: "Frank Harbours", location: "Russia", gender: "male", col: "red", dob: "12/05/1966" },
                    ],
                },
            ],
            },
            { name: "Jamie Newhart", location: "India", gender: "male", col: "green", dob: "14/05/1985" },
            {
                name: "Gemma Jane",
                location: "China",
                gender: "female",
                col: "red",
                dob: "22/05/1982",
                _children: [{ name: "Emily Sykes", location: "South Korea", gender: "female", col: "maroon", dob: "11/11/1970" }],
            },
            { name: "James Newman", location: "Japan", gender: "male", col: "red", dob: "22/03/1998" },
    ]);

    useEffect(() => {
        if (tableRef.current && !tableInstance.current) {
            console.log('tableData',tableData);
            tableInstance.current = new Tabulator(tableRef.current, {
                layout: "fitColumns",
                dataTree: true,
                dataTreeStartExpanded: [true, false], // 기본 확장 상태 설정
                movableRows: true, // 행 이동 가능
                height: "311px",
                data: tableData,
                columns: [
                    { title: "Name", field: "name", width: 200, responsive: 0 }, // never hide this column
                    { title: "Location", field: "location", width: 150 },
                    { title: "Gender", field: "gender", width: 150, responsive: 2 }, // hide this column first
                    { title: "Favourite Color", field: "col", width: 150 },
                    { title: "Date Of Birth", field: "dob", hozAlign: "center", sorter: "date", width: 150 },
                ],
            });

            tableInstance.current.on("rowMoved", function (row: RowComponent){
                const updatedData = row.getTable().getData(); // 순서가 변경된 데이터 가져오기
                console.log("Updated Data:", updatedData);
                setTableData(updatedData); // 상태 업데이트
            })
        }

        // 컴포넌트 언마운트 시 테이블 제거
        return () => {
            if (tableInstance.current) {
                tableInstance.current.destroy();
                tableInstance.current = null;
            }
        };
    }, []);

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">Nested Data Tree Grid</h2>
            <div ref={tableRef} /> {/* ✅ 여기에서 테이블을 렌더링함 */}
        </div>
    );
};

export default TreeGrid;
