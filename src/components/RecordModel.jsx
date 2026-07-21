import { current } from '@reduxjs/toolkit';
import { X } from 'lucide-react'
import React, { useState , useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { updateRecord , addRecord } from '../store/recordsSlice';
import toast from 'react-hot-toast';


function RecordModel({isOpen , onClose , currentRecord}) {

    const dispatch = useDispatch();

    const [formData , SetFormData] = useState({
        name : "",
        email : "",
        phone : "",
        position :"",
    });

    useEffect(()=>{
        if(currentRecord){
            SetFormData({
                name: currentRecord.name ,
                email: currentRecord.email,
                phone: currentRecord.phone,
                position : currentRecord.position
            })
        }else{
            SetFormData({name: "",email: "", phone: "",position: "" })
        }
    },[currentRecord]);



    const handleSubmit =()=> {
        if( !formData.name.trim() || !formData.email.trim()){
            alert("Name and Email are Required");
            return ;
        }

        if(currentRecord){
            dispatch(updateRecord({id : currentRecord , data : formData}));
        }else{
            dispatch(addRecord(formData))
            toast.success("Record added successfully");
        }

        onClose();
    };

    if(!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center
    justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b
            border-gray-200 ">
                <h2 className="text-2xl font-bold text-gray-800">
                    Register New Record
                </h2>
                <button className="text-gray-400 hover:text-gray-600 transition-all">
                    <X size={24} />
                </button>
            </div>
            {/* form fields */}
            <div className="p-6 space-y-4">
                {/* name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name *
                    </label>
                    <input 
                        type="text"
                        value = {formData.name}
                        onChange={(e)=> SetFormData({...formData , name : e.target.value}) }
                        placeholder="Enter full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                    </label>
                    <input 
                        type="email"
                        value = {formData.email}
                        onChange={(e)=> SetFormData({...formData , email : e.target.value}) }
                        placeholder="Enter email addres"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* phone */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone *
                    </label>
                    <input 
                        type="tel"
                        value = {formData.phone}
                        onChange={(e)=> SetFormData({...formData , phone : e.target.value}) }
                        placeholder="Enter phone number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* position */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Position *
                    </label>
                    <input 
                        type="text"
                        value = {formData.position}
                        onChange={(e)=> SetFormData({...formData , position : e.target.value}) }
                        placeholder="Enter position"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

        {/* footer buttons */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
            <button
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                onClick={onClose}
            >
            Cancel
            </button>

            <button
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                onClick={handleSubmit}
            >
            {currentRecord ? "Update" : "Register"}
            </button>
        </div>


        </div>
    </div>
  )
}

export default RecordModel