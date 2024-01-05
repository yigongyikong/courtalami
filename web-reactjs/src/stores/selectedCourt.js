import create from 'zustand';

const useSelectedCourtStore = create((set) => ({
    selectedCourt: '',
    setSelectedCourt: (court) => set({selectedCourt: court}),
}));

export default useSelectedCourtStore;