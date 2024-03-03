import { create } from "zustand";

const useColorChoosen = create((set) => ({
    // [primary, secondary, cards, muted]
    colors: ['#00264d','#fff','#d9d9d9','#000'],
    updateColor: (index, newColor) => set((state)=>{
        const updatedColors = [...state.colors];
        updatedColors[index] = newColor;
        return { colors: updatedColors };
    })
}));


export default useColorChoosen;