import { createSlice , createSelector} from "@reduxjs/toolkit";




const demoRecords = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    position: "Developer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "098-765-4321",
    position: "Designer",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "555-123-4567",
    position: "Manager",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    phone: "444-555-6666",
    position: "HR Executive",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "777-888-9999",
    position: "QA Engineer",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "222-333-4444",
    position: "Frontend Developer",
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david@example.com",
    phone: "111-222-3333",
    position: "Backend Developer",
  },
  {
    id: 8,
    name: "Sophia Martinez",
    email: "sophia@example.com",
    phone: "666-777-8888",
    position: "UI/UX Designer",
  },
  {
    id: 9,
    name: "James Anderson",
    email: "james@example.com",
    phone: "999-000-1111",
    position: "DevOps Engineer",
  },
  {
    id: 10,
    name: "Olivia Taylor",
    email: "olivia@example.com",
    phone: "888-999-0000",
    position: "Project Manager",
  },
];


// load records from local stroage or use demo data
const loadRecordsFromStorage = () => {
    try{
        const savedRecords = localStorage.getItem("employeeRecords");
        return savedRecords ? JSON.parse(savedRecords) : demoRecords;
    }catch(error){
        console.error("Error loadin records", error);
    }
}


// calculate next id based on existing records
const calculateNextId = (records) => {
    if(!records || records.length === 0) return 1;
    return Math.max(...records.map((r)=> r.id)) + 1;
}



const recordsSlice =createSlice({
    name : "records",
    initialState : {
        items : loadRecordsFromStorage(),
        searchTerm : "",
        nextId : calculateNextId(loadRecordsFromStorage()),
    },

    reducers : {

        // Add the new record
        addRecord : (state , action )=> {
            const newRecord = { id : state.nextId , ...action.payload };
            state.items.push(newRecord);

            localStorage.setItem("employeeRecords"  , JSON.stringify(state.items));
            state.nextId = calculateNextId(state.items);
        },

        // update record
        updateRecord : (state , action ) => {
            const { id , data} = action.payload;
            const index = state.items.findIndex((r)=> r.id === id);

            if(index !== -1){
                state.items[index] = {...state.items[index], ...data};
                localStorage.setItem("employeeRecords" , JSON.stringify(state.items));

            }
        },

        //delete record 
        deleteRecord : (state , action)=>{
            state.items = state.items.filter((r)=> r.id !== action.payload)
            localStorage.setItem("employeeRecords" , JSON.stringify(state.items));
            state.nextId  = calculateNextId(state.items);
        },

        //search record 
        setSearchTerm : (state , action) => {
            state.searchTerm = action.payload
        },

        //
        resetAllRecords : (state,action)=>{
            state.items = demoRecords;
            state.nextId = calculateNextId(demoRecords);
            localStorage.setItem("employeeRecords" , JSON.stringify(demoRecords));
        },

    },
});

export const { addRecord , updateRecord , deleteRecord ,setSearchTerm , resetAllRecords } = recordsSlice.actions ;

//selectors
// Selectors
export const selectAllRecords = (state) => state.records.items;

export const selectSearchTerm = (state) => state.records.searchTerm;

export const selectFilteredRecords = createSelector(
  [selectAllRecords, selectSearchTerm],
  (records, searchTerm) => {
    const term = searchTerm.toLowerCase();

    return records.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term) ||
        r.position.toLowerCase().includes(term)
    );
  }
);

export default recordsSlice.reducer