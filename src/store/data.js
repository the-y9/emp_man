import React, { createContext, useContext, useState } from "react";

// Data arrays (this can be moved to a separate file if needed)
const dept = [
    { "id": 1, "dname": "dept1" },
    { "id": 2, "dname": "dept2" },
    { "id": 3, "dname": "dept3" },
];

const designation = [
    { "id": 1, "dename": "post1" },
    { "id": 2, "dename": "post2" },
    { "id": 3, "dename": "post3" },
];

const tech_expertise = [
    { "id": 1, "level": "level1" },
    { "id": 2, "level": "level2" },
    { "id": 3, "level": "level3" },
];

// Function to get a random element from an array
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate random data for employees
const generateData = () => {
    return Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        ename: `Employee${index + 1}`,
        dept: getRandomElement(dept).dname,
        designation: getRandomElement(designation).dename,
        tech_expertise: getRandomElement(tech_expertise).level,
    }));
};

// Initial data in the store
const initialData = {
    data: generateData(),
    dept,
    designation,
    tech_expertise,
};

// Create Context
const StoreContext = createContext();

// Create Store Provider
export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState(initialData);

    const delEmployee = (id) => {
        const updatedData = store.data.filter(employee => employee.id != id);
        setStore({ ...store, data: updatedData });
    }

    return (
        <StoreContext.Provider value={{ store, setStore, delEmployee }}>
            {children}
        </StoreContext.Provider>
    );
};

// Custom Hook to use the Store Context
export const useStore = () => {
    return useContext(StoreContext);
};
