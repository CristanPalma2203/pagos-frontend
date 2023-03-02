import React from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CCardTitle,
    CInputGroup,
    CCardText,
    CRow,
    CInputGroupText,
    CFormSelect,
    CFormInput,
    CBadge,
    CSpinner,
    CWidgetStatsB,
    CButton,
    CCardImage,
    CTooltip
} from '@coreui/react';
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
import { BsDownload } from "react-icons/bs";
import PropTypes, { element } from 'prop-types';

const ExportExcel = ({ excelData, fileName }) => {
    const fileType = "aplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx"

    const exportToExcel = async () => {

        var font = {
            sz: 12,
            bold: true,
            color: { rgb: "181A1B" }
        }
        var fill = {
            fgColor:{ rgb: "BC8C1B" }
        }
        var alignment = {
            wrapText:true,
            vertical:"top",
            horizontal:"center"
        }
        const ws = XLSX.utils.json_to_sheet(excelData);
        ws["A1"].s = {
            font: font ,
            fill: fill,
            alignment: alignment
        };
        ws["B1"].s = {
            font: font ,
            fill: fill,
            alignment: alignment
        };
        ws["C1"].s = {
            font: font ,
            fill: fill,
            alignment: alignment
        };
        ws["D1"].s = {
            font: font ,
            fill: fill,
            alignment: alignment
        };
        ws["E1"].s = {
            font: font ,
            fill: fill,
            alignment: alignment
        };
        ws["F1"].s = {
            font: font ,
            fill: fill,
            alignment: alignment
        };
        ws["G1"].s = {
            font: font ,
            fill: fill,
            alignment: alignment
        };
        ws["H1"].s = {
            font: font ,
            fill: fill,
            alignment: alignment
        };
        const wb = { Sheets: { "data": ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <>

            <CButton variant="ghost" className='ms-1' onClick={(e) => exportToExcel(fileName)} >
                <BsDownload className='mb-1' />
            </CButton>

        </>
    )

}
ExportExcel.propTypes = {

    excelData: PropTypes.array,
    fileName: PropTypes.string,

};

export default ExportExcel;