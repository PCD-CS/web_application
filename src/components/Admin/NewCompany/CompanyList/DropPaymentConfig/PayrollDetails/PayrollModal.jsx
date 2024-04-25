import React, { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
} from "@material-tailwind/react";
import { payrollUpdate } from "../../../../../../network/agent";
import PayrollFormat from "./PayrollViewFormat";
import PayrollEditFormat from "./PayrollEditFormat";

const PayrollModal = ({ open, handleOpen, payrollDetails }) => {

    const { Conveyance, EmployeePF, EmployeesESIC, EmployerESIC, EmployerPF, HRA, MLWF, MedicalAllowance, OtherAllowance, WashingAllowance, PT, company, _id } = payrollDetails;

    const [updatedItems, setUpdatedItems] = useState({});
    const [editableItems, setEditableItems] = useState({
        HRA: { value: HRA?.value?.$numberDecimal, operation: HRA?.operation },
        Conveyance: { value: Conveyance?.value, operation: Conveyance?.operation },
        MedicalAllowance: { value: MedicalAllowance?.value, operation: MedicalAllowance?.operation },
        WashingAllowance: { value: WashingAllowance?.value, operation: WashingAllowance?.operation },
        OtherAllowance: { value: OtherAllowance?.value, operation: OtherAllowance?.operation },
        PT: { value: PT?.value, operation: PT?.operation },
        EmployeePF: { value: EmployeePF?.value?.$numberDecimal, operation: EmployeePF?.operation },
        EmployeesESIC: { value: EmployeesESIC?.value?.$numberDecimal, operation: EmployeesESIC?.operation },
        EmployerPF: { value: EmployerPF?.value?.$numberDecimal, operation: EmployerPF?.operation },
        EmployerESIC: { value: EmployerESIC?.value?.$numberDecimal, operation: EmployerESIC?.operation },
        MLWF: { value: MLWF?.value, operation: MLWF?.operation },
    });

    // Function to toggle edit mode for a payroll item
    const toggleEditMode = (itemName) => {
        setEditableItems((prevState) => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                isEditing: !prevState[itemName]?.isEditing,
            },
        }));
    };

    // Function to handle value change for a payroll item
    const handleValueChange = (itemName, newValue) => {

        setEditableItems((prevState) => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                value: parseInt(newValue),
            },
        }));

        setUpdatedItems((prevUpdatedItems) => ({
            ...prevUpdatedItems,
            [itemName]: true,
        }));
    };

    // Add a function to handle operation change
    const handleOperationChange = (itemName, newOperation) => {
        setEditableItems((prevState) => ({
            ...prevState,
            [itemName]: {
                ...prevState[itemName],
                operation: parseInt(newOperation),
            },
        }));
    };

    // Define a function to render mathematical symbols based on the operation value
    const renderMathSymbol = (operation) => {
        switch (operation) {
            case 0:
                return "+";
            case -1:
                return "-";
            case 1:
                return "x";
            case 2:
                return "/";
            case 3:
                return "%";
            default:
                return "";
        }
    };

    // Function to handle the "Save" button click
    const handleSaveClick = (name) => {
        toggleEditMode(name)

        const updatedPayrollData = {};

        // Filter out only the updated items
        for (const itemName in updatedItems) {
            if (updatedItems[itemName]) {
                let { value, operation } = editableItems[itemName];

                if (value === "" || value === null || isNaN(value)) {
                    value = 0;
                }
                updatedPayrollData[itemName] = { value, operation };
            }
        }

        // Call the API to update the payroll data
        payrollUpdate(_id, updatedPayrollData).then((response) => {

            if (response.error === false) {
                // console.log(response.data);

                // Reset the updated items and set isEditing to false for updated items
                const resetUpdatedItems = {};
                for (const itemName in updatedItems) {
                    resetUpdatedItems[itemName] = false;
                }

                setUpdatedItems(resetUpdatedItems);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    // Define a function to render payroll items with symbols
    const renderPayrollItem = (name, itemData) => {

        const itemNameWithoutSpaces = name.replace(/\s/g, '');
        const symbol = renderMathSymbol(itemData?.operation);
        const isEditing = itemData?.isEditing;

        return (
            <div className="my-3">

                {isEditing ? (
                    <>
                        <PayrollEditFormat
                            name={name}
                            onClickSave={() => handleSaveClick(itemNameWithoutSpaces)}
                            itemDataValue={itemData?.value}
                            onChangeValue={(e) => handleValueChange(itemNameWithoutSpaces, e.target.value)}
                            onChangeOperation={(e) => handleOperationChange(itemNameWithoutSpaces, e.target.value)}
                            itemDataOperation={itemData?.operation}
                        />
                    </>
                ) : (
                    <>
                        <PayrollFormat
                            name={name}
                            onClickEdit={() => toggleEditMode(itemNameWithoutSpaces)}
                            itemDataValue={itemData?.value}
                            symbol={symbol}
                        />
                    </>

                )}
            </div>
        );
    };

    return (
        <>
            <Dialog
                size="lg"
                open={open}
                handler={handleOpen}
                className="rounded-3xl py-6"
            >
                <DialogHeader className="flex justify-center">
                    <span className=" plusJakartaSans uppercase">Payroll</span>
                </DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-12 place-items-center ">
                        <div className="md:col-span-6 sm:col-span-12">
                            {renderPayrollItem("HRA", editableItems.HRA)}
                            {renderPayrollItem("Conveyance", editableItems.Conveyance)}
                            {renderPayrollItem("Medical Allowance", editableItems.MedicalAllowance)}
                            {renderPayrollItem("Washing Allowance", editableItems.WashingAllowance)}
                            {renderPayrollItem("Other Allowance", editableItems.OtherAllowance)}
                            {renderPayrollItem("PT", editableItems.PT)}
                        </div>

                        <div className="md:col-span-6 sm:col-span-12">
                            {renderPayrollItem("Employee PF", editableItems.EmployeePF)}
                            {renderPayrollItem("Employees ESIC", editableItems.EmployeesESIC)}
                            {renderPayrollItem("Employer PF", editableItems.EmployerPF)}
                            {renderPayrollItem("Employer ESIC", editableItems.EmployerESIC)}
                            {renderPayrollItem("MLWF", editableItems.MLWF)}
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
};

export default PayrollModal;
