import React, { useState} from 'react'
import Dates from './Dates';
import dayjs from 'dayjs'

// console.log(dayjs().$d.getDay());
// console.log(dayjs().date(1));

const Calender = () => {
    const [current, setCurrent] = useState(dayjs().date(1))

    // console.log(current.format('ddd'));

    const handleClick = (event) => {
        event.target.className === "left" ? setCurrent(current.subtract(1, 'month')) : setCurrent(current.add(1, 'month'));
    }

    return (
        <div id="calender">
            <table>
                <thead>
                    <tr>
                        <th>
                            <div className='left' onClick={handleClick}></div>
                            <div>
                                <h1>{current.format('MMMM YYYY')}</h1>
                            </div>
                            <div className='right' onClick={handleClick}></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Dates current={current} today={dayjs()} />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Calender

