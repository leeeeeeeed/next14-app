"use client";

import React, { useEffect, useRef, useState } from "react";
import "tabulator-tables/dist/css/tabulator.min.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RowComponent, TabulatorFull as Tabulator } from "tabulator-tables";


//Movable Rows With Row Groups 참고해보기
const GroupingGrid = () => {
    const tableRef = useRef<HTMLDivElement | null>(null);
    const tableInstance = useRef<Tabulator | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tableData, setTableData] = useState([
        { id: 1, name: "Oli Bob", location: "United Kingdom", gender: "male", col: "red", dob: "1984-04-14" },
        { id: 2, name: "Mary May", location: "Germany", gender: "female", col: "blue", dob: "1982-05-14" },
        { id: 3, name: "Christine Lobowski", location: "France", gender: "female", col: "green", dob: "1982-05-22" },
        { id: 4, name: "Brendon Philips", location: "USA", gender: "male", col: "orange", dob: "1980-08-01" },
        { id: 5, name: "Margret Marmajuke", location: " Canada", gender: "female", col: "yellow", dob: "1999-01-31" },
        { id: 6, name: "Frank Harbours", location: "Russia", gender: "male", col: "red", dob: "1966-05-12" },
        { id: 7, name: "Jamie Newhart", location: "India", gender: "male", col: "green", dob: "1985-05-14" },
        { id: 8, name: "Emily Sykes", location: "South Korea", gender: "female", col: "maroon", dob: "1970-11-11" },
        { id: 9, name: "James Newman", location: "Japan", gender: "male", col: "red", dob: "1998-03-22" },
    ]);

    // 행 삭제
    const deleteRow = (groupKey: string) => {
        console.log(`Delete row in group: ${groupKey}`);
        // 여기에 행 삭제 로직을 추가하세요.
    };

    // 행 추가
    const addRow = (groupKey: string) => {
        console.log(`Add row in group: ${groupKey}`);
        const newRow = {
            name: "New Person",
            location: "Unknown",
            gender: "unknown",
            col: groupKey, // 그룹의 이름을 컬러 필드에 설정
            dob: "2000-01-01"
        };
        tableInstance.current?.addRow(newRow, true);
    };


    useEffect(() => {
        if (tableRef.current && !tableInstance.current) {
            tableInstance.current = new Tabulator(tableRef.current, {
                layout: "fitColumns",
                movableRows: true,
                height: "400px",
                data: tableData,
                columns: [
                    { title: "Name", field: "name", width: 200, responsive: 0 },
                    { title: "Location", field: "location", width: 150 },
                    { title: "Gender", field: "gender", width: 150, responsive: 2 },
                    { title: "Favourite Color", field: "col", width: 150 },
                    { title: "Date Of Birth", field: "dob", hozAlign: "center", sorter: "date", width: 150 },
                ],
                groupBy: "col", // ✅ 그룹핑 기준 (location)
                groupStartOpen: false, // 기본적으로 그룹 닫힘
                // groupToggleElement: "header", // 그룹 헤더 클릭 시 열기/닫기

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                groupHeader: (value: string, count: number, data: any[], group: any) => {
                    return `
                        <span><strong>${value}</strong> (${count} items)</span>
                        <button class="delete-row-btn" style="margin-left:10px; float: right; padding: 2px 5px; background: #b350af; color: white; border: none; cursor: pointer;">행 삭제</button>
                        <button class="add-row-btn" style="margin-left:10px; float: right; padding: 2px 5px; background: #4CAF50; color: white; border: none; cursor: pointer;">행 추가</button>
                    `;
                },
            });

            // Group Events 참고하기
            tableInstance.current.on("cellClick", function (){
                console.log("Cell clicked");
            });

            // 그룹 클릭 이벤트
            tableInstance.current.on("groupClick", (event, group) => {
                // console.log("group clicked");
                // const groupFieldData = group.getField();
                // const groupKeyData = group.getKey();
                // console.log("groupFieldData",groupFieldData);
                // console.log("groupKeyData",groupKeyData);

                // 버튼에 이벤트 핸들러 추가
                const addBtn = (event.target as HTMLElement).closest(".add-row-btn");
                const deleteBtn = (event.target as HTMLElement).closest(".delete-row-btn");

                if (addBtn) {
                    addRow(group.getKey());
                } else if (deleteBtn) {
                    deleteRow(group.getKey());
                }else {
                    //팝업 띄우기
                    console.log("Group clicked");
                    window.open("https://tabulator.info/docs/6.3/format#icon","_blank","width=200, height=200");
                }
            });

        }

        return () => {
            if (tableInstance.current) {
                tableInstance.current.destroy();
                tableInstance.current = null;
            }
        };
    }, []);

    // 행 추가 버튼 이벤트
    document.querySelectorAll(".add-row-btn").forEach((button) => {
        console.log('click');
        button.addEventListener("click", function (event) {
            console.log('click',button);
            const groupKey = (event.target as HTMLElement).parentElement?.querySelector("strong")?.textContent;
            if (groupKey) {
                // 새 행 추가
                const newRow = {
                    name: "New Person",
                    location: "Unknown",
                    gender: "unknown",
                    col: groupKey, // 그룹의 이름을 컬러 필드에 설정
                    dob: "2000-01-01"
                };
                // 테이블에 새 행을 추가
                tableInstance.current?.addRow(newRow, true);
            }
        });
    });

    return(
        <div>
            <h2 className="text-lg font-bold mb-4">Grouped Data Grid</h2>
            <div ref={tableRef} />
        </div>
    );
};

export default GroupingGrid;