import React from 'react';
// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

const windowRestorSvg = () => (
    <svg viewBox="0 0 512 512" width="20" stroke="white"><path d="M464 0H144c-26.5 0-48 21.5-48 48v48H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM32 144c0-8.8 7.2-16 16-16h320c8.8 0 16 7.2 16 16v80H32v-80zm352 320c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V256h352v208zm96-96c0 8.8-7.2 16-16 16h-48V144c0-26.5-21.5-48-48-48H128V48c0-8.8 7.2-16 16-16h320c8.8 0 16 7.2 16 16v320z"/></svg>
)

function Header(props) {
    const { pinned = [], headers = [], isPinned } = props;
    return (
        <div className="header m-1 p-3 text-uppercase row">
            <span className="compare_icon d-flex align-items-center mr-2">{windowRestorSvg()}</span>
            {headers.map(col => {
                const { name = '', value = '' } = col;
                return (
                    <div className={`row header_cell col d-flex align-items-center ${pinned.includes(value) ? 'pinned_cell' : ''}`} key={value} name={value}>
                        <span className="name">{name}</span>
                        <span className={`text-white ml-2 ${pinned.includes(value) ? 'text-info' : ''}`} name={value} onClick={isPinned}><i className="fa fa-thumb-tack" aria-hidden="true" /></span>
                    </div>
                );
            })}
        </div>
    );
}

export default Header;