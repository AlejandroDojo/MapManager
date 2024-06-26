import { useState } from 'react';

const MapGallery = ({eventos}) => {
    return (
        <> 
            {
                eventos.map((evento, index)=> {
                    return (<div key={index}>
                    <p>{evento.name} {evento.description}</p>
                    </div>)
                })
            }
        </>
        );
};

export default MapGallery;