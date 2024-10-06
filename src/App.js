import '@/style/App.css';
import React from 'react';
import Orrery from './components/3D/Orrery';
import Overlay from './components/UI/Overlay';

function App() {
    
    return (
        <div className="h-screen w-screen overflow-hidden">
            <Orrery />
            <Overlay />
        </div>
    );
}

export default App;

