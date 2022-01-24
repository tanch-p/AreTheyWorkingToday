import React, { useState} from 'react'
import Dates from './Dates';
import dayjs from 'dayjs'

// console.log(dayjs().$d.getDay());
// console.log(dayjs().date(1));

const Calender = () => {
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(dayjs().date(1))  //1st day of month

    // console.log(firstDayOfMonth.format('ddd'));

    const handleClick = (event) => {
        event.target.className === "left" ? setFirstDayOfMonth(firstDayOfMonth.subtract(1, 'month')) : setFirstDayOfMonth(firstDayOfMonth.add(1, 'month'));
    }
    
    return (
        <div className="col-span-1 m-10 w-fit">
            <table>
                <thead>
                    <tr>
                        <th>
                            <div className='left' onClick={handleClick}></div>
                            <div>
                                <h1>{firstDayOfMonth.format('MMMM YYYY')}</h1>
                            </div>
                            <div className='right' onClick={handleClick}></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Dates current={firstDayOfMonth} today={dayjs()} />
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Calender

