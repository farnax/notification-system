import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeOptions } from '../../actions/option';
import './option.css';

const Option = () => {
    const { frequency, limit } = useSelector(state => state.options);  

    const [selectedFrequency, setSelectedFrequency] = useState(frequency);
    const [selectedLimit, setSelectedLimit] = useState(limit);

    const dispatch = useDispatch();

    const submitHandler = event => {
        alert('All previous events will be deleted and notification about them will not be available after applying the new settings');
        event.preventDefault();
        dispatch(changeOptions(selectedFrequency, selectedLimit));
    };

    return (
        <div className="option">
            <form onSubmit={submitHandler}>
                <label>Determine how many notification emails you want to receive</label>
                <input className="option__input" type="text" 
                    value={selectedLimit} onChange={e => setSelectedLimit(e.target.value)}
                />
                <label htmlFor="frequency">Choose how often to send notifications in minutes</label>
                    <select className="option__input" name="frequency" id="frequency"
                        onChange={e => setSelectedFrequency(e.target.value)} 
                        value={selectedFrequency} >
                        <option value="0">0</option>
                        <option value="5">5</option>
                    </select>
                <input className="option__submit" type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Option;