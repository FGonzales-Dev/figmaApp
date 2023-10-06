import React, { useState } from 'react';
import './SideFrame.css';
import auth_side_frame from '../../assets/images/figma_graphic.png'

export default function SideFrame(props) {
    return (
        <div className='side-frame' >

            <h1 className='header'>
                Seamless Showcase: Unify Your Prototypes with a Custom URL
            </h1>
            <h2 className='sub-header'>
                No coding require
            </h2>
            <img src={auth_side_frame} className='sideframe_img' />
        </div>



    )

}