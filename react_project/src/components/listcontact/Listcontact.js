import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import '../listcontact/Listcontact.css'
import { useNavigate } from 'react-router-dom';
import { ArrowLeft} from 'react-bootstrap-icons';

const Listcontact = () => {
    const logindata = JSON.parse(localStorage.getItem("loggedInUser"));
    const login = logindata.email;
    const localData = JSON.parse(localStorage.getItem(login)) || [];
    const [data, setData] = useState(localData);
    const [editedItem, setEditedItem] = useState(null);
    
    // Track the item being edited
    const [editedData, setEditedData] = useState({});
    const navigate = useNavigate();
    const deleteProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );

                const updatedData = data.filter(
                    (item) => item.index !== id

                );
                // alert(updatedData)
                localStorage.setItem(login, JSON.stringify(updatedData));
                setData(updatedData);
            }
        });
    };
    
    const saveEditedProduct = () => {
        if (editedItem) {
            // Find the index of the edited item in the data array
            const index = data.findIndex((item) => item.index === editedItem.index);

            if (index !== -1) {
                // Update the data array with the edited data
                const updatedData = [...data];
                updatedData[index] = editedData;

                // Update localStorage and reset editedItem and editedData
                localStorage.setItem(login, JSON.stringify(updatedData));
                setData(updatedData);
                setEditedItem(null);
                setEditedData({});
            }
        }
    };
    const cancelEdit = () => {
        setEditedItem(null);
        setEditedData({});
    };
    const columns = [

        {
            name: 'S.No',
            selector: (row, index) => index + 1,
            sortable: true,
            style: {
                backgroundColor: "black",
                color: "white" // Set the background color for rows
            }
        },
        {
            name: 'Name',
            selector: 'Name',
            sortable: true,
            style: {
                backgroundColor: "black",
                color: "white" // Set the background color for rows
            }
        },
        {
            name: 'Mobilenumber',
            selector: 'mobileNumber',
            sortable: true,
            style: {
                backgroundColor: "black",
                color: "white" // Set the background color for rows
            }
        },
        {
            name: 'Address',
            selector: 'Address',
            sortable: true,
            style: {
                backgroundColor: "black",
                color: "white" // Set the background color for rows
            }
        },
        {
            name: 'Relation',
            selector: 'RelationDropdown',
            sortable: true,
            style: {
                backgroundColor: "black",
                color: "white" // Set the background color for rows
            }
        },
        {
            name: 'Delete',
            cell: (row) => (
                <button className="pro-button ms-3" style={{
                    backgroundColor: 'red', color: 'wheat', fontWeight: 'bold'
                }} onClick={() => deleteProduct(row.index)}>
                    Delete
                </button>

            ),
            style: {
                backgroundColor: "black",
                color: "white" // Set the background color for rows
            }
        },

        {
              name: 'Edit',
               cell: (row) => (
                <>
                    {editedItem === row ? (
                        <>
                            <button
                                className="pro-button ms-3"
                                style={{ backgroundColor: 'green', color: 'wheat' }}
                                onClick={saveEditedProduct}
                            >
                                Save
                            </button>
                            <button
                                className="pro-button ms-3"
                                style={{ backgroundColor: 'red', color: 'wheat' }}
                                onClick={cancelEdit} >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            className="pro-button ms-3"
                            style={{ backgroundColor: 'green', color: 'wheat', fontWeight: 'bold' }} onClick={() => navigate(`Editcontact/${row.index}`)} >
                            Edit
                        </button>
                    )}
                </>
            ),
            style: {
                backgroundColor: 'black',
                color: 'white',
            },
        },

    ];
    return (
        <div>
            <div className='form-group'>
                <button type="submit" className='dashboard' onClick={() => navigate('/Dashboard')}>
                    <ArrowLeft /> DashBoard
                </button>
                <button type="submit" className="goback" onClick={() => navigate('/Addcontact')}>
                    Go Back <ArrowLeft />
                </button>
            </div>
            <DataTable
                title="Contact List "
                columns={columns}
                data={data}
                pagination
                responsive />
        </div>
    );
};

export default Listcontact;
